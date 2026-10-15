import React, { useState, useEffect } from 'react';
import { DOCTORS_SCHEDULE, CLINIC_INFO } from '../data/clinicData';
import { X, Calendar, Clock, User, Phone, CheckCircle, ShieldCheck, Send, Copy, ArrowLeft } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctor?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedDoctor,
}) => {
  const [selectedDoctorName, setSelectedDoctorName] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [shiftTime, setShiftTime] = useState<string>('Pagi (08:30 - 12:00)');
  const [paymentType, setPaymentType] = useState<string>('BPJS Kesehatan');
  const [complaint, setComplaint] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [bookingCode, setBookingCode] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedDoctor) {
      setSelectedDoctorName(preselectedDoctor);
    } else if (DOCTORS_SCHEDULE.length > 0 && !selectedDoctorName) {
      setSelectedDoctorName(DOCTORS_SCHEDULE[0].name);
    }

    // Default to today's date formatted as YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
    setBookingDate(today);
  }, [preselectedDoctor, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phoneNumber.trim()) return;

    // Generate readable booking code
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const dateFormatted = bookingDate.replace(/-/g, '');
    const code = `WM-${dateFormatted}-${randomSuffix}`;
    setBookingCode(code);
    setIsSuccess(true);
  };

  const currentDoctor = DOCTORS_SCHEDULE.find((d) => d.name === selectedDoctorName) || DOCTORS_SCHEDULE[0];

  const generateWhatsAppMessage = () => {
    return encodeURIComponent(
      `*PENDAFTARAN JANJI TEMU ONLINE*\n` +
      `Klinik Pratama Wijaya Medika Palembang\n` +
      `-----------------------------------------\n` +
      `*Kode Booking:* ${bookingCode}\n` +
      `*Nama Pasien:* ${patientName}\n` +
      `*No. WhatsApp:* ${phoneNumber}\n` +
      `*Dokter Tujuan:* ${selectedDoctorName} (${currentDoctor?.poliName})\n` +
      `*Tanggal:* ${bookingDate}\n` +
      `*Shift:* ${shiftTime}\n` +
      `*Jenis Pasien:* ${paymentType}\n` +
      `*Keluhan / Kebutuhan:* ${complaint || '-'}\n` +
      `-----------------------------------------\n` +
      `Mohon informasi nomor antrean dan konfirmasi kehadiran. Terima kasih!`
    );
  };

  const handleCopySummary = () => {
    const text = `Kode Booking: ${bookingCode} | Pasien: ${patientName} | Dokter: ${selectedDoctorName} | Jadwal: ${bookingDate} (${shiftTime}) | Faskes: Klinik Wijaya Medika Palembang`;
    navigator.clipboard?.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setPatientName('');
    setPhoneNumber('');
    setComplaint('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-teal-300" />
            <div>
              <h3 className="font-bold text-base text-white">
                Buat Janji Temu Dokter Online
              </h3>
              <p className="text-[11px] text-teal-200">
                Klinik Pratama Wijaya Medika · Konfirmasi Cepat
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-teal-200 hover:text-white hover:bg-teal-700 rounded-lg transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Doctor Picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Pilih Dokter & Poli Tujuan <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedDoctorName}
                onChange={(e) => setSelectedDoctorName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white text-slate-900"
              >
                {DOCTORS_SCHEDULE.map((doc) => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name} — {doc.poliName} ({doc.schedule.daysDisplay})
                  </option>
                ))}
              </select>
              {currentDoctor && (
                <div className="mt-1.5 text-[11px] text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-100 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <span>Jadwal: {currentDoctor.schedule.daysDisplay} | {currentDoctor.schedule.shifts.map(s => `${s.label} ${s.hours}`).join(', ')}</span>
                </div>
              )}
            </div>

            {/* Date and Shift */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Tanggal Kunjungan <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Pilihan Shift Jam <span className="text-red-500">*</span>
                </label>
                <select
                  value={shiftTime}
                  onChange={(e) => setShiftTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white text-slate-900"
                >
                  <option value="Pagi (08:30 - 12:00)">Pagi (08:30 - 12:00 WIB)</option>
                  <option value="Siang (13:00 - 15:30)">Siang (13:00 - 15:30 WIB)</option>
                  <option value="Sore/Malam (16:30 - 20:30)">Sore/Malam (16:30 - 20:30 WIB)</option>
                </select>
              </div>
            </div>

            {/* Patient Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nama Lengkap Pasien <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  No. WhatsApp Aktif <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 08128888xxxx"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method / Patient Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Kategori Pasien / Penjamin
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['BPJS Kesehatan', 'Umum / Mandiri', 'Asuransi Swasta'].map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setPaymentType(type)}
                    className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                      paymentType === type
                        ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Complaint / Medical Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Keluhan / Alasan Kunjungan (Opsional)
              </label>
              <textarea
                rows={2}
                placeholder="Contoh: Batuk pilek 3 hari, konsultasi gula darah, atau scaling karang gigi..."
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white text-slate-900"
              />
            </div>

            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Data Anda terlindungi dan hanya digunakan untuk administrasi medis klinik.</span>
            </div>

            {/* Form Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Konfirmasi Pendaftaran
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation State with Instant Summary & WhatsApp Action */
          <div className="p-6 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Pendaftaran Berhasil Dibuat!
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Simpan kode pendaftaran Anda di bawah dan kirim konfirmasi ke WhatsApp petugas untuk penerbitan nomor antrean.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-4 text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-teal-200/60 pb-2">
                <span className="text-slate-500 font-medium">Nomor Kode Booking:</span>
                <span className="font-mono font-bold text-teal-900 text-sm tracking-wider">
                  {bookingCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">Nama Pasien</span>
                  <span className="font-bold text-slate-900">{patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">No. WhatsApp</span>
                  <span className="font-medium text-slate-900">{phoneNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Dokter Tujuan</span>
                  <span className="font-semibold text-slate-900">{selectedDoctorName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Jadwal & Shift</span>
                  <span className="font-medium text-slate-900">{bookingDate} ({shiftTime.split(' ')[0]})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Penjamin</span>
                  <span className="font-medium text-teal-800">{paymentType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Lokasi</span>
                  <span className="font-medium text-slate-800">Ilir Timur I, Palembang</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="space-y-2 pt-1">
              <a
                href={`https://wa.me/${CLINIC_INFO.phoneClean}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Tiket ke WhatsApp Klinik ({CLINIC_INFO.phone})</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySummary}
                  className="flex-1 py-2 px-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copySuccess ? 'Tersalin ke Clipboard!' : 'Salin Ringkasan'}</span>
                </button>
                <button
                  onClick={handleReset}
                  className="py-2 px-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Daftar Lain</span>
                </button>
                <button
                  onClick={onClose}
                  className="py-2 px-4 bg-slate-900 text-white font-semibold text-xs rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
