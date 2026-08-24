import { useEffect, useRef, useState } from 'react';

// Target maximum frame count to look for in /frames/ directory
const MAX_DETECT_FRAMES = 400;

export default function BackgroundVideoScrub() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasFrames, setHasFrames] = useState<boolean>(false);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const totalFramesRef = useRef<number>(60);
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);

  // ==========================================
  // 1. CANVAS FRAME-BY-FRAME ENGINE (Apple Style)
  // ==========================================
  useEffect(() => {
    let isMounted = true;
    let animationFrameId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Draw frame to canvas maintaining cover aspect ratio
    const renderFrame = (frameIndex: number) => {
      if (!imagesRef.current.length) return;
      const safeIndex = Math.min(Math.max(frameIndex, 0), imagesRef.current.length - 1);
      const img = imagesRef.current[safeIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const nx = (cw - nw) / 2;
      const ny = (ch - nh) / 2;

      ctx.drawImage(img, nx, ny, nw, nh);
    };

    const loadSources = async () => {
      // 1. Check /frames/ folder in /public
      const testPatterns = [
        (i: number) => `${import.meta.env.BASE_URL}frames/frame_${String(i).padStart(3, '0')}.webp`,
        (i: number) => `${import.meta.env.BASE_URL}frames/frame_${String(i).padStart(4, '0')}.webp`,
        (i: number) => `${import.meta.env.BASE_URL}frames/frame_${String(i).padStart(3, '0')}.jpg`,
        (i: number) => `${import.meta.env.BASE_URL}frames/frame_${String(i).padStart(4, '0')}.jpg`,
        (i: number) => `${import.meta.env.BASE_URL}frames/frame_${String(i).padStart(3, '0')}.png`,
        (i: number) => `${import.meta.env.BASE_URL}frames/frame_${String(i).padStart(4, '0')}.png`,
        (i: number) => `${import.meta.env.BASE_URL}frames/frame_${i}.webp`,
        (i: number) => `${import.meta.env.BASE_URL}frames/frame_${i}.jpg`,
        (i: number) => `${import.meta.env.BASE_URL}frames/frame_${i}.png`,
        (i: number) => `${import.meta.env.BASE_URL}frames/${String(i).padStart(3, '0')}.webp`,
        (i: number) => `${import.meta.env.BASE_URL}frames/${String(i).padStart(4, '0')}.webp`,
        (i: number) => `${import.meta.env.BASE_URL}frames/${String(i).padStart(3, '0')}.jpg`,
        (i: number) => `${import.meta.env.BASE_URL}frames/${String(i).padStart(4, '0')}.jpg`,
        (i: number) => `${import.meta.env.BASE_URL}frames/${i}.webp`,
        (i: number) => `${import.meta.env.BASE_URL}frames/${i}.jpg`,
      ];

      let matchedPattern: ((i: number) => string) | null = null;
      let startIndex = 1;

      for (const pattern of testPatterns) {
        const testUrl1 = pattern(1);
        const exists1 = await new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = testUrl1;
        });

        if (exists1) {
          matchedPattern = pattern;
          startIndex = 1;
          break;
        }

        const testUrl0 = pattern(0);
        const exists0 = await new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = testUrl0;
        });

        if (exists0) {
          matchedPattern = pattern;
          startIndex = 0;
          break;
        }
      }

      if (matchedPattern && isMounted) {
        // Detect exact frame count dynamically
        const loadedImages: HTMLImageElement[] = [];
        for (let i = startIndex; i <= MAX_DETECT_FRAMES + startIndex; i++) {
          const imgUrl = matchedPattern(i);
          const valid = await new Promise<HTMLImageElement | null>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = imgUrl;
          });

          if (valid) {
            loadedImages.push(valid);
          } else {
            // Stop at first missing frame
            break;
          }
        }

        if (loadedImages.length > 0) {
          totalFramesRef.current = loadedImages.length;
          imagesRef.current = loadedImages;
          setHasFrames(true);
          renderFrame(0);
        } else {
          setHasFrames(false);
        }
      } else {
        if (isMounted) {
          setHasFrames(false);
        }
      }
    };

    loadSources();

    // Resize canvas to match screen DPR
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(Math.round(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Smooth Lerp loop (60-120fps)
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.15; // Smooth exponential lerp
        renderFrame(Math.round(currentFrameRef.current));
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      targetFrameRef.current = progress * (totalFramesRef.current - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Matte Dark Background Base */}
      <div className="absolute inset-0 bg-[#161825]" />

      {/* 
        LAYER 1: Canvas Frame-by-Frame Image Sequence (Apple Grade 60FPS)
      */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          hasFrames ? 'opacity-55' : 'opacity-0'
        }`}
      />

      {/* Frosted Dark Overlay for High Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#161825]/90 via-[#161825]/75 to-[#161825]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#161825_85%)]" />
    </div>
  );
}
