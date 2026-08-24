import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function BackgroundCanvas() {
  const { scrollYProgress } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Transforms driven by scroll position
  const orb1Y = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);
  const orb1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 0.9]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ['10%', '60%']);
  const orb3Rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.22, 0.1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep Background Tone */}
      <div className="absolute inset-0 bg-[#07080c]" />

      {/* Cyber Grid Pattern */}
      <motion.div
        style={{ opacity: gridOpacity }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:48px_48px]"
      />

      {/* Radial vignette mask to focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#07080c_90%)]" />

      {/* Dynamic Scroll & Mouse Reactive Glowing Ambient Orbs */}
      {/* Orb 1: Amber / Yellow - Core Brand Warmth */}
      <motion.div
        style={{
          top: orb1Y,
          scale: orb1Scale,
          x: `${(mousePos.x - 0.5) * 40}px`,
        }}
        className="absolute left-[10%] w-[550px] h-[550px] rounded-full bg-amber-500/10 blur-[130px] -translate-x-1/2 transition-transform duration-700 ease-out"
      />

      {/* Orb 2: Deep Cyan / Electric Blue - Tech & Precision Accent */}
      <motion.div
        style={{
          top: orb2Y,
          x: `${(mousePos.x - 0.5) * -50}px`,
        }}
        className="absolute right-[5%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px] transition-transform duration-1000 ease-out"
      />

      {/* Orb 3: Violet / Indigo Hue Shifter */}
      <motion.div
        style={{
          rotate: orb3Rotate,
          bottom: '15%',
          left: '35%',
        }}
        className="absolute w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[140px]"
      />

      {/* Subtle Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
