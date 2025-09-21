@echo off
echo 🎥 Starting video compression...
echo.

REM Check if FFmpeg is installed
ffmpeg -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ FFmpeg is not installed!
    echo Please install FFmpeg from: https://ffmpeg.org/download.html
    echo Or use: choco install ffmpeg
    pause
    exit /b 1
)

echo ✅ FFmpeg found, starting compression...
echo.

REM Create backup of original videos
if not exist "public\videos\backup" mkdir "public\videos\backup"
copy "public\videos\hero.mp4" "public\videos\backup\hero-original.mp4"
copy "public\videos\meeting.mp4" "public\videos\backup\meeting-original.mp4"
echo 📦 Original videos backed up to public\videos\backup\

echo.
echo 🎬 Compressing hero video...
echo Creating mobile version (720p, 2-3MB)...
ffmpeg -i "public\videos\hero.mp4" -vf "scale=720:-2" -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k "public\videos\hero-mobile.mp4"

echo Creating desktop version (1080p, 8-12MB)...
ffmpeg -i "public\videos\hero.mp4" -vf "scale=1280:-2" -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 192k "public\videos\hero-optimized.mp4"

echo Creating WebM version (better compression, 4-6MB)...
ffmpeg -i "public\videos\hero.mp4" -vf "scale=1280:-2" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 128k "public\videos\hero.webm"

echo Creating poster image...
ffmpeg -i "public\videos\hero.mp4" -ss 00:00:02 -vframes 1 -vf "scale=1280:-2" "public\images\hero-poster.jpg"

echo.
echo 🎬 Compressing meeting video...
ffmpeg -i "public\videos\meeting.mp4" -vf "scale=1280:-2" -c:v libx264 -crf 25 -preset fast -c:a aac -b:a 128k "public\videos\meeting-optimized.mp4"

echo.
echo ✅ Video compression complete!
echo.
echo 📊 File sizes:
dir "public\videos\*.mp4" /s
dir "public\videos\*.webm" /s

echo.
echo 🚀 Next steps:
echo 1. Update your hero component to use hero-optimized.mp4
echo 2. Test your website on mobile devices
echo 3. Check Google PageSpeed Insights for improvements
echo.
pause
