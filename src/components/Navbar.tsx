import React, { useState } from 'react';
import { Phone, Calendar, Clock, Menu, X } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface NavbarProps {
  onOpenBooking: (doctorName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro bar for emergency / operational status */}
      <div className="bg-teal-900 text-teal-100 text-xs py-1.5 px-4 md:px-8 flex justify-between items-center text-slate-300">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-teal-200 font-medium">
            <Clock className="w-3.5 h-3.5 text-teal-300" />
            {CLINIC_INFO.operatingHours}
          </span>
          <span className="hidden sm:inline text-teal-400">·</span>
          <span className="hidden sm:inline text-teal-200">Menerima Pasien BPJS Kesehatan & Umum</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${CLINIC_INFO.phoneClean}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>WA: {CLINIC_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Top Bar strictly obeying the 3-Zone Top Bar Contract:
          Zone 1: Single text element brand wordmark
          Zone 2: 4-5 single-line clean text links
          Zone 3: 1 primary action */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 md:px-8 py-3.5">
        {/* Zone 1: Brand Wordmark */}
        <a href="#beranda" className="flex items-center gap-2.5 text-slate-900 whitespace-nowrap shrink-0 group">
          <div className="w-9 h-9 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-teal-800 transition-colors">
            W
          </div>
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
              Wijaya Medika
            </span>
            <span className="text-[10px] tracking-wider text-slate-500 uppercase font-medium">
              Klinik Pratama Palembang
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a href="#layanan" className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">
            Layanan Poli
          </a>
          <a href="#jadwal-dokter" className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">
            Jadwal Dokter
          </a>
          <a href="#fasilitas" className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 font-semibold text-teal-800">
            Galeri Fasilitas
          </a>
          <a href="#ulasan" className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">
            Ulasan Pasien
          </a>
          <a href="#lokasi" className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0">
            Lokasi & Rute
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenBooking()}
            className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 active:bg-teal-900 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Buat Janji Temu</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-md focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <a
            href="#layanan"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-teal-700 py-1.5"
          >
            Layanan Poli
          </a>
          <a
            href="#jadwal-dokter"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-teal-700 py-1.5"
          >
            Jadwal Dokter Online
          </a>
          <a
            href="#fasilitas"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-teal-800 py-1.5"
          >
            Galeri Fasilitas & Interior
          </a>
          <a
            href="#ulasan"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-teal-700 py-1.5"
          >
            Ulasan Pasien (Rating 4,7)
          </a>
          <a
            href="#lokasi"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-700 hover:text-teal-700 py-1.5"
          >
            Lokasi & Rute Maps
          </a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800"
            >
              Buat Janji Online Sekarang
            </button>
            <a
              href={`https://wa.me/${CLINIC_INFO.phoneClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 text-center text-sm font-medium text-teal-800 bg-teal-50 rounded-lg border border-teal-200 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp: {CLINIC_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
