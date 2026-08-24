import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { SHOWCASE_DATA } from '../data/content';
import { ShowcaseItem } from '../types';

interface ShowcaseOrbitSectionProps {
  onSelectItem: (item: ShowcaseItem) => void;
}

export default function ShowcaseOrbitSection({ onSelectItem }: ShowcaseOrbitSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isOrbitMode, setIsOrbitMode] = useState<boolean>(true);

  // Measure viewport scroll for 3D Orbit spinning
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Calculate rotation driven by scroll progress
  const scrollRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Combined rotation with smooth motion
  const totalRotation = useMotionValue(0);
  const smoothRotation = useSpring(totalRotation, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const unsubscribe = scrollRotation.on('change', (val) => {
      totalRotation.set(val);
    });
    return () => unsubscribe();
  }, [scrollRotation, totalRotation]);

  const itemCount = SHOWCASE_DATA.length;
  const angleStep = 360 / itemCount;
  const orbitRadius = 380;

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Section Header - Clean (No 04 / number) */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
          Showcase Produk
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-2 leading-relaxed">
          Katalog pilihan produk pakaian dan apparel hasil kolaborasi produksi bersama berbagai merek lokal dan komunitas.
        </p>

        {/* View Toggle */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            type="button"
            onClick={() => setIsOrbitMode(true)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              isOrbitMode
                ? 'bg-white text-neutral-950 font-semibold'
                : 'glass-card text-neutral-400 hover:text-white'
            }`}
          >
            3D Orbit View
          </button>
          <button
            type="button"
            onClick={() => setIsOrbitMode(false)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              !isOrbitMode
                ? 'bg-white text-neutral-950 font-semibold'
                : 'glass-card text-neutral-400 hover:text-white'
            }`}
          >
            Grid View
          </button>
        </div>
      </div>

      {isOrbitMode ? (
        /* 3D Circular Orbit Mode without center DUTTS 3D badge and without arrow buttons */
        <div className="relative w-full h-[520px] sm:h-[600px] flex items-center justify-center perspective-1500">
          
          {/* Orbiting Rotating Container */}
          <motion.div
            style={{
              rotateY: smoothRotation,
            }}
            className="relative w-full h-full preserve-3d flex items-center justify-center"
          >
            {SHOWCASE_DATA.map((item, index) => {
              const itemAngle = index * angleStep;
              return (
                <div
                  key={item.id}
                  style={{
                    transform: `rotateY(${itemAngle}deg) translateZ(${orbitRadius}px)`,
                  }}
                  className="absolute w-[220px] sm:w-[260px] preserve-3d transition-transform duration-300"
                >
                  <div
                    onClick={() => onSelectItem(item)}
                    className="cursor-pointer group rounded-2xl glass-card border border-white/15 overflow-hidden shadow-2xl p-2.5 transition-all duration-300 hover:scale-105 hover:border-white/30"
                  >
                    <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono-tech text-white">
                        {item.tag}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <span className="text-[10px] font-mono-tech text-neutral-400 block uppercase">
                          {item.client}
                        </span>
                        <h4 className="font-heading font-bold text-sm text-white truncate">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      ) : (
        /* Standard Responsive Grid Mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWCASE_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="cursor-pointer group rounded-2xl glass-card border border-white/10 overflow-hidden p-3 glass-card-hover"
            >
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-900 mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-xs font-mono-tech text-white">
                  {item.tag}
                </div>
              </div>

              <div className="px-1 space-y-1">
                <span className="text-xs font-mono-tech text-neutral-400 uppercase block">
                  {item.client} • {item.specs?.material}
                </span>
                <h4 className="font-heading font-bold text-base text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
