import { useState, type FormEvent } from 'react';
import { Star, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { REVIEWS_DATA } from '../data/content';
import { ReviewItem } from '../types';

export default function ReviewSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_DATA);
  const [isAddingReview, setIsAddingReview] = useState<boolean>(false);
  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    projectType: '',
  });
  const [submittedMessage, setSubmittedMessage] = useState<boolean>(false);

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.content) return;

    const item: ReviewItem = {
      id: `custom-rev-${Date.now()}`,
      name: newReview.name,
      role: newReview.role || 'Brand Creator',
      company: newReview.company || 'Local Brand',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: newReview.rating,
      content: newReview.content,
      projectType: newReview.projectType || 'Custom Apparel Batch',
      verified: true,
    };

    setReviews([item, ...reviews]);
    setIsAddingReview(false);
    setSubmittedMessage(true);
    setNewReview({ name: '', role: '', company: '', content: '', rating: 5, projectType: '' });
    setTimeout(() => setSubmittedMessage(false), 5000);
  };

  // Duplicate arrays for continuous horizontal drifting / floating cards
  const firstRowReviews = [...reviews, ...reviews];
  const secondRowReviews = [...[...reviews].reverse(), ...[...reviews].reverse()];

  return (
    <section
      id="review"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Section Header - Clean */}
      <div className="text-center max-w-2xl mx-auto mb-14 px-4 sm:px-6">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
          Ulasan & Testimoni Klien
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base mt-2 leading-relaxed">
          Pengalaman nyata dari para pemilik merek fesyen lokal, institusi, dan komunitas yang berproduksi di Dutts.Project.
        </p>

        {/* Toggle Write Review Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setIsAddingReview(!isAddingReview)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono-tech transition-colors border border-white/10"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>{isAddingReview ? 'Tutup Form Ulasan' : '+ Tulis Pengalaman Produksi Anda'}</span>
          </button>
        </div>

        {submittedMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono-tech">
            ✓ Terima kasih! Ulasan Anda telah berhasil ditambahkan.
          </div>
        )}
      </div>

      {/* Add Review Drawer / Form */}
      {isAddingReview && (
        <div className="max-w-xl mx-auto mb-12 p-6 rounded-3xl glass-card border border-white/15 space-y-4 mx-4 sm:mx-auto">
          <h3 className="font-heading font-bold text-lg text-white">
            Bagikan Pengalaman Kerjasama
          </h3>
          <form onSubmit={handleSubmitReview} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aris Munandar"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Nama Brand / Institusi</label>
                <input
                  type="text"
                  placeholder="e.g. Roughneck Apparel"
                  value={newReview.company}
                  onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Jenis Pesanan (Opsional)</label>
                <input
                  type="text"
                  placeholder="e.g. Heavyweight Tee 100 pcs"
                  value={newReview.projectType}
                  onChange={(e) => setNewReview({ ...newReview, projectType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Rating Kepuasan (1-5)</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-[#12141c] border border-white/10 text-white text-xs focus:outline-none focus:border-white"
                >
                  <option value="5">★★★★★ (5/5 Bintang Sempurna)</option>
                  <option value="4">★★★★☆ (4/5 Sangat Baik)</option>
                  <option value="3">★★★☆☆ (3/5 Cukup)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-neutral-300 block mb-1">Ulasan Anda</label>
              <textarea
                rows={3}
                required
                placeholder="Ceritakan tentang ketepatan waktu, kualitas sablon/jahitan, dan kepuasan Anda..."
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingReview(false)}
                className="px-4 py-2 rounded-lg text-xs text-neutral-400 hover:text-white"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-white text-neutral-950 text-xs font-semibold hover:bg-neutral-200"
              >
                Kirim Ulasan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 
        Floating & Drifting Testimonials (Dual Row Floating Continuous Ticker):
        - Floating Glassmorphism Cards
        - Smooth continuous drift Left & Right
        - Pause on hover
      */}
      <div className="space-y-6 relative">
        {/* Soft Vignette on edges */}
        <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#161825] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#161825] to-transparent z-10 pointer-events-none" />

        {/* Row 1: Floating Left */}
        <div className="animate-marquee-left flex gap-5 py-1">
          {firstRowReviews.map((rev, index) => (
            <div
              key={`row1-${rev.id}-${index}`}
              className="w-[340px] sm:w-[400px] shrink-0 p-5 sm:p-6 rounded-2xl glass-card border border-white/10 flex flex-col justify-between space-y-4 shadow-xl glass-card-hover"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-neutral-700 text-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono-tech text-neutral-400">
                    {rev.projectType}
                  </span>
                </div>

                <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed italic line-clamp-3">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-heading font-semibold text-xs text-white">
                      {rev.name}
                    </h4>
                    <p className="text-[10px] text-neutral-400">
                      {rev.role} • {rev.company}
                    </p>
                  </div>
                </div>

                {rev.verified && (
                  <div className="flex items-center gap-1 text-[10px] font-mono-tech text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Floating Right */}
        <div className="animate-marquee-right flex gap-5 py-1">
          {secondRowReviews.map((rev, index) => (
            <div
              key={`row2-${rev.id}-${index}`}
              className="w-[340px] sm:w-[400px] shrink-0 p-5 sm:p-6 rounded-2xl glass-card border border-white/10 flex flex-col justify-between space-y-4 shadow-xl glass-card-hover"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-neutral-700 text-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono-tech text-neutral-400">
                    {rev.projectType}
                  </span>
                </div>

                <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed italic line-clamp-3">
                  "{rev.content}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-heading font-semibold text-xs text-white">
                      {rev.name}
                    </h4>
                    <p className="text-[10px] text-neutral-400">
                      {rev.role} • {rev.company}
                    </p>
                  </div>
                </div>

                {rev.verified && (
                  <div className="flex items-center gap-1 text-[10px] font-mono-tech text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
