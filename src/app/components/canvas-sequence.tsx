"use client";

import { useEffect, useRef, useCallback } from "react";

const TOTAL_FRAMES = 100;
const FRAME_PATH = (i: number) =>
  `/frames/frame_${String(i).padStart(3, "0")}.svg`;

interface Props {
  onProgress?: (p: number) => void;
  scrollContainerSelector?: string;
}

export default function CanvasSequence({ onProgress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = framesRef.current[index];
    if (!img?.complete) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const onLoad = () => {
      loaded++;
      // Draw first frame as soon as it's ready
      if (loaded === 1) drawFrame(0);
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = onLoad;
      images.push(img);
    }

    framesRef.current = images;

    return () => {
      images.forEach((img) => {
        img.onload = null;
      });
    };
  }, [drawFrame]);

  // Handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  // GSAP scroll scrub
  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const init = async () => {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      const gsap = gsapMod.default;
      const { ScrollTrigger } = stMod;
      gsap.registerPlugin(ScrollTrigger);

      const proxy = { frame: 0 };

      const st = ScrollTrigger.create({
        trigger: "#canvas-scroll-driver",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const frameIndex = Math.round(self.progress * (TOTAL_FRAMES - 1));
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
          }
          onProgress?.(self.progress);
        },
      });

      // Suppress unused variable warning
      void proxy;

      cleanup = () => {
        st.kill();
        cancelAnimationFrame(rafRef.current);
      };
    };

    init().catch(console.warn);
    return () => cleanup?.();
  }, [drawFrame, onProgress]);

  return (
    <canvas
      ref={canvasRef}
      id="canvas-bg"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}
