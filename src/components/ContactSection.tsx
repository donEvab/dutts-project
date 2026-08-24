import { useState, type FormEvent } from 'react';
import {
  Phone,
  Mail,
  Instagram,
  Send,
  MapPin,
  Clock,
  CheckCircle,
  Copy,
  Check
} from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    category: 'Kaos / Streetwear',
    qty: '50 pcs',
    notes: '',
  });

  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleSendWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    const text = `Halo Dutts.Project!%0A%0ASaya ingin konsultasi produksi konveksi:%0A- Nama: ${encodeURIComponent(formState.name || 'Calon Klien')}%0A- Kontak: ${encodeURIComponent(formState.phone || '-')}%0A- Kategori Produk: ${encodeURIComponent(formState.category)}%0A- Estimasi Qty: ${encodeURIComponent(formState.qty)}%0A- Keterangan / Desain: ${encodeURIComponent(formState.notes || 'Mohon info pricelist dan katalog bahan')}%0A%0ATerima kasih!`;
    window.open(`https://wa.me/62881023042439?text=${text}`, '_blank');
  };

  return (
    <section
      id="contact"
      className="relative pt-24 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Section Header - Clean (No 06 / number) */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
          Konsultasi & Kontak
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-2 leading-relaxed">
          Hubungi kami langsung melalui saluran WhatsApp, Instagram, Email, atau kirim rincian pesanan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        
        {/* Left Side: Contact Channels */}
        <div className="lg:col-span-5 space-y-4">
          {/* WhatsApp Direct Card */}
          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Phone className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={() => handleCopy(CONTACT_INFO.phone, 'whatsapp')}
                className="p-1.5 rounded-md hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                title="Salin Nomor"
              >
                {copied === 'whatsapp' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div>
              <span className="text-xs font-mono-tech text-neutral-400 block">WhatsApp Customer Service</span>
              <h3 className="font-heading font-bold text-lg text-white mt-0.5">{CONTACT_INFO.phone}</h3>
              <p className="text-xs text-neutral-400 mt-1">Respon cepat setiap hari kerja</p>
            </div>
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-2.5 rounded-lg bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200 transition-colors"
            >
              Buka Chat WhatsApp
            </a>
          </div>

          {/* Instagram & Email Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-neutral-200">
                <Instagram className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono-tech text-neutral-400 block">Instagram</span>
                <span className="font-heading font-semibold text-sm text-white block mt-0.5">{CONTACT_INFO.instagram}</span>
              </div>
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-neutral-300 hover:text-white block"
              >
                Kunjungi Profil →
              </a>
            </div>

            <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-neutral-200">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono-tech text-neutral-400 block">Email Resmi</span>
                <span className="font-heading font-semibold text-xs text-white block mt-0.5 truncate">{CONTACT_INFO.email}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(CONTACT_INFO.email, 'email')}
                className="text-xs text-neutral-300 hover:text-white text-left"
              >
                {copied === 'email' ? 'Tersalin!' : 'Salin Email →'}
              </button>
            </div>
          </div>

          {/* Workshop & Hours */}
          <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-3 text-xs">
            <div className="flex items-start gap-3 text-neutral-300">
              <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-white block">Workshop Konveksi</span>
                <span>{CONTACT_INFO.address}</span>
              </div>
            </div>
            <div className="flex items-start gap-3 text-neutral-300 pt-2 border-t border-white/5">
              <Clock className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
              <div>
                <span className="font-semibold text-white block">Jam Operasional</span>
                <span>{CONTACT_INFO.businessHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Fast Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-5">
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                Buat Pesan Rincian Konsultasi
              </h3>
              <p className="text-xs text-neutral-400">
                Isi form berikut dan sistem akan otomatis menyiapkan template pesan ke WhatsApp kami.
              </p>
            </div>

            <form onSubmit={handleSendWhatsApp} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-neutral-300 block mb-1.5 font-medium">Nama Anda / Brand</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Budi / Artwear Co"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-300 block mb-1.5 font-medium">Nomor Telepon / WA</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 08123456789"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-neutral-300 block mb-1.5 font-medium">Kategori Produk</label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#12141c] border border-white/10 text-white text-xs focus:outline-none focus:border-white"
                  >
                    <option value="Kaos / T-Shirt Streetwear">Kaos / T-Shirt Streetwear</option>
                    <option value="Hoodie & Crewneck Oversized">Hoodie & Crewneck Oversized</option>
                    <option value="Kemeja Workshirt & Celana">Kemeja Workshirt & Celana</option>
                    <option value="Seragam PDH / PDL / Komunitas">Seragam PDH / PDL / Komunitas</option>
                    <option value="Makloon Sablon & Bordir Komputer">Makloon Sablon & Bordir Komputer</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-neutral-300 block mb-1.5 font-medium">Estimasi Jumlah (Qty)</label>
                  <select
                    value={formState.qty}
                    onChange={(e) => setFormState({ ...formState, qty: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#12141c] border border-white/10 text-white text-xs focus:outline-none focus:border-white"
                  >
                    <option value="Sample (1-12 pcs)">Sample (1-12 pcs)</option>
                    <option value="24 - 50 pcs (Small Batch)">24 - 50 pcs (Small Batch)</option>
                    <option value="50 - 100 pcs (Standard)">50 - 100 pcs (Standard)</option>
                    <option value="100 - 500 pcs (Medium)">100 - 500 pcs (Medium)</option>
                    <option value="> 500 pcs (Mass Production)">{'>'} 500 pcs (Mass Production)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-neutral-300 block mb-1.5 font-medium">Catatan Tambahan / Spesifikasi</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Ingin bahan Cotton Combed 24s sablon DTF ukuran A3 di dada dan punggung..."
                  value={formState.notes}
                  onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Rincian via WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] font-mono-tech text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-neutral-400" />
                  Konsultasi Gratis
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-neutral-400" />
                  Sample Ready
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-neutral-400" />
                  Harga Pabrik
                </span>
              </div>
            </form>
          </div>
        </div>

      </div>

      {/* 
        CLEAN CLOSING SLOGAN AT THE VERY BOTTOM:
        "Jahit Karya, Dukung Lokal." (No 'SLOGAN RESMI' label)
      */}
      <div className="pt-16 pb-8 border-t border-white/10 text-center space-y-4">
        <h3 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase">
          Jahit Karya, <br className="sm:hidden" />
          <span className="text-neutral-300">
            Dukung Lokal.
          </span>
        </h3>

        <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Bersama kita kuatkan ekosistem garmen lokal berdaya saing tinggi. Dibuat dengan presisi, dikerjakan sepenuh hati.
        </p>

        {/* Footer Info & Copyright */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono-tech">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white font-heading font-semibold">DUTTS.PROJECT</span>
            <span>© {new Date().getFullYear()} All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-5">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
            <a href="#review" className="hover:text-white transition-colors">Review</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </section>
  );
}
