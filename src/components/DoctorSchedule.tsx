import React, { useState } from 'react';
import { DOCTORS_SCHEDULE, Doctor } from '../data/clinicData';
import { Calendar, Clock, Search, ShieldCheck, CheckCircle2, UserCheck, Stethoscope } from 'lucide-react';

interface DoctorScheduleProps {
  onSelectDoctorToBook: (doctorName: string) => void;
}

export const DoctorSchedule: React.FC<DoctorScheduleProps> = ({ onSelectDoctorToBook }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Semua');
  const [selectedPoli, setSelectedPoli] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const daysList = ['Semua', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const poliOptions = [
    { key: 'semua', label: 'Semua Poli' },
    { key: 'umum', label: 'Poli Umum' },
    { key: 'gigi', label: 'Poli Gigi' },
    { key: 'spesialis', label: 'Spesialis Penyakit Dalam' },
    { key: 'anak', label: 'Spesialis Anak' }
  ];

  const filteredDoctors = DOCTORS_SCHEDULE.filter((doc: Doctor) => {
    // Filter by Day
    const matchesDay = selectedDay === 'Semua' || doc.days.includes(selectedDay);
    // Filter by Poli
    const matchesPoli = selectedPoli === 'semua' || doc.poli === selectedPoli;
    // Search query
    const matchesQuery = searchQuery === '' ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.notes.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDay && matchesPoli && matchesQuery;
  });

  return (
    <section id="jadwal-dokter" className="py-16 md:py-24 bg-white border-b border-slate-200 scroll-mt-14">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold tracking-wide uppercase">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Jadwal Dokter Online</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Klinik Pratama Wijaya Medika</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Cek Jadwal Praktik Dokter & Booking Tanpa Antre Panjang
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Jadwal diperbarui secara berkala. Pasien dapat memilih hari dan dokter yang diinginkan, kemudian langsung membuat janji temu online untuk verifikasi instan via WhatsApp maupun loket klinik.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 p-3 rounded-xl shrink-0">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Semua Dokter memiliki Surat Izin Praktik (SIP) Aktif</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-8 bg-slate-50/70 p-4 sm:p-5 rounded-2xl border border-slate-200">
          {/* Search Input & Poli Filter */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama dokter, spesialisasi, atau keluhan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent transition-all"
              />
            </div>

            <div className="md:col-span-6 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {poliOptions.map((poli) => (
                <button
                  key={poli.key}
                  onClick={() => setSelectedPoli(poli.key)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedPoli === poli.key
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {poli.label}
                </button>
              ))}
            </div>
          </div>

          {/* Day of Week Selector */}
          <div className="pt-2 border-t border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap mr-1">
              Hari Praktik:
            </span>
            {daysList.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedDay === day
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              Tidak Ada Jadwal Dokter Ditemukan
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Silakan atur filter hari atau kata kunci pencarian Anda untuk melihat dokter lainnya.
            </p>
            <button
              onClick={() => {
                setSelectedDay('Semua');
                setSelectedPoli('semua');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-teal-800 bg-white border border-teal-200 rounded-lg hover:bg-teal-50"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc: Doctor) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Doctor Card Top */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-base shrink-0 border border-teal-200">
                        {doc.name.split(' ')[0] === 'dr.' || doc.name.split(' ')[0] === 'drg.'
                          ? doc.name.split(' ')[1]?.[0] || 'D'
                          : doc.name[0]}
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-teal-700 uppercase tracking-wider block">
                          {doc.poliName}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {doc.name}
                        </h3>
                      </div>
                    </div>

                    {doc.todayAvailable && (
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md whitespace-nowrap shrink-0">
                        Praktik Hari Ini
                      </span>
                    )}
                  </div>

                  {/* Specialty & SIP */}
                  <div className="text-xs text-slate-600 space-y-1 mb-3">
                    <div className="font-medium text-slate-800">{doc.specialty}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{doc.sipNumber}</div>
                  </div>

                  {/* Notes / Clinical Focus */}
                  <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed mb-4">
                    {doc.notes}
                  </p>

                  {/* Schedule Details Box */}
                  <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-400 font-medium">Hari Praktik:</span>
                      <span className="font-semibold text-slate-800">{doc.schedule.daysDisplay}</span>
                    </div>

                    <div className="flex items-start justify-between text-slate-600">
                      <span className="text-slate-400 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Jam Shift:
                      </span>
                      <div className="text-right font-medium text-slate-900">
                        {doc.schedule.shifts.map((shift, i) => (
                          <div key={i} className="text-xs">
                            <span className="text-teal-700 font-semibold">{shift.label}:</span> {shift.hours}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => onSelectDoctorToBook(doc.name)}
                    className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 active:bg-teal-900 rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Pilih Dokter & Buat Janji</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BPJS & Asuransi Info Notice */}
        <div className="mt-10 p-4 bg-teal-50 border border-teal-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-teal-950">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
            <span>
              <strong>Pemberitahuan Pasien BPJS:</strong> Pastikan Anda membawa kartu BPJS/KTP asli atau KIS digital saat registrasi ulang di loket.
            </span>
          </div>
          <span className="text-teal-800 font-medium whitespace-nowrap">
            Info Loket: 0821-8203-1888
          </span>
        </div>
      </div>
    </section>
  );
};
