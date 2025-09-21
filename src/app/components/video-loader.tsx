"use client";

interface VideoLoaderProps {
  isLoading: boolean;
  className?: string;
}

export default function VideoLoader({ isLoading, className = "" }: VideoLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className={`video-loader ${className}`}>
      <div className="video-loader-spinner">
        <div className="spinner"></div>
      </div>
      <div className="video-loader-text">Loading video...</div>
    </div>
  );
}
