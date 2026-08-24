import { useState } from 'react';
import { SERVICES_DATA } from '../data/content';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Layanan' },
    { id: 'Streetwear & Apparel', label: 'Kaos & Hoodie' },
    { id: 'Workwear & Casual', label: 'Kemeja & Celana' },
    { id: 'Corporate & Community', label: 'Seragam PDH' },
    { id: 'Custom Art & Technique', label: 'Sablon & Bordir' },
  ];

  const filteredServices = selectedCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Section Header - Clean (No 03 / number) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-2 max-w-xl">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Layanan Konveksi
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Produksi garmen presisi untuk berbagai kebutuhan pakaian kasual, streetwear, hingga seragam resmi.
          </p>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-white text-neutral-950 font-semibold'
                  : 'glass-card text-neutral-300 hover:text-white hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid (Dynamic responsive screen layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            onClick={() => onSelectService(service)}
            className="cursor-pointer group rounded-3xl glass-card border border-white/10 overflow-hidden p-6 sm:p-8 flex flex-col justify-between space-y-6 glass-card-hover"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono-tech text-neutral-400 uppercase tracking-wider block">
                    {service.category}
                  </span>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-neutral-200 transition-colors mt-1">
                    {service.title}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono-tech">
                  {service.badge}
                </span>
              </div>

              <p className="text-neutral-300 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Materials Pill List */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono-tech text-neutral-400 block uppercase">
                  Pilihan Bahan Utama:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {service.materials.map((mat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-black/40 text-neutral-300 text-xs border border-white/5"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Specs & Action Row */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono-tech text-neutral-400">
                MOQ: {service.moq}
              </span>
              <span className="text-xs font-medium text-white group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                <span>Lihat Detail Spesifikasi</span>
                <span>→</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
