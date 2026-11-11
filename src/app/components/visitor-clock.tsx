"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import {
  fetchJsonWithTimeout,
  formatTime12Hour,
  getBrowserFallbackLocation,
  lookupIpGeoFromProviders,
  normalizeLocationCandidate,
  type VisitorLocation,
} from "@/lib/visitor-location";

const CLIENT_IP_GEO_PROVIDERS = [
  "https://ipwho.is/",
  "https://ipinfo.io/json",
  "https://get.geojs.io/v1/ip/geo.json",
] as const;

let cachedSessionLocation: VisitorLocation | null = null;
let inflightLookup: Promise<VisitorLocation> | null = null;

async function resolveVisitorLocation(): Promise<VisitorLocation> {
  if (cachedSessionLocation) return cachedSessionLocation;
  if (inflightLookup) return inflightLookup;

  inflightLookup = (async () => {
    try {
      // 1. Try same-origin API first (instant when edge/CDN headers or forwarded IP exist)
      const serverPayload = await fetchJsonWithTimeout("/api/location", 2000);
      if (serverPayload && typeof serverPayload === "object") {
        const record = serverPayload as Record<string, unknown>;
        const serverLocation = normalizeLocationCandidate(
          typeof record.city === "string" ? record.city : null,
          null,
          typeof record.timeZone === "string" ? record.timeZone : null
        );
        if (serverLocation) {
          cachedSessionLocation = serverLocation;
          return serverLocation;
        }
      }

      // 2. Direct browser IP lookup so localhost or unforwarded servers use the visitor's real IP
      const clientIpLocation = await lookupIpGeoFromProviders(
        CLIENT_IP_GEO_PROVIDERS,
        2200
      );
      if (clientIpLocation) {
        cachedSessionLocation = clientIpLocation;
        return clientIpLocation;
      }

      const fallback = getBrowserFallbackLocation();
      cachedSessionLocation = fallback;
      return fallback;
    } finally {
      inflightLookup = null;
    }
  })();

  return inflightLookup;
}

interface VisitorClockProps {
  className?: string;
  iconClassName?: string;
  placeholderWidthClassName?: string;
}

export default function VisitorClock({
  className = "flex items-center gap-1.5 text-[12.5px] xl:text-[13px] text-gray-600 dark:text-gray-300 font-normal whitespace-nowrap",
  iconClassName = "w-3.5 h-3.5 text-[#0CABA3] shrink-0",
  placeholderWidthClassName = "w-24",
}: VisitorClockProps) {
  const [location, setLocation] = useState<VisitorLocation | null>(
    () => cachedSessionLocation
  );
  const [timeText, setTimeText] = useState<string>(() =>
    cachedSessionLocation
      ? formatTime12Hour(new Date(), cachedSessionLocation.timeZone)
      : ""
  );

  useEffect(() => {
    let active = true;

    resolveVisitorLocation().then((resolved) => {
      if (!active) return;
      setLocation(resolved);
      setTimeText(formatTime12Hour(new Date(), resolved.timeZone));
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!location) return;

    const update = () => {
      setTimeText(formatTime12Hour(new Date(), location.timeZone));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [location]);

  return (
    <div className={className}>
      <Clock className={iconClassName} />
      {location && timeText ? (
        <span>
          {timeText} in {location.city}
        </span>
      ) : (
        <span
          className={`inline-block h-3 rounded-full bg-gray-200/80 dark:bg-white/10 animate-pulse ${placeholderWidthClassName}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
