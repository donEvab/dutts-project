import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '../data/content';

interface CostEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CostEstimatorModal({ isOpen, onClose }: CostEstimatorModalProps) {
  const [productType, setProductType] = useState<string>('tee-combed');
  const [quantity, setQuantity] = useState<number>(36);
  const [printType, setPrintType] = useState<string>('plastisol');
  const [hasCustomTag, setHasCustomTag] = useState<boolean>(true);

  if (!isOpen) return null;

  const getBasePrice = () => {
    switch (productType) {
      case 'tee-combed':
        return 48000;
      case 'tee-heavy':
        return 65000;
      case 'hoodie-fleece':
        return 115000;
      case 'shirt-pdh':
        return 95000;
      case 'coach-jacket':
        return 125000;
      default:
        return 50000;
    }
  };

  const getPrintPrice = () => {
    switch (printType) {
      case 'dtf':
        return 15000;
      case 'plastisol':
        return 12000;
      case 'bordir':
        return 14000;
      case 'none':
        return 0;
      default:
        return 10000;
    }
  };

  const getQtyDiscount = () => {
    if (quantity >= 200) return 0.20;
    if (quantity >= 100) return 0.15;
    if (quantity >= 50) return 0.10;
    if (quantity >= 24) return 0.05;
    return 0;
  };

  const tagPrice = hasCustomTag ? 3000 : 0;
  const rawUnitPrice = getBasePrice() + getPrintPrice() + tagPrice;
  const discountRate = getQtyDiscount();
  const unitPrice = Math.round(rawUnitPrice * (1 - discountRate));
  const totalPrice = unitPrice * quantity;

  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleConsult = () => {
    const text = `Halo Dutts.Project!%0A%0ASaya ingin konsultasi hasil estimasi kalkulator:%0A- Tipe Produk: ${encodeURIComponent(productType)}%0A- Jumlah: ${quantity} pcs%0A- Teknik Sablon/Aplikasi: ${encodeURIComponent(printType)}%0A- Custom Woven Label: ${hasCustomTag ? 'Ya' : 'Tidak'}%0A- Estimasi Total: ${encodeURIComponent(formatIDR(totalPrice))}%0A%0AMohon konfirmasi katalog bahan dan waktu pengerjaan. Terima kasih!`;
    window.open(`https://wa.me/62881023042439?text=${text}`, '_blank');
  };

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
          className="relative w-full max-w-xl rounded-2xl glass-card border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl z-10 my-auto"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400 block">
                Kalkulator Cepat
              </span>
              <h3 className="font-heading font-bold text-2xl text-white mt-1">
                Estimasi Biaya Produksi
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

          <div className="space-y-4 text-xs">
            {/* Product Type */}
            <div>
              <label className="text-neutral-300 block mb-1.5 font-medium">1. Jenis Produk & Bahan</label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#12141c] border border-white/10 text-white focus:outline-none focus:border-white"
              >
                <option value="tee-combed">Kaos Cotton Combed 24s / 30s</option>
                <option value="tee-heavy">Kaos Heavyweight 16s / 20s Oversized</option>
                <option value="hoodie-fleece">Hoodie / Crewneck Cotton Fleece 330gsm</option>
                <option value="shirt-pdh">Kemeja Workshirt / Seragam PDH Drill</option>
                <option value="coach-jacket">Coach Jacket Taslan Waterproof</option>
              </select>
            </div>

            {/* Quantity Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-neutral-300 font-medium">2. Jumlah Produksi (Qty)</label>
                <span className="font-mono-tech text-white font-semibold">{quantity} pcs</span>
              </div>
              <input
                type="range"
                min="12"
                max="500"
                step="6"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono-tech mt-1">
                <span>12 pcs (Min)</span>
                <span>50 pcs</span>
                <span>100 pcs (-15%)</span>
                <span>500+ pcs (-20%)</span>
              </div>
            </div>

            {/* Print Technique */}
            <div>
              <label className="text-neutral-300 block mb-1.5 font-medium">3. Aplikasi Desain / Sablon</label>
              <select
                value={printType}
                onChange={(e) => setPrintType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#12141c] border border-white/10 text-white focus:outline-none focus:border-white"
              >
                <option value="plastisol">Sablon Manual Plastisol (High Durability)</option>
                <option value="dtf">Sablon Digital DTF Full Color</option>
                <option value="bordir">Bordir Komputer Presisi</option>
                <option value="none">Polosan (Tanpa Sablon/Bordir)</option>
              </select>
            </div>

            {/* Custom Label Checkbox */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                type="checkbox"
                id="custom-tag-checkbox"
                checked={hasCustomTag}
                onChange={(e) => setHasCustomTag(e.target.checked)}
                className="w-4 h-4 rounded bg-black/60 border-white/20 accent-white"
              />
              <label htmlFor="custom-tag-checkbox" className="text-neutral-300 cursor-pointer">
                Sertakan Woven Label & Hangtag Brand Sendiri (+ Rp 3.000/pcs)
              </label>
            </div>
          </div>

          {/* Pricing Summary Box */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-neutral-400">Estimasi Biaya per Pcs:</span>
              <span className="font-mono-tech font-bold text-white">{formatIDR(unitPrice)}</span>
            </div>
            {discountRate > 0 && (
              <div className="flex justify-between items-center text-xs text-emerald-400">
                <span>Diskon Volume ({discountRate * 100}%):</span>
                <span>Hemat {formatIDR(rawUnitPrice - unitPrice)} /pcs</span>
              </div>
            )}
            <div className="pt-2 border-t border-white/10 flex justify-between items-center">
              <span className="font-medium text-white text-xs">Estimasi Total ({quantity} pcs):</span>
              <span className="font-mono-tech font-extrabold text-lg text-white">
                {formatIDR(totalPrice)}
              </span>
            </div>
          </div>

          {/* Action */}
          <button
            type="button"
            onClick={handleConsult}
            className="w-full py-3 rounded-lg bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim Rincian Estimasi ke WhatsApp</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
