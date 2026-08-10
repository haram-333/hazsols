"use client";

import { useEffect, useState, ReactNode } from "react";
import "../loader.css";

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
    let targetProgress = GLOBAL_MAX_PROGRESS;
    let currentProgress = GLOBAL_MAX_PROGRESS;
    let animationFrameId: number;

    const mediaElements = Array.from(document.querySelectorAll("img, video"));
    let loadedCount = 0;

    const updateTarget = () => {
      if (isCancelled) return;
      loadedCount++;
      const newTarget = Math.floor((loadedCount / Math.max(mediaElements.length, 1)) * 100);
      targetProgress = Math.max(targetProgress, newTarget);
    };

    const animateProgress = () => {
      if (isCancelled) return;
      
      currentProgress += (targetProgress - currentProgress) * 0.015;
      
      if (mediaElements.length === 0 || targetProgress === 100) {
        currentProgress += (100 - currentProgress) * 0.01; 
      }

      const roundedProgress = Math.round(currentProgress);
      
      // CRITICAL FIX: Guarantee progress NEVER ticks backwards globally
      setDisplayProgress((prev) => {
        const next = Math.max(prev, roundedProgress, GLOBAL_MAX_PROGRESS);
        GLOBAL_MAX_PROGRESS = next;
        
        if (next >= 99) {
          setTimeout(() => {
            if (isCancelled) return;
            setIsLoaded(true);
            GLOBAL_HAS_LOADED = true;
            setTimeout(() => {
              if (isCancelled) return;
              setStartReveal(true);
              setTimeout(() => {
                if (!isCancelled) setAnimationFinished(true);
              }, 1600);
            }, 150);
          }, 600);
          
          return 100;
        }
        
        return next;
      });

      if (roundedProgress < 99) {
        animationFrameId = requestAnimationFrame(animateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    let fallbackTimer: NodeJS.Timeout;

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
      // Aggressive fallback to prevent getting stuck
      fallbackTimer = setTimeout(() => { targetProgress = 100; }, 4000);
    }

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <>
      <div className={`modern-loader ${isLoaded ? "loader-hidden" : ""}`}>
        <div className="loader-noise"></div>
        <div className="modern-loader-content">
          <div className="loader-number-wrapper shimmer-text">
            <span className="loader-number">{displayProgress}</span>
            <span className="loader-percent">%</span>
          </div>
          <div className="loader-brand">
            HAZSOLS<br/>SYSTEMS
          </div>
        </div>
        <div 
          className="modern-progress-bar shimmer-bg"
          style={{ transform: `scaleX(${displayProgress / 100})` }}
        />
      </div>

      <div 
        className={`page-content-wrapper ${startReveal ? "content-revealed" : "content-hidden"} ${animationFinished ? "animation-complete" : "animation-locked"}`}
      >
        {children}
      </div>
    </>
  );
}
