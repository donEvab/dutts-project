import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Target,
  Compass,
  Check
} from 'lucide-react';
import { VIDEO_SOURCE, CORE_VALUES, WHY_CHOOSE_US } from '../data/content';

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  key?: string | number;
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(
    progress,
    range,
    ['rgba(160, 160, 160, 0.25)', 'rgba(255, 255, 255, 1)']
  );

  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.28em] transition-colors duration-150"
    >
      {children}
    </motion.span>
  );
}

interface ScrollTextHighlightProps {
  text: string;
  progress: MotionValue<number>;
  startOffset: number;
  endOffset: number;
  className?: string;
}

function ScrollTextHighlight({
  text,
  progress,
  startOffset,
  endOffset,
  className = '',
}: ScrollTextHighlightProps) {
  const words = text.split(' ');
  const totalWords = words.length;

  return (
    <p className={className}>
      {words.map((word, i) => {
        const start = startOffset + (i / totalWords) * (endOffset - startOffset);
        const end = start + (1 / totalWords) * (endOffset - startOffset);
        return (
          <Word key={i} progress={progress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textSectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Scroll-driven animation for video
  const { scrollYProgress: videoScrollProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const videoX = useTransform(
    videoScrollProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    ['100%', '35%', '0%', '0%', '-35%', '-100%']
  );

  const videoOpacity = useTransform(
    videoScrollProgress,
    [0, 0.08, 0.2, 0.8, 0.92, 1],
    [0, 0.8, 1, 1, 0.8, 0]
  );

  const videoScale = useTransform(
    videoScrollProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.9, 1, 1.01, 1, 0.9]
  );

  // Dedicated scroll progress for the centered word-by-word reading section
  const { scrollYProgress: readingProgress } = useScroll({
    target: textSectionRef,
    offset: ['start 90%', 'start 35%'],
  });

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const headingText = "Mitra Konveksi Terpercaya untuk UMKM dan Merek Lokal";
  const paragraph1 = "Dutts.Project memproduksi kaus, hoodie, sweater, kemeja, hingga seragam berkualitas tinggi dengan standar mutu garmen presisi.";
  const paragraph2 = "Kami siap membantu mewujudkan identitas desain Anda, baik untuk keperluan produksi skala massal maupun pesanan kustom.";

  // Infinite ticker items duplicated for continuous seamless flow
  const tickerItems = [...CORE_VALUES, ...CORE_VALUES, ...CORE_VALUES, ...CORE_VALUES];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Section Header - Clean & Minimalist */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
          Tentang Dutts.Project
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
          Dedikasi penuh dalam memproduksi apparel berkualitas tinggi untuk UMKM, merek lokal, dan institusi.
        </p>
      </div>

      {/* Scroll-Driven Video Showcase (Medium Size) */}
      <div className="relative w-full max-w-3xl mx-auto my-10 perspective-1000">
        <motion.div
          style={{
            x: videoX,
            opacity: videoOpacity,
            scale: videoScale,
          }}
          className="relative rounded-2xl overflow-hidden glass-card border border-white/15 shadow-2xl shadow-black/80"
        >
          {/* Top Video Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#161825]/90 border-b border-white/10 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
            </div>
          </div>

          {/* Video Player */}
          <div className="relative aspect-video w-full bg-neutral-950 flex items-center justify-center group">
            <video
              ref={videoRef}
              src={VIDEO_SOURCE}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4 pointer-events-none">
              <div className="flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={togglePlay}
                    id="about-video-play-btn"
                    className="p-2 rounded-full bg-white text-neutral-950 hover:bg-neutral-200 transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-neutral-950" /> : <Play className="w-4 h-4 fill-neutral-950" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    id="about-video-mute-btn"
                    className="p-2 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="p-2 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 transition-colors"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 
        Centered Word-by-Word Scroll Illumination:
        - Floating typography with NO card
        - Centered layout
        - Words light up progressively as the user scrolls down
      */}
      <div ref={textSectionRef} className="mt-20 sm:mt-28 space-y-16">
        
        <div className="max-w-4xl mx-auto text-center space-y-8 px-2 sm:px-4">
          
          {/* Centered Heading with Word Reveal */}
          <h3 className="font-heading font-bold text-2xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            <ScrollTextHighlight
              text={headingText}
              progress={readingProgress}
              startOffset={0}
              endOffset={0.25}
              className="inline"
            />
          </h3>

          {/* Centered Paragraph 1 with Word-by-Word Scroll Brightness */}
          <div className="text-lg sm:text-xl md:text-2xl leading-relaxed font-normal text-neutral-400 max-w-3xl mx-auto">
            <ScrollTextHighlight
              text={paragraph1}
              progress={readingProgress}
              startOffset={0.2}
              endOffset={0.7}
              className="inline"
            />
          </div>

          {/* Centered Paragraph 2 with Word-by-Word Scroll Brightness */}
          <div className="text-base sm:text-lg md:text-xl leading-relaxed font-normal text-neutral-400 max-w-3xl mx-auto">
            <ScrollTextHighlight
              text={paragraph2}
              progress={readingProgress}
              startOffset={0.65}
              endOffset={0.95}
              className="inline"
            />
          </div>

          {/* Tags */}
          <div className="pt-4 flex flex-wrap justify-center gap-2.5 text-xs font-mono-tech">
            <span className="px-3.5 py-1.5 rounded-full bg-[#6A7BFF]/10 border border-[#6A7BFF]/30 text-[#6A7BFF]">
              #JahitKaryaDukungLokal
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#FFE055]/10 border border-[#FFE055]/30 text-[#FFE055]">
              #KonveksiUMKM
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
              #FullProduction
            </span>
          </div>
        </div>

        {/* 
          100% Continuous Seamless Core Values Marquee Ticker (Right to Left without stopping):
          Uses hardware-accelerated CSS keyframe translation for zero-bug infinite loop
        */}
        <div className="w-full py-6 border-y border-white/10 overflow-hidden relative">
          <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#161825] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#161825] to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee-left flex items-center">
            {tickerItems.map((val, idx) => (
              <div key={`${val.id}-${idx}`} className="inline-flex items-center shrink-0">
                <span className="text-sm sm:text-base md:text-lg font-mono-tech uppercase tracking-widest text-neutral-300 px-4 hover:text-white transition-colors">
                  {val.title}
                </span>
                <span className="text-neutral-500 font-light px-2">+</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visi & Misi Side-by-Side (Cards Allowed) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Visi */}
          <div className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Target className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-xl text-white">
                Visi
              </h4>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Menjadi mitra konveksi tepercaya yang mendorong pertumbuhan UMKM dan industri fesyen lokal melalui produk berkualitas tinggi, layanan profesional, dan dukungan kreatif untuk semua kebutuhan pakaian — mulai dari streetwear hingga seragam institusional.
              </p>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-neutral-400 font-mono-tech">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Standar Mutu Jahitan & Bahan Unggul</span>
            </div>
          </div>

          {/* Misi */}
          <div className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-xl text-white">
                Misi
              </h4>
              <ul className="space-y-2.5 text-neutral-300 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                  <span>Mendukung pelaku UMKM, merek lokal, dan komunitas mewujudkan identitas produk melalui layanan fleksibel dan terjangkau.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                  <span>Menyediakan layanan konveksi lengkap dengan standar kualitas terbaik.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 shrink-0" />
                  <span>Membangun ekosistem produksi berkelanjutan dan memberdayakan pekerja lokal.</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-neutral-400 font-mono-tech">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Kolaborasi Kreatif Berkelanjutan</span>
            </div>
          </div>
        </div>

        {/* Why Choose Us (Card Allowed) */}
        <div className="p-8 sm:p-10 rounded-2xl glass-card border border-white/10 space-y-6">
          <div>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
              Mengapa Memilih Dutts.Project?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.step}
                className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2"
              >
                <span className="font-mono-tech font-bold text-xl text-neutral-400">
                  {item.step}
                </span>
                <h4 className="font-heading font-semibold text-sm text-white">
                  {item.title}
                </h4>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
