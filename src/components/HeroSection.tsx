import { motion } from 'motion/react';
import { MessageSquare, Scissors, ChevronRight } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

interface HeroSectionProps {
  onOpenEstimator: () => void;
}

export default function HeroSection({ onOpenEstimator }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto w-full text-center relative z-10 flex flex-col items-center">
        
        {/* Main Title / Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-4 max-w-3xl"
        >
          <h1 className="font-heading font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight leading-[1.1] text-white">
            Jahit Karya, <br />
            <span className="text-[#FFE055] inline-block" style={{ textShadow: '4px 4px 0px #6A7BFF' }}>
              Dukung Lokal.
            </span>
          </h1>
        </motion.div>

        {/* CTA Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mt-10"
        >
          {/* Main Action: WhatsApp Direct */}
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-whatsapp"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#6A7BFF] hover:bg-[#5263EA] text-white font-heading font-bold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(106,123,255,0.4)] hover:shadow-[0_0_30px_rgba(106,123,255,0.6)] hover:-translate-y-0.5"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Konsultasi via WhatsApp</span>
          </a>

          {/* Quick Cost Estimator */}
          <button
            type="button"
            onClick={onOpenEstimator}
            id="hero-open-estimator-button"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full glass-card hover:bg-white/10 text-neutral-200 hover:text-[#FFE055] font-heading font-medium text-sm transition-all duration-200 border border-[#6A7BFF]/30 hover:border-[#FFE055]/50"
          >
            <Scissors className="w-4 h-4 text-[#6A7BFF]" />
            <span>Kalkulator Estimasi Biaya</span>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-14 max-w-3xl"
        >
          <div className="p-4 rounded-xl glass-card border border-white/5 text-center">
            <span className="font-heading font-bold text-2xl text-white block">500+</span>
            <p className="text-[11px] text-neutral-400 font-mono-tech mt-0.5">Project Selesai</p>
          </div>

          <div className="p-4 rounded-xl glass-card border border-white/5 text-center">
            <span className="font-heading font-bold text-2xl text-white block">100%</span>
            <p className="text-[11px] text-neutral-400 font-mono-tech mt-0.5">Quality Check</p>
          </div>

          <div className="p-4 rounded-xl glass-card border border-white/5 text-center">
            <span className="font-heading font-bold text-2xl text-white block">50+</span>
            <p className="text-[11px] text-neutral-400 font-mono-tech mt-0.5">Brand Lokal</p>
          </div>

          <div className="p-4 rounded-xl glass-card border border-white/5 text-center">
            <span className="font-heading font-bold text-2xl text-white block">7-14</span>
            <p className="text-[11px] text-neutral-400 font-mono-tech mt-0.5">Hari Lead Time</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
