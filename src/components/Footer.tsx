import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { Phone, Clock, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-base">
                W
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                {CLINIC_INFO.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Fasilitas pelayanan kesehatan primer terpercaya di Kota Palembang. Memberikan pengobatan bermutu dengan empati, profesionalisme, serta fasilitas ber-AC yang bersih dan nyaman.
            </p>
            <div className="flex items-center gap-2 text-teal-300 font-semibold text-xs">
              <span>Rating Google Maps 4,7 / 5.0 (143 Ulasan Asli)</span>
            </div>
          </div>

          {/* Col 2: Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#layanan" className="hover:text-white transition-colors">
                  Layanan Poli & MCU
                </a>
              </li>
              <li>
                <a href="#jadwal-dokter" className="hover:text-white transition-colors">
                  Jadwal Praktik Dokter Online
                </a>
              </li>
              <li>
                <a href="#fasilitas" className="hover:text-white transition-colors">
                  Galeri Foto Fasilitas & Interior
                </a>
              </li>
              <li>
                <a href="#ulasan" className="hover:text-white transition-colors">
                  Ulasan Pasien (Rating 4,7)
                </a>
              </li>
              <li>
                <a href="#lokasi" className="hover:text-white transition-colors">
                  Lokasi & Petunjuk Arah
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
              Kontak & Operasional
            </h4>
            <div className="space-y-2.5 text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{CLINIC_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Buka Setiap Hari: 08:00 - 21:00 WIB</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${CLINIC_INFO.phoneClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-teal-300 font-medium"
                >
                  WhatsApp: {CLINIC_INFO.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} {CLINIC_INFO.name}. Hak Cipta Dilindungi.
          </div>
          <div className="flex items-center gap-1">
            <span>Melayani dengan Sepenuh Hati untuk Warga Palembang</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
