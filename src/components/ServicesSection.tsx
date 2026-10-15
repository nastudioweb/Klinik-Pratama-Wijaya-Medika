import React from 'react';
import { SERVICES_LIST } from '../data/clinicData';
import { ArrowUpRight, CheckCircle } from 'lucide-react';

interface ServicesSectionProps {
  onOpenBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="layanan" className="py-16 md:py-24 bg-white border-b border-slate-200 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-12">
          <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold tracking-wide uppercase">
            <span>Layanan Medis Terpadu</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500 font-normal">Klinik Pratama Wijaya Medika</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Solusi Kesehatan Komprehensif dari Pengobatan hingga Tindakan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Didukung oleh tenaga dokter umum, dokter gigi, dokter spesialis, paramedis, serta fasilitas laboratorium dan apotek di satu lokasi strategis Palembang.
          </p>
        </div>

        {/* 6 Services Grid with Editorial Numbering (01, 02...) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs hover:shadow-md hover:border-teal-200 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-slate-300 font-mono group-hover:text-teal-600 transition-colors">
                    {service.number}
                  </span>
                  <span className="text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-md">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {service.desc}
                </p>

                {/* Service Bullet Points */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  {service.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href="#jadwal-dokter"
                  className="text-xs font-semibold text-teal-700 group-hover:text-teal-800 inline-flex items-center gap-1"
                >
                  Lihat Jadwal Dokter
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 hover:underline cursor-pointer"
                >
                  Daftar Layanan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
