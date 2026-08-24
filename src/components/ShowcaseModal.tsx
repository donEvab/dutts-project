import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import { ShowcaseItem } from '../types';

interface ShowcaseModalProps {
  item: ShowcaseItem | null;
  onClose: () => void;
}

export default function ShowcaseModal({ item, onClose }: ShowcaseModalProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-2xl rounded-2xl glass-card border border-white/15 overflow-hidden shadow-2xl z-10 my-auto"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            id="close-showcase-modal"
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-neutral-300 hover:text-white border border-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image side */}
            <div className="relative aspect-square md:aspect-auto w-full h-full min-h-[280px] bg-neutral-950">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-white text-[11px] font-mono-tech">
                  {item.category}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-neutral-300 text-[11px] font-mono-tech">
                  {item.year}
                </span>
              </div>
            </div>

            {/* Details Side */}
            <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-xs font-mono-tech text-neutral-400 uppercase block">
                  Klien: {item.client}
                </span>
                <h3 className="font-heading font-bold text-xl text-white">
                  {item.title}
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Specs Box */}
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 space-y-1.5 text-xs text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Material:</span>
                    <span className="font-medium text-white">{item.specs.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Teknik Sablon:</span>
                    <span className="font-medium text-white">{item.specs.technique}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Volume Batch:</span>
                    <span className="font-medium text-white">{item.specs.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Waktu Pengerjaan:</span>
                    <span className="font-medium text-white">{item.specs.leadTime}</span>
                  </div>
                </div>
              </div>

              {/* Consultation Link */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/62881023042439?text=Halo%20Dutts.Project,%20saya%20tertarik%20dengan%20portofolio%20${encodeURIComponent(item.title)}%20(${encodeURIComponent(item.specs.material)})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Pesan Model Serupa via WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
