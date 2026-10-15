import React from 'react';
import { Star, ShieldCheck, Clock, MapPin, Calendar, PhoneCall, ChevronRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section id="beranda" className="relative bg-gradient-to-b from-teal-50/60 via-white to-white pt-8 pb-16 md:pt-12 md:pb-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Split Hero: Text Proposition on Left, High-Impact Visual Asset on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (7 cols): Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Trust badge with unboxed metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-teal-800">Klinik Pratama Berizin Resmi</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Palembang, Sumatera Selatan</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-emerald-700 font-medium">Buka Setiap Hari s/d 21:00</span>
            </div>

            {/* Headline with strict type scale and text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              Pelayanan Medis Ramah, Cepat & Terpercaya untuk Seluruh Keluarga
            </h1>

            {/* Concrete Value Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Selamat datang di <strong className="text-slate-900 font-semibold">{CLINIC_INFO.name}</strong>. Melayani Poli Umum, Poli Gigi, Dokter Spesialis, Homecare ke rumah, Laboratorium, serta Medical Check Up. Menerima pasien <strong className="text-teal-800 font-semibold">BPJS Kesehatan</strong> dan pasien umum dengan standar kebersihan tinggi.
            </p>

            {/* Google Maps Real Review Proof Bar */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-base">
                <span className="text-amber-500 flex items-center">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </span>
                <span>{CLINIC_INFO.rating.toString().replace('.', ',')}</span>
                <span className="text-xs text-slate-500 font-normal">/ 5.0</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600">
                Berdasarkan <strong>{CLINIC_INFO.totalReviews} Ulasan Asli Google Maps</strong>
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-teal-700 font-medium">
                "Pelayanan cepat, ramah, dan tidak antri lama"
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 active:bg-teal-900 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Buat Janji Temu Dokter</span>
              </button>

              <a
                href="#jadwal-dokter"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors"
              >
                <span>Lihat Jadwal Dokter</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href={`https://wa.me/${CLINIC_INFO.phoneClean}?text=Halo%20Klinik%20Pratama%20Wijaya%20Medika,%20saya%20ingin%20bertanya%20mengenai%20layanan%20klinik.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 rounded-lg border border-emerald-200 transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp: {CLINIC_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): High-Impact Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 group">
              <img
                src="/src/assets/images/hero_clinic_building_1792067052793.jpg"
                alt="Fasilitas dan Meja Pelayanan Klinik Pratama Wijaya Medika Palembang"
                className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs uppercase tracking-wider text-teal-300 font-semibold mb-1">
                  Klinik Pratama Wijaya Medika
                </span>
                <h3 className="text-base font-bold text-white mb-1">
                  Lobi & Ruang Pelayanan Pasien
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Gedung bersih, fasilitas ber-AC, dan staf ramah siap melayani Anda di Ilir Timur I Palembang.
                </p>
              </div>
            </div>

            {/* Floating verification badge */}
            <div className="absolute -bottom-4 -left-3 sm:-left-5 bg-white p-3 rounded-xl border border-slate-200 shadow-md flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-slate-900">BPJS & Swasta Diterima</div>
                <div className="text-slate-500">Pelayanan bintang 5 untuk semua</div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column Key Clinic Highlights row below hero split */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <div className="text-xs text-slate-500 mb-1">Jam Operasional</div>
            <div className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-600 shrink-0" />
              <span>08:00 - 21:00</span>
            </div>
            <div className="text-xs text-emerald-700 font-medium mt-1">Buka Setiap Hari (Senin - Minggu)</div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <div className="text-xs text-slate-500 mb-1">Poli & Dokter</div>
            <div className="text-base sm:text-lg font-bold text-slate-900">
              Umum, Gigi, Spesialis
            </div>
            <div className="text-xs text-slate-500 mt-1">Spesialis Anak & Penyakit Dalam</div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <div className="text-xs text-slate-500 mb-1">Fasilitas Diagnostik</div>
            <div className="text-base sm:text-lg font-bold text-slate-900">
              Lab & Farmasi Siap
            </div>
            <div className="text-xs text-slate-500 mt-1">Uji Darah Cepat, Gula & Kolesterol</div>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl">
            <div className="text-xs text-slate-500 mb-1">Layanan Pasien</div>
            <div className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Ilir Timur I, Palembang</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">Tersedia Layanan Homecare ke Rumah</div>
          </div>
        </div>
      </div>
    </section>
  );
};
