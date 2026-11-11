import { NextRequest, NextResponse } from "next/server";
import {
  lookupIpGeoFromProviders,
  normalizeLocationCandidate,
} from "@/lib/visitor-location";

export const dynamic = "force-dynamic";

const EDGE_GEO_HEADER_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["x-vercel-ip-city", "x-vercel-ip-timezone"],
  ["cf-ipcity", "cf-timezone"],
];

const FORWARDED_IP_HEADERS = [
  "cf-connecting-ip",
  "x-real-ip",
  "x-forwarded-for",
  "x-client-ip",
] as const;

function stripIpFormatting(raw: string): string {
  let ip = raw.trim().replace(/^"+|"+$/g, "");
  if (!ip) return "";

  // Handle bracketed IPv6 with optional port: [2001:db8::1]:1234
  if (ip.startsWith("[")) {
    const closeBracket = ip.indexOf("]");
    if (closeBracket === -1) return "";
    ip = ip.slice(1, closeBracket);
  } else if (ip.includes(".") && ip.includes(":")) {
    // Strip IPv4-mapped IPv6 prefix (::ffff:1.2.3.4) or host:port
    if (ip.toLowerCase().startsWith("::ffff:")) {
      ip = ip.slice(7);
    } else {
      const colonIdx = ip.lastIndexOf(":");
      const candidatePort = ip.slice(colonIdx + 1);
      if (/^\d+$/.test(candidatePort)) {
        ip = ip.slice(0, colonIdx);
      }
    }
  }

  // Strip IPv6 zone ID (e.g. fe80::1%eth0)
  const zoneIndex = ip.indexOf("%");
  if (zoneIndex !== -1) ip = ip.slice(0, zoneIndex);

  return ip.trim();
}

function isPublicIpv4(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;

  const octets = parts.map((part) => (/^\d{1,3}$/.test(part) ? Number(part) : -1));
  if (octets.some((n) => n < 0 || n > 255)) return false;

  const [a, b] = octets;
  if (a === 0 || a === 10 || a === 127) return false;
  if (a === 100 && b >= 64 && b <= 127) return false; // CGNAT
  if (a === 169 && b === 254) return false; // Link-local
  if (a === 172 && b >= 16 && b <= 31) return false; // Private
  if (a === 192 && b === 168) return false; // Private
  if (a === 192 && b === 0 && (octets[2] === 0 || octets[2] === 2)) return false;
  if (a === 198 && (b === 18 || b === 19)) return false; // Benchmark
  if (a >= 224) return false; // Multicast / reserved
  return true;
}

function isPublicIp(ip: string): boolean {
  if (!ip) return false;
  if (ip.includes(".")) return isPublicIpv4(ip);

  // Basic IPv6 syntax check and non-routable range filtering
  if (!ip.includes(":") || !/^[0-9a-fA-F:]+$/.test(ip)) return false;
  const lower = ip.toLowerCase();
  if (lower === "::" || lower === "::1") return false;
  if (lower.startsWith("fc") || lower.startsWith("fd")) return false; // ULA
  if (lower.startsWith("fe8") || lower.startsWith("fe9") || lower.startsWith("fea") || lower.startsWith("feb")) {
    return false; // Link-local
  }
  if (lower.startsWith("ff")) return false; // Multicast
  return true;
}

function extractPublicVisitorIp(headers: Headers): string | null {
  for (const headerName of FORWARDED_IP_HEADERS) {
    const rawValue = headers.get(headerName);
    if (!rawValue) continue;

    for (const part of rawValue.split(",")) {
      const candidate = stripIpFormatting(part);
      if (isPublicIp(candidate)) return candidate;
    }
  }
  return null;
}

export async function GET(request: NextRequest) {
  const noStoreHeaders = { "Cache-Control": "no-store, max-age=0" };

  // 1. Prefer CDN/platform geo headers injected directly for the visitor
  for (const [cityHeader, tzHeader] of EDGE_GEO_HEADER_PAIRS) {
    const location = normalizeLocationCandidate(
      request.headers.get(cityHeader),
      null,
      request.headers.get(tzHeader)
    );
    if (location) {
      return NextResponse.json(
        { ...location, source: "edge" },
        { headers: noStoreHeaders }
      );
    }
  }

  // 2. Fall back to looking up the forwarded public visitor IP server-side
  const visitorIp = extractPublicVisitorIp(request.headers);
  if (visitorIp) {
    const encodedIp = encodeURIComponent(visitorIp);
    const location = await lookupIpGeoFromProviders(
      [
        `https://ipwho.is/${encodedIp}`,
        `https://ipinfo.io/${encodedIp}/json`,
        `https://get.geojs.io/v1/ip/geo/${encodedIp}.json`,
      ],
      2500
    );

    if (location) {
      return NextResponse.json(
        { ...location, source: "server-ip" },
        { headers: noStoreHeaders }
      );
    }
  }

  // 3. On localhost or unforwarded origins, let the browser query its own public IP directly
  return NextResponse.json(
    { city: null, timeZone: null, source: "none" },
    { headers: noStoreHeaders }
  );
}

