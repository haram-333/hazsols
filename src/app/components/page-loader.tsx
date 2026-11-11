"use client";

import { useEffect, useState, ReactNode } from "react";
import "../loader.css";
import HazsolsLogo from "./hazsols-logo";

// Persist the highest progress achieved across React unmounts/remounts (e.g. Strict Mode or mobile layout shifts)
let GLOBAL_MAX_PROGRESS = 0;
let GLOBAL_HAS_LOADED = false;

export default function PageLoader({ children }: { children: ReactNode }) {
  const [displayProgress, setDisplayProgress] = useState(GLOBAL_MAX_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(GLOBAL_HAS_LOADED);
  const [startReveal, setStartReveal] = useState(GLOBAL_HAS_LOADED);
  const [animationFinished, setAnimationFinished] = useState(GLOBAL_HAS_LOADED);

  useEffect(() => {
    if (GLOBAL_HAS_LOADED) return;

    let isCancelled = false;
    let hasTriggeredExit = false;
    let targetProgress = GLOBAL_MAX_PROGRESS;
    let currentProgress = GLOBAL_MAX_PROGRESS;
    let animationFrameId: number;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const mediaElements = Array.from(document.querySelectorAll("img, video"));
    let loadedCount = 0;

    const updateTarget = () => {
      if (isCancelled) return;
      loadedCount++;
      const newTarget = Math.floor((loadedCount / Math.max(mediaElements.length, 1)) * 100);
      targetProgress = Math.max(targetProgress, newTarget);
    };

    const scheduleExitSequence = () => {
      if (hasTriggeredExit || isCancelled) return;
      hasTriggeredExit = true;
      GLOBAL_MAX_PROGRESS = 100;
      setDisplayProgress(100);

      // Pause a brief beat at 100% bar, zoom the logo from center (0.7s), then split reveal
      timers.push(
        setTimeout(() => {
          if (isCancelled) return;
          setIsLoaded(true);
          GLOBAL_HAS_LOADED = true;

          timers.push(
            setTimeout(() => {
              if (isCancelled) return;
              setStartReveal(true);

              timers.push(
                setTimeout(() => {
                  if (!isCancelled) setAnimationFinished(true);
                }, 1150)
              );
            }, 650)
          );
        }, 120)
      );
    };

    let lastTime = performance.now();

    const animateProgress = (now: number) => {
      if (isCancelled) return;

      const dtFactor = Math.max(0.2, Math.min((now - lastTime) / 16.667, 3));
      lastTime = now;

      currentProgress += (targetProgress - currentProgress) * Math.min(0.036 * dtFactor, 0.9);

      if (mediaElements.length === 0 || targetProgress === 100) {
        currentProgress += (100 - currentProgress) * Math.min(0.038 * dtFactor, 0.9) + 0.36 * dtFactor;
      }

      const roundedProgress = Math.min(100, Math.round(currentProgress));
      const next = Math.max(roundedProgress, GLOBAL_MAX_PROGRESS);
      GLOBAL_MAX_PROGRESS = next;

      if (next >= 99) {
        scheduleExitSequence();
        return;
      }

      setDisplayProgress((prev) => Math.max(prev, next));
      animationFrameId = requestAnimationFrame(animateProgress);
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    let fallbackTimer: ReturnType<typeof setTimeout>;

    if (mediaElements.length === 0) {
      targetProgress = 100;
    } else {
      mediaElements.forEach((media: any) => {
        if (media.tagName.toLowerCase() === "img") {
          if (media.complete) updateTarget();
          else {
            media.addEventListener("load", updateTarget);
            media.addEventListener("error", updateTarget);
          }
        } else if (media.tagName.toLowerCase() === "video") {
          if (media.readyState >= 3) updateTarget();
          else {
            media.addEventListener("loadeddata", updateTarget);
            media.addEventListener("error", updateTarget);
          }
        }
      });
      // Fast fallback so slow third-party assets never stall the loader
      fallbackTimer = setTimeout(() => { targetProgress = 100; }, 2500);
    }

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      {!animationFinished && (
        <div
          className={`modern-loader ${isLoaded ? "loader-hidden" : ""}`}
          role="status"
          aria-label="Loading Hazsols Solutions"
        >
          <div className="loader-noise"></div>
          <div className="modern-loader-content">
            <div className="loader-logo-stage">
              <div className="loader-logo-glow" aria-hidden="true" />
              <HazsolsLogo
                variant="stacked"
                showSublabel
                size={124}
                surface="dark"
                animation="volt-snap"
                className="relative z-10"
                wordmarkClassName="text-2xl sm:text-[30px] tracking-[0.16em]"
              />
            </div>
          </div>
          <div
            className="modern-progress-bar shimmer-bg"
            style={{ transform: `scaleX(${displayProgress / 100})` }}
          />
        </div>
      )}

      <div 
        className={`page-content-wrapper ${startReveal ? "content-revealed" : "content-hidden"} ${animationFinished ? "animation-complete" : "animation-locked"}`}
      >
        {children}
      </div>
    </>
  );
}
