import React, { useState } from 'react';
import { CLINIC_FACILITIES, FacilityItem } from '../data/clinicData';
import { CheckCircle2, Eye, X, ChevronLeft, ChevronRight, Sparkles, Shield, Wind } from 'lucide-react';

interface FacilityGalleryProps {
  onOpenBooking: () => void;
}

export const FacilityGallery: React.FC<FacilityGalleryProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<string>('semua');
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);

  const categories = [
    { key: 'semua', label: 'Semua Fasilitas' },
    { key: 'ruang_tunggu', label: 'Ruang Tunggu & Lobi' },
    { key: 'gigi', label: 'Poli Gigi' },
    { key: 'poli', label: 'Poli & Konsultasi' },
    { key: 'lab', label: 'Laboratorium' },
    { key: 'farmasi', label: 'Farmasi & Apotek' },
  ];

  const filteredFacilities = activeCategory === 'semua'
    ? CLINIC_FACILITIES
    : CLINIC_FACILITIES.filter(item => item.category === activeCategory);

  const handleNextFacility = () => {
    if (!selectedFacility) return;
    const currentIndex = CLINIC_FACILITIES.findIndex(f => f.id === selectedFacility.id);
    const nextIndex = (currentIndex + 1) % CLINIC_FACILITIES.length;
    setSelectedFacility(CLINIC_FACILITIES[nextIndex]);
  };

  const handlePrevFacility = () => {
    if (!selectedFacility) return;
    const currentIndex = CLINIC_FACILITIES.findIndex(f => f.id === selectedFacility.id);
    const prevIndex = (currentIndex - 1 + CLINIC_FACILITIES.length) % CLINIC_FACILITIES.length;
    setSelectedFacility(CLINIC_FACILITIES[prevIndex]);
  };

  return (
    <section id="fasilitas" className="py-16 md:py-24 bg-slate-50/70 border-b border-slate-200 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header with Human Editorial Title and Anti-Slop Discipline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold tracking-wide uppercase">
              <span>Fasilitas & Ruang Pelayanan</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Kenyamanan & Kebersihan Pasien</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Suasana Bersih, Sejuk & Menenangkan untuk Kenyamanan Anda
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Calon pasien dapat melihat langsung dokumentasi fasilitas Klinik Pratama Wijaya Medika. Dari ruang tunggu ber-AC yang nyaman, poli gigi higienis, ruang konsultasi privat, laboratorium, hingga depo obat terstandar.
            </p>
          </div>

          {/* Trust Highlights Strip */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0 text-xs text-slate-600">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
              <Wind className="w-3.5 h-3.5 text-teal-600" />
              <span>Full AC Sejuk & Bebas Pengap</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
              <Shield className="w-3.5 h-3.5 text-teal-600" />
              <span>Sterilisasi Alat Medis Berkala</span>
            </div>
          </div>
        </div>

        {/* Interactive Filter Tabs (Functional buttons as per frontend-design 1A) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid: 1 col (mobile), 2 col (tablet), 3 col (desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility) => (
            <div
              key={facility.id}
              onClick={() => setSelectedFacility(facility)}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image Container with zoom and fallback */}
              <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-900/15 group-hover:bg-slate-900/35 transition-colors duration-300" />
                
                {/* Category label badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-teal-800 font-semibold text-[11px] px-2.5 py-1 rounded-md shadow-2xs border border-white/50">
                  {facility.categoryLabel}
                </div>

                {/* View Detail overlay hover pill */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/80 text-white text-xs font-medium rounded-md backdrop-blur-xs">
                    <Eye className="w-3.5 h-3.5" />
                    Lihat Foto Penuh
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors leading-snug">
                    {facility.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                {/* Key feature points */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {facility.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Action button inside card */}
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px] font-mono">{facility.specs}</span>
                  <span className="text-teal-700 font-semibold group-hover:underline flex items-center gap-1">
                    Detail Foto &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Patient Review Context Callout adjacent to Gallery */}
        <div className="mt-10 p-5 bg-teal-900 text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-800 text-teal-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">
                Kenyamanan Pasien adalah Prioritas Utama Wijaya Medika
              </h4>
              <p className="text-xs sm:text-sm text-teal-200 mt-1 max-w-2xl leading-relaxed">
                "Ruang tunggunya bersih dan nyaman, tidak pengap. Buat janji temu bisa via chat terus sampai di lokasi dilayani dengan ramah..." – Yurisa Andika (Local Guide)
              </p>
            </div>
          </div>
          <button
            onClick={onOpenBooking}
            className="w-full md:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold bg-white text-teal-900 hover:bg-teal-50 rounded-lg shrink-0 transition-colors cursor-pointer"
          >
            Jadwalkan Kunjungan Anda
          </button>
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {selectedFacility && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedFacility(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-md">
                  {selectedFacility.categoryLabel}
                </span>
                <span className="text-sm font-bold text-slate-800 truncate">
                  {selectedFacility.title}
                </span>
              </div>
              <button
                onClick={() => setSelectedFacility(null)}
                className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                aria-label="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Large Image View with Navigation */}
            <div className="relative aspect-16/9 sm:aspect-16/10 bg-slate-900 flex items-center justify-center overflow-hidden">
              <img
                src={selectedFacility.image}
                alt={selectedFacility.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next controls */}
              <button
                onClick={handlePrevFacility}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fasilitas Sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextFacility}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fasilitas Selanjutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer: Facility Description & Details */}
            <div className="p-5 sm:p-6 bg-white overflow-y-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedFacility.title}
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  {selectedFacility.specs}
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedFacility.description}
              </p>

              {/* Facility Highlights Checklist */}
              <div>
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Keunggulan & Standar Kebersihan:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {selectedFacility.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-teal-50/70 border border-teal-100 text-xs text-teal-900 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal CTA */}
              <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Buka setiap hari 08:00 - 21:00 WIB · Palembang
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedFacility(null);
                      onOpenBooking();
                    }}
                    className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Daftar Janji Temu Sekarang
                  </button>
                  <button
                    onClick={() => setSelectedFacility(null)}
                    className="px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
