"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTheme } from "./theme-provider";

// Dynamic import for WebGPU/WebGL Shader elements so SSR never crashes
const ShaderCanvas = dynamic(
  () =>
    import("shaders/react").then((mod) => {
      const { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } = mod;
      return function ShaderCanvasInner({ isDark }: { isDark: boolean }) {
        const [isUnavailable, setIsUnavailable] = useState(false);

        if (isUnavailable) {
          return (
            <div
              className={`absolute inset-0 transition-colors duration-500 ${
                isDark ? "bg-[#070709]" : "bg-[#EFEFEF]"
              }`}
            />
          );
        }

        return (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <Shader
              key={isDark ? "shader-dark" : "shader-light"}
              className="w-full h-full"
              style={{ width: "100%", height: "100%", display: "block" }}
              onUnavailable={() => setIsUnavailable(true)}
            >
              <Swirl
                colorA={isDark ? "#07080b" : "#ffffff"}
                colorB={isDark ? "#10171b" : "#f0f0f0"}
                detail={1.7}
              />
              <ChromaFlow
                baseColor={isDark ? "#07080b" : "#ffffff"}
                downColor="#0CABA3"
                leftColor={isDark ? "#08807a" : "#0CABA3"}
                rightColor="#0CABA3"
                upColor={isDark ? "#065e59" : "#0CABA3"}
                momentum={13}
                radius={3.5}
              />
              <FlutedGlass
                aberration={0.61}
                angle={31}
                frequency={8}
                highlight={isDark ? 0.07 : 0.12}
                highlightSoftness={0}
                lightAngle={-90}
                refraction={4}
                shape="rounded"
                softness={1}
                speed={0.15}
              />
              <FilmGrain strength={0.05} />
            </Shader>
          </div>
        );
      };
    }),
  { ssr: false }
);

export default function ShaderHeroBackground() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, mounted: themeMounted } = useTheme();
  const isDark = themeMounted && theme === "dark";

  useEffect(() => {
    setMounted(true);
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "100px" }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 pointer-events-none overflow-hidden bg-[#EFEFEF] dark:bg-[#070709] transition-colors duration-500"
    >
      {/* Fallback ambient glowing layer */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isDark ? "opacity-55 mix-blend-screen" : "opacity-40 mix-blend-multiply"
        }`}
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(12, 171, 163, 0.22) 0%, rgba(7, 7, 9, 0) 70%)"
            : "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(12, 171, 163, 0.18) 0%, rgba(239, 239, 239, 0) 70%)",
        }}
      />
      {mounted && isVisible && <ShaderCanvas isDark={isDark} />}
    </div>
  );
}
