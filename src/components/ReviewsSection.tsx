import React, { useState } from 'react';
import { REVIEWS_DATA, CLINIC_INFO, ReviewItem } from '../data/clinicData';
import { Star, MessageSquarePlus, CheckCircle2, User, ThumbsUp, Share2, Send, X } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS_DATA);
  const [activeFilter, setActiveFilter] = useState<string>('semua');
  const [showAddReviewModal, setShowAddReviewModal] = useState<boolean>(false);
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  const filterKeywords = [
    { key: 'semua', label: 'Semua Ulasan', count: '143' },
    { key: 'pelayanan', label: 'pelayanan', count: '17' },
    { key: 'perawat', label: 'perawat', count: '14' },
    { key: 'dingin', label: 'dingin & nyaman', count: '6' },
    { key: 'gigi', label: 'poli gigi', count: '5' },
    { key: 'bpjs', label: 'BPJS Kesehatan', count: '8' },
  ];

  const filteredReviews = activeFilter === 'semua'
    ? reviewsList
    : reviewsList.filter((item) => {
        if (activeFilter === 'pelayanan') return item.text.toLowerCase().includes('pelayanan') || item.tag === 'pelayanan';
        if (activeFilter === 'perawat') return item.text.toLowerCase().includes('perawat') || item.text.toLowerCase().includes('staff') || item.tag === 'perawat';
        if (activeFilter === 'dingin') return item.text.toLowerCase().includes('dingin') || item.text.toLowerCase().includes('bersih') || item.text.toLowerCase().includes('nyaman');
        if (activeFilter === 'gigi') return item.text.toLowerCase().includes('gigi') || item.tag === 'gigi';
        if (activeFilter === 'bpjs') return item.text.toLowerCase().includes('bpjs') || item.tag === 'bpjs';
        return true;
      });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const created: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      badge: 'Pasien Terverifikasi Baru',
      timeAgo: 'Baru saja',
      rating: newRating,
      text: newComment.trim(),
      tag: 'pelayanan'
    };

    setReviewsList([created, ...reviewsList]);
    setNewAuthor('');
    setNewComment('');
    setNewRating(5);
    setShowAddReviewModal(false);
  };

  const toggleLike = (id: string) => {
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="ulasan" className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold tracking-wide uppercase">
              <span>Ulasan & Kepuasan Pasien</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Google Maps Business Review</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Testimoni Asli Pasien Klinik Pratama Wijaya Medika
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Mulai dari kenyamanan berobat dengan BPJS Kesehatan, pelayanan cepat dokter umum & spesialis, hingga kebersihan ruangan klinik yang dingin dan bersih.
            </p>
          </div>

          <button
            onClick={() => setShowAddReviewModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-teal-900 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors shrink-0 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-teal-700" />
            <span>Tulis Pengalaman Berobat</span>
          </button>
        </div>

        {/* Rating Breakdown & Summary Scoreboard */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-8 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Score: 4,7 */}
            <div className="lg:col-span-4 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-8">
              <div className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
                {CLINIC_INFO.rating.toString().replace('.', ',')}
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-400 my-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-sm font-semibold text-slate-800">
                {CLINIC_INFO.totalReviews} ulasan Google Maps
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Klinik Pratama Terpercaya di Ilir Timur I, Palembang
              </div>
            </div>

            {/* Middle: Star breakdown bars (5, 4, 3, 2, 1) */}
            <div className="lg:col-span-5 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <span className="w-3 font-semibold text-slate-700">5</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: '84%' }} />
                </div>
                <span className="w-8 text-right font-mono text-slate-400">84%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 font-semibold text-slate-700">4</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: '12%' }} />
                </div>
                <span className="w-8 text-right font-mono text-slate-400">12%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 font-semibold text-slate-700">3</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full" style={{ width: '3%' }} />
                </div>
                <span className="w-8 text-right font-mono text-slate-400">3%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 font-semibold text-slate-700">2</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-200 rounded-full" style={{ width: '1%' }} />
                </div>
                <span className="w-8 text-right font-mono text-slate-400">1%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 font-semibold text-slate-700">1</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-200 rounded-full" style={{ width: '0%' }} />
                </div>
                <span className="w-8 text-right font-mono text-slate-400">0%</span>
              </div>
            </div>

            {/* Right: Key sentiment badges */}
            <div className="lg:col-span-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-2 text-slate-700">
              <div className="font-semibold text-slate-900 mb-1">
                Kutipan Pasien Paling Sering:
              </div>
              <div className="text-[11px] text-slate-600 italic">
                "Pelayanan sangat baik, petugas dan karyawan cepat tanggap dalam melayani pasien."
              </div>
              <div className="text-[11px] text-slate-600 italic">
                "Baik Pegawai, Dokter maupun Perawat melayani dgn ramah.."
              </div>
            </div>
          </div>
        </div>

        {/* Filter Keywords Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap mr-1">
            Topik Populer:
          </span>
          {filterKeywords.map((tag) => (
            <button
              key={tag.key}
              onClick={() => setActiveFilter(tag.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === tag.key
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tag.label} <span className="opacity-70 font-mono">({tag.count})</span>
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Author row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0 border border-slate-200">
                      {rev.author[0].toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {rev.author}
                      </h4>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        {rev.isLocalGuide && (
                          <span className="text-amber-700 font-semibold">Local Guide</span>
                        )}
                        {rev.reviewsCount && <span>{rev.reviewsCount}</span>}
                        {!rev.reviewsCount && <span>{rev.badge}</span>}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] text-slate-400 whitespace-nowrap shrink-0">
                    {rev.timeAgo}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-2.5">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  "{rev.text}"
                </p>
              </div>

              {/* Action buttons (Like & Share) */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <button
                  onClick={() => toggleLike(rev.id)}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                    likedReviews[rev.id] ? 'text-teal-700 font-semibold' : 'hover:text-slate-900'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${likedReviews[rev.id] ? 'fill-teal-700' : ''}`} />
                  <span>Suka {likedReviews[rev.id] ? '(1)' : ''}</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(rev.text);
                    alert('Ulasan disalin ke clipboard');
                  }}
                  className="hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Bagikan</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Modal */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Tulis Ulasan Pasien Wijaya Medika
              </h3>
              <button
                onClick={() => setShowAddReviewModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Anda (Sesuai Pasien / Keluarga)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rahmawati Putri"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Beri Nilai Bintang
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                  <span className="text-xs font-medium text-slate-600 ml-2">
                    {newRating} dari 5 Bintang
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ceritakan Pengalaman Berobat Anda
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Bagaimana pelayanan dokter, perawat, kecepatan loket, atau kenyamanan fasilitas klinik?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddReviewModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Ulasan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
