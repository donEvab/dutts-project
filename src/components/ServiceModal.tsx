import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-xl rounded-2xl glass-card border border-white/15 p-6 sm:p-8 space-y-5 shadow-2xl z-10 my-auto"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono-tech text-neutral-400 uppercase tracking-wider block">
                {service.category}
              </span>
              <h3 className="font-heading font-bold text-2xl text-white mt-1">
                {service.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-neutral-300 text-sm leading-relaxed">
            {service.description}
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="text-xs font-mono-tech uppercase text-neutral-400 block">
                Standar Pengerjaan:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-200">
                {service.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <span className="text-xs font-mono-tech uppercase text-neutral-400 block">
                Pilihan Material Bahan:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {service.materials.map((mat, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-black/50 text-neutral-200 text-xs border border-white/10"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <span className="text-xs font-mono-tech text-neutral-400">
              MOQ: {service.moq}
            </span>

            <a
              href={`https://wa.me/62881023042439?text=Halo%20Dutts.Project,%20saya%20ingin%20konsultasi%20produksi%20layanan:%20${encodeURIComponent(service.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-lg bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-2"
            >
              <span>Konsultasi Pesanan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
