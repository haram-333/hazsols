export interface VisitorLocation {
  city: string;
  timeZone: string;
}

/**
 * Safely decodes URL-encoded header values (such as Vercel's x-vercel-ip-city).
 */
export function safeDecodeHeader(value: string | null | undefined): string {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    return decodeURIComponent(trimmed).trim();
  } catch {
    return trimmed;
  }
}

/**
 * Verifies that an IANA time zone identifier is supported by the runtime.
 */
export function isValidTimeZone(timeZone: string): boolean {
  if (!timeZone) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone });
    return true;
  } catch {
    return false;
  }
}

/**
 * Derives a readable city label from an IANA timezone ID (e.g. America/Los_Angeles -> Los Angeles).
 */
export function extractCityFromTimeZone(timeZone: string): string {
  const segment = timeZone.split("/").pop() ?? "";
  return segment.replace(/_/g, " ").trim();
}

/**
 * Validates and normalizes candidate city, region, and timezone values into a VisitorLocation.
 */
export function normalizeLocationCandidate(
  city?: string | null,
  region?: string | null,
  timeZone?: string | null
): VisitorLocation | null {
  const tz = safeDecodeHeader(timeZone);
  if (!isValidTimeZone(tz)) return null;

  const resolvedCity =
    [city, region, extractCityFromTimeZone(tz)]
      .map((part) => safeDecodeHeader(part))
      .find(Boolean) ?? "";

  if (!resolvedCity) return null;
  return { city: resolvedCity, timeZone: tz };
}

/**
 * Extracts a normalized VisitorLocation across ipwho.is, ipinfo.io, and geojs.io payloads.
 */
export function parseIpGeoPayload(payload: unknown): VisitorLocation | null {
  if (!payload || typeof payload !== "object") return null;

  const data = payload as Record<string, unknown>;
  if (data.success === false) return null;

  let timeZone: string | null = null;
  if (typeof data.timezone === "string") {
    timeZone = data.timezone;
  } else if (data.timezone && typeof data.timezone === "object") {
    const tzId = (data.timezone as Record<string, unknown>).id;
    if (typeof tzId === "string") timeZone = tzId;
  } else if (Array.isArray(data.timeZones) && typeof data.timeZones[0] === "string") {
    timeZone = data.timeZones[0];
  }

  const city =
    typeof data.city === "string"
      ? data.city
      : typeof data.cityName === "string"
        ? data.cityName
        : null;

  const region =
    typeof data.region === "string"
      ? data.region
      : typeof data.regionName === "string"
        ? data.regionName
        : null;

  return normalizeLocationCandidate(city, region, timeZone);
}

/**
 * Formats a Date in crisp 12-hour clock notation (e.g. "1:45 PM") for the target timezone.
 */
export function formatTime12Hour(date: Date, timeZone?: string): string {
  try {
    const formatted = new Intl.DateTimeFormat("en-US", {
      ...(timeZone ? { timeZone } : {}),
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);

    return formatted.replace(/\s+/g, " ").trim();
  } catch {
    const hours24 = date.getHours();
    const period = hours24 >= 12 ? "PM" : "AM";
    const hours12 = hours24 % 12 || 12;
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours12}:${minutes} ${period}`;
  }
}

/**
 * Fetches JSON with an AbortController timeout so slow or blocked geo endpoints fail fast.
 */
export async function fetchJsonWithTimeout(
  url: string,
  timeoutMs = 2500
): Promise<unknown> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Queries ordered IP-geolocation provider URLs until one yields a valid city and timezone.
 */
export async function lookupIpGeoFromProviders(
  urls: readonly string[],
  timeoutMs = 2500
): Promise<VisitorLocation | null> {
  for (const url of urls) {
    const payload = await fetchJsonWithTimeout(url, timeoutMs);
    const parsed = parseIpGeoPayload(payload);
    if (parsed) return parsed;
  }
  return null;
}

/**
 * Resolves a last-resort fallback from the browser's system timezone if IP geo is unreachable.
 */
export function getBrowserFallbackLocation(): VisitorLocation {
  try {
    const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const derived = normalizeLocationCandidate(null, null, browserTz);
    if (derived) return derived;
  } catch {
    // Fall through to default HQ location
  }
  return { city: "Lahore", timeZone: "Asia/Karachi" };
}

