import React, { useState } from 'react';
import { CLINIC_INFO, PEAK_HOURS_DATA } from '../data/clinicData';
import { MapPin, Navigation, Phone, Clock, Bookmark, Send, Share2, Compass, CheckCircle } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [copiedNotice, setCopiedNotice] = useState<string>('');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: CLINIC_INFO.name,
        text: `Klinik Pratama Wijaya Medika Palembang: ${CLINIC_INFO.address}. Telp: ${CLINIC_INFO.phone}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${CLINIC_INFO.name}\n${CLINIC_INFO.address}\nTelp/WA: ${CLINIC_INFO.phone}`);
      showCopiedNotice('Alamat dan kontak klinik berhasil disalin!');
    }
  };

  const handleSaveContact = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Klinik Pratama Wijaya Medika
ORG:Klinik Pratama Wijaya Medika
TEL;TYPE=WORK,VOICE:${CLINIC_INFO.phone}
ADR;TYPE=WORK:;;${CLINIC_INFO.address};Palembang;Sumatera Selatan;30114;Indonesia
URL:${window.location.href}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Klinik_Wijaya_Medika.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showCopiedNotice('Kontak tersimpan (File .VCF terunduh)!');
  };

  const showCopiedNotice = (msg: string) => {
    setCopiedNotice(msg);
    setTimeout(() => setCopiedNotice(''), 3500);
  };

  return (
    <section id="lokasi" className="py-16 md:py-24 bg-white border-b border-slate-200 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="max-w-2xl space-y-3 mb-10">
          <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold tracking-wide uppercase">
            <Compass className="w-4 h-4 text-teal-600" />
            <span>Lokasi, Rute & Jam Ramai</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500 font-normal">Kota Palembang</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Kunjungi Klinik Pratama Wijaya Medika
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Berada di lokasi strategis Ilir Timur I, mudah diakses kendaraan roda dua maupun roda empat dari berbagai penjuru Palembang.
          </p>
        </div>

        {/* 2-Column Split: Clinic Profile & Google Maps details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (5 cols): Google Maps Card Info */}
          <div className="lg:col-span-5 bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider block">
                    {CLINIC_INFO.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">
                    {CLINIC_INFO.name}
                  </h3>
                </div>
                <div className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-1 rounded-md shrink-0">
                  Buka Sekarang
                </div>
              </div>

              {/* Action Buttons Row directly matching Google Maps: Rute, Simpan, Di Sekitar, Kirim ke ponsel, Bagikan */}
              <div className="grid grid-cols-4 gap-2 pt-1 pb-4 border-b border-slate-200 text-center">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_INFO.name + ' ' + CLINIC_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl flex flex-col items-center gap-1 transition-colors"
                >
                  <Navigation className="w-4 h-4" />
                  <span className="text-[11px] font-semibold">Rute</span>
                </a>

                <button
                  onClick={handleSaveContact}
                  className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl flex flex-col items-center gap-1 transition-colors cursor-pointer"
                >
                  <Bookmark className="w-4 h-4 text-teal-700" />
                  <span className="text-[11px] font-medium">Simpan</span>
                </button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Lokasi ${CLINIC_INFO.name}: ${CLINIC_INFO.address} (Telp: ${CLINIC_INFO.phone})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl flex flex-col items-center gap-1 transition-colors"
                >
                  <Send className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px] font-medium">Kirim HP</span>
                </a>

                <button
                  onClick={handleShare}
                  className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl flex flex-col items-center gap-1 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-slate-600" />
                  <span className="text-[11px] font-medium">Bagikan</span>
                </button>
              </div>

              {/* Detail Info List */}
              <div className="pt-4 space-y-3.5 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">Alamat Lengkap</div>
                    <div className="text-slate-600 leading-relaxed mt-0.5">{CLINIC_INFO.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Compass className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">Plus Code Google Maps</div>
                    <div className="text-slate-600 font-mono mt-0.5">{CLINIC_INFO.plusCode}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">Jam Layanan</div>
                    <div className="text-emerald-700 font-medium mt-0.5">Buka · Tutup pukul 21.00 WIB</div>
                    <div className="text-slate-500 text-xs">Senin - Minggu (Termasuk Hari Libur Terjadwal)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">Telepon & WhatsApp Loket</div>
                    <a
                      href={`https://wa.me/${CLINIC_INFO.phoneClean}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-800 hover:underline font-semibold block mt-0.5"
                    >
                      {CLINIC_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification alert banner if copied */}
            {copiedNotice && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{copiedNotice}</span>
              </div>
            )}
          </div>

          {/* Right Column (7 cols): Peak Hours Activity Chart & Maps Visual */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            {/* Jam Ramai (Popular Times) Bar Chart based on Google Maps data */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Jam Ramai Kunjungan (Google Maps Data)
                  </h4>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                  Kamis & Hari Kerja
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                Status saat ini: <strong className="text-emerald-700">Aktif · Tidak terlalu ramai di pagi hari</strong>. Pasien lansia dan anak disarankan berkunjung pukul 08:00 - 11:00.
              </p>

              {/* Bar visualization */}
              <div className="h-32 flex items-end justify-between gap-2 sm:gap-4 pt-4 border-b border-slate-100 pb-2">
                {PEAK_HOURS_DATA.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {item.time}: {item.level} ({item.desc})
                    </div>
                    
                    <div
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        item.time === '17:00'
                          ? 'bg-teal-700'
                          : item.time === '12:00'
                          ? 'bg-teal-600'
                          : 'bg-teal-200 hover:bg-teal-300'
                      }`}
                      style={{ height: `${item.height}%` }}
                    />
                    <span className="text-[10px] font-mono text-slate-500">{item.time}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-4 text-[11px] text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-teal-200 inline-block" />
                    <span>Lancar / Lengang</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-teal-700 inline-block" />
                    <span>Puncak Kunjungan (Shift Sore)</span>
                  </span>
                </div>
                <span>Update berkala dari Google</span>
              </div>
            </div>

            {/* Embedded Google Maps Simulated Interactive Card */}
            <div className="bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative shadow-2xs">
              <div className="p-4 bg-white/90 backdrop-blur-xs border-b border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Peta Lokasi: 20 Ilir D. I, Kec. Ilir Timur I, Palembang
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Dekat pusat perumahan & perkantoran Ilir Timur
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC_INFO.name + ' Palembang')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Buka di Google Maps</span>
                </a>
              </div>

              {/* Map visualizer container */}
              <div className="h-44 sm:h-52 bg-slate-200 relative flex items-center justify-center p-4">
                <div className="text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-teal-700 text-white mx-auto flex items-center justify-center shadow-md animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="bg-white/95 px-3 py-1.5 rounded-lg shadow-sm border border-slate-200 text-xs">
                    <div className="font-bold text-slate-900">{CLINIC_INFO.name}</div>
                    <div className="text-slate-500 text-[11px] font-mono">{CLINIC_INFO.plusCode}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
