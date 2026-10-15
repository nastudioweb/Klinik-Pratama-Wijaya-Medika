export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  poli: 'umum' | 'gigi' | 'spesialis' | 'anak';
  poliName: string;
  sipNumber: string;
  experience: string;
  days: string[];
  schedule: {
    daysDisplay: string;
    shifts: {
      label: string;
      hours: string;
    }[];
  };
  todayAvailable: boolean;
  notes: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  category: 'semua' | 'ruang_tunggu' | 'poli' | 'gigi' | 'lab' | 'farmasi';
  categoryLabel: string;
  image: string;
  description: string;
  features: string[];
  specs: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  badge?: string;
  reviewsCount?: string;
  timeAgo: string;
  rating: number;
  text: string;
  tag: 'pelayanan' | 'perawat' | 'dingin' | 'gigi' | 'bpjs';
  isLocalGuide?: boolean;
}

export const CLINIC_INFO = {
  name: 'Klinik Pratama Wijaya Medika',
  tagline: 'Layanan Kesehatan Keluarga Terpercaya & Ramah di Palembang',
  shortName: 'Wijaya Medika',
  category: 'Klinik Pratama Rawat Jalan',
  rating: 4.7,
  totalReviews: 143,
  phone: '0821-8203-1888',
  phoneClean: '6282182031888',
  address: 'Jl. D No.I 20, Ilir D II, Kec. Ilir Tim. I, Kota Palembang, Sumatera Selatan 30114',
  plusCode: '2QG4+74 20 Ilir D. I, Kota Palembang, Sumatera Selatan',
  operatingHours: 'Setiap Hari · 08:00 - 21:00 WIB',
  isOpenNow: true,
  bpjsAccepted: true,
  facilitiesHighlights: [
    'Menerima Pasien BPJS & Umum',
    'Buka Hingga Pukul 21.00 WIB',
    'Ruang Tunggu Bersih & Ber-AC',
    'Dokter & Perawat Ramah',
    'Janji Temu Online / WhatsApp',
    'Apotek & Laboratorium Lengkap'
  ]
};

export const SERVICES_LIST = [
  {
    id: 'poli-umum',
    number: '01',
    title: 'Poli Dokter Umum',
    badge: 'Layanan Utama',
    desc: 'Pemeriksaan kesehatan menyeluruh, diagnosis penyakit umum, penanganan batuk/pilek/demam, konsultasi resep, serta skrining tensi & diabetes.',
    points: ['Pemeriksaan keluhan medis akut & kronis', 'Surat keterangan sehat & rujukan BPJS', 'Konsultasi pola makan & kesehatan'],
    poliKey: 'umum'
  },
  {
    id: 'poli-gigi',
    number: '02',
    title: 'Poli Gigi & Mulut',
    badge: 'Populer',
    desc: 'Perawatan gigi modern dengan dental unit higienis. Mulai dari scaling karang gigi, tambal estetik, cabut gigi aman, hingga perawatan gigi anak.',
    points: ['Scaling (pembersihan karang gigi)', 'Penambalan komposit sewarna gigi', 'Pencabutan gigi bungsu & perawatan behel'],
    poliKey: 'gigi'
  },
  {
    id: 'poli-spesialis',
    number: '03',
    title: 'Poli Dokter Spesialis',
    badge: 'Jadwal Terjadwal',
    desc: 'Layanan dokter spesialis berdedikasi seperti Dokter Spesialis Anak (Sp.A) dan Dokter Spesialis Penyakit Dalam (Sp.PD) untuk diagnosis lebih komprehensif.',
    points: ['Spesialis Anak: Tumbuh kembang & imunisasi', 'Spesialis Penyakit Dalam: Skrining organ & metabolik', 'Penjelasan detail & komunikatif'],
    poliKey: 'spesialis'
  },
  {
    id: 'homecare',
    number: '04',
    title: 'Layanan Medis Homecare',
    badge: 'Kunjungan Rumah',
    desc: 'Petugas medis dokter & perawat Wijaya Medika siap berkunjung ke kediaman Anda untuk perawatan lansia, pasien pasca-rawat, atau luka diabetes.',
    points: ['Perawatan luka medis & ganti perban steril', 'Pemasangan kateter / infus di rumah', 'Pemeriksaan tensi & sampling darah lansia'],
    poliKey: 'umum'
  },
  {
    id: 'laboratorium',
    number: '05',
    title: 'Laboratorium & Uji Diagnostik',
    badge: 'Hasil Cepat',
    desc: 'Pengambilan sampel darah dan pemeriksaan laboratorium langsung di tempat dengan instrumen presisi dan petugas phlebotomy yang lembut.',
    points: ['Darah rutin, hemoglobin & trombosit', 'Gula darah, kolesterol, asam urat, fungsi ginjal', 'Tes swab antigen & urinalisis komprehensif'],
    poliKey: 'umum'
  },
  {
    id: 'medical-checkup',
    number: '06',
    title: 'Medical Check Up (MCU)',
    badge: 'Paket Terpadu',
    desc: 'Skrining kesehatan terpadu berkala untuk individu, keluarga, maupun instansi kerja di Palembang dengan laporan hasil rapi dan konsultasi dokter.',
    points: ['Paket MCU Basic, Silver, & Gold', 'MCU Pra-Kerja & Syarat Beasiswa/Institusi', 'Rangkuman dokter & edukasi pencegahan'],
    poliKey: 'umum'
  }
];

export const DOCTORS_SCHEDULE: Doctor[] = [
  {
    id: 'dr-ahmad-wijaya',
    name: 'dr. H. Ahmad Wijaya, Sp.PD',
    specialty: 'Spesialis Penyakit Dalam (Internis)',
    poli: 'spesialis',
    poliName: 'Poli Penyakit Dalam',
    sipNumber: 'SIP. 503/440/124/DPMPTSP/2022',
    experience: '14 Tahun Pengalaman',
    days: ['Senin', 'Rabu', 'Jumat'],
    schedule: {
      daysDisplay: 'Senin, Rabu, Jumat',
      shifts: [
        { label: 'Sore', hours: '16:30 - 20:30 WIB' }
      ]
    },
    todayAvailable: true,
    notes: 'Konsultasi hipertensi, diabetes melitus, lambung, dan keluhan organ dalam.'
  },
  {
    id: 'dr-sarah-pratiwi',
    name: 'dr. Sarah Pratiwi, Sp.A',
    specialty: 'Spesialis Anak (Pediatri)',
    poli: 'anak',
    poliName: 'Poli Spesialis Anak',
    sipNumber: 'SIP. 503/440/215/DPMPTSP/2023',
    experience: '10 Tahun Pengalaman',
    days: ['Selasa', 'Kamis', 'Sabtu'],
    schedule: {
      daysDisplay: 'Selasa, Kamis, Sabtu',
      shifts: [
        { label: 'Sore', hours: '16:00 - 20:00 WIB' }
      ]
    },
    todayAvailable: true,
    notes: 'Pemeriksaan anak sakit, vaksinasi lengkap, pemantauan kurva tumbuh kembang balita.'
  },
  {
    id: 'dr-rizky-pratama',
    name: 'dr. Rizky Pratama',
    specialty: 'Dokter Umum & Gawat Darurat Ringan',
    poli: 'umum',
    poliName: 'Poli Umum',
    sipNumber: 'SIP. 503/440/089/DPMPTSP/2021',
    experience: '7 Tahun Pengalaman',
    days: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    schedule: {
      daysDisplay: 'Setiap Hari',
      shifts: [
        { label: 'Pagi', hours: '08:00 - 14:00 WIB' }
      ]
    },
    todayAvailable: true,
    notes: 'Pemeriksaan umum harian, surat sehat, rujukan BPJS, dan penanganan demam.'
  },
  {
    id: 'dr-indah-lestari',
    name: 'dr. Indah Lestari',
    specialty: 'Dokter Umum & Skrining Kardiovaskular',
    poli: 'umum',
    poliName: 'Poli Umum',
    sipNumber: 'SIP. 503/440/342/DPMPTSP/2022',
    experience: '6 Tahun Pengalaman',
    days: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    schedule: {
      daysDisplay: 'Senin s/d Sabtu',
      shifts: [
        { label: 'Sore', hours: '14:00 - 21:00 WIB' }
      ]
    },
    todayAvailable: true,
    notes: 'Konsultasi umum shift sore/malam, pengecekan tensi rutin, dan penanganan luka.'
  },
  {
    id: 'drg-amanda-putri',
    name: 'drg. Amanda Putri Kartika',
    specialty: 'Dokter Gigi Umum & Estetik',
    poli: 'gigi',
    poliName: 'Poli Gigi',
    sipNumber: 'SIP. 503/440/412/DPMPTSP/2023',
    experience: '8 Tahun Pengalaman',
    days: ['Senin', 'Rabu', 'Kamis', 'Jumat'],
    schedule: {
      daysDisplay: 'Senin, Rabu, Kamis, Jumat',
      shifts: [
        { label: 'Pagi & Sore', hours: '09:00 - 13:00 & 16:30 - 20:30 WIB' }
      ]
    },
    todayAvailable: true,
    notes: 'Pembersihan karang gigi ultrasonik, penambalan komposit, perawatan gigi sensitif.'
  },
  {
    id: 'drg-bima-setiawan',
    name: 'drg. Bima Setiawan',
    specialty: 'Dokter Gigi & Perawatan Gigi Anak',
    poli: 'gigi',
    poliName: 'Poli Gigi',
    sipNumber: 'SIP. 503/440/531/DPMPTSP/2024',
    experience: '5 Tahun Pengalaman',
    days: ['Selasa', 'Sabtu', 'Minggu'],
    schedule: {
      daysDisplay: 'Selasa, Sabtu, Minggu',
      shifts: [
        { label: 'Pagi & Sore', hours: '09:00 - 13:00 & 16:00 - 20:00 WIB' }
      ]
    },
    todayAvailable: false,
    notes: 'Pencabutan gigi susu dan dewasa aman, konsultasi kawat gigi, edukasi oral hygiene.'
  }
];

export const CLINIC_FACILITIES: FacilityItem[] = [
  {
    id: 'fac-waiting',
    title: 'Ruang Tunggu Pasien Ber-AC & Nyaman',
    category: 'ruang_tunggu',
    categoryLabel: 'Ruang Tunggu',
    image: '/assets/images/clinic_waiting_room_1792067056017.jpg',
    description: 'Suasana ruang tunggu sejuk ber-AC dengan kursi ergonomis, lantai marmer bersih, pencahayaan alami yang menenangkan, serta layar informasi kesehatan dan display antrean.',
    features: ['Pendingin Udara (AC) Dingin & Higienis', 'Layar Antrean & Informasi Edukasi', 'Dispenser Air Bersih & Area Rapi'],
    specs: 'Kapasitas 40+ pasien duduk dengan jarak nyaman'
  },
  {
    id: 'fac-dental',
    title: 'Poli Gigi Modern dengan Dental Unit Higienis',
    category: 'gigi',
    categoryLabel: 'Poli Gigi',
    image: '/assets/images/clinic_dental_room_1792067055520.jpg',
    description: 'Ruang praktek dokter gigi terstandar dengan dental chair ergonomis berbalut teal modern, instrumen disterilisasi suhu tinggi secara berkala, dan visualisasi rontgen digital.',
    features: ['Dental Chair Unit Ergonomis', 'Sterilisasi Autoclave Standar Medis', 'Lampu Pemeriksaan LED Fokus'],
    specs: 'Instrumen steril single-use packaging untuk keamanan pasien'
  },
  {
    id: 'fac-consultation',
    title: 'Ruang Konsultasi Dokter yang Nyaman & Privat',
    category: 'poli',
    categoryLabel: 'Poli & Konsultasi',
    image: '/assets/images/clinic_doctor_consultation_1792067055172.jpg',
    description: 'Ruang pemeriksaan dokter yang tenang dan privat, memastikan setiap pasien dapat berkonsultasi secara mendalam tanpa terburu-buru, dilengkapi meja dokter dan bed periksa higienis.',
    features: ['Privasi Percakapan Medis 100%', 'Bed Pemeriksaan dengan Sekat Bersih', 'Peralatan Diagnostik Digital Terkalibrasi'],
    specs: 'Ruang kedap nyaman untuk konsultasi mendalam'
  },
  {
    id: 'fac-lab',
    title: 'Laboratorium & Ruang Sampling Phlebotomy',
    category: 'lab',
    categoryLabel: 'Laboratorium',
    image: '/assets/images/clinic_laboratory_sampling_1792067055946.jpg',
    description: 'Fasilitas diagnostik laboratorium mandiri dengan kursi pengambilan darah ergonomis, centrifuge modern, dan instrumen analisis otomatis demi hasil pemeriksaan yang cepat dan presisi.',
    features: ['Sampling Darah Ramah & Lembut', 'Pemeriksaan Darah Lengkap & Kimia Darah', 'Hasil Langsung Siap dalam Waktu Singkat'],
    specs: 'Kalibrasi rutin berkala & standar biosafety terjamin'
  },
  {
    id: 'fac-pharmacy',
    title: 'Apotek & Ruang Penyerahan Obat Terstandar',
    category: 'farmasi',
    categoryLabel: 'Farmasi & Apotek',
    image: '/assets/images/clinic_pharmacy_1792067087758.jpg',
    description: 'Depo farmasi resmi dengan stok obat asli terdaftar BPOM. Petugas apoteker memberikan edukasi dan penjelasan cara konsumsi obat secara jelas kepada setiap pasien.',
    features: ['100% Obat Asli Terdaftar BPOM', 'Penyimpanan Suhu Khusus Terpantau', 'Penjelasan Dosis Rinci oleh Apoteker'],
    specs: 'Pengambilan resep cepat tanpa antrean panjang'
  },
  {
    id: 'fac-lobby',
    title: 'Lobi & Meja Registrasi Pasien Ramah',
    category: 'ruang_tunggu',
    categoryLabel: 'Resepsi & Pelayanan',
    image: '/assets/images/hero_clinic_building_1792067052793.jpg',
    description: 'Area depan dan meja resepsionis yang bersih dan luas, tempat staf menyambut Anda dengan senyum ramah, memandu pendaftaran pasien BPJS maupun mandiri secara cepat.',
    features: ['Petugas Sigap & Cepat Tanggap', 'Pendaftaran BPJS Kesehatan & Umum Cepat', 'Informasi Jadwal Dokter Transparan'],
    specs: 'Alur pendaftaran teratur dan mudah diakses lansia'
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'bernadeta susilowati',
    badge: 'Pasien Terverifikasi',
    reviewsCount: '4 ulasan · 3 foto',
    timeAgo: '4 bulan lalu',
    rating: 5,
    tag: 'bpjs',
    text: 'Walaupun berobat pakai bpjs, layanannya bintang 5. Dokternya baik banget, detail kasih penjelasan, dan sabar. Semua staff juga ramah. Tetap pertahankan layanan yang keren ini ya.'
  },
  {
    id: 'rev-2',
    author: 'Yurisa Andika',
    badge: 'Local Guide',
    reviewsCount: '168 ulasan · 406 foto',
    timeAgo: 'setahun lalu',
    rating: 5,
    tag: 'pelayanan',
    isLocalGuide: true,
    text: 'Baru pertama kali cobain tapi pelayanannya mudah dan enak banget. Buat janji temu bisa by chat terus sampe ke lokasi dilayani dengan ramah dan jelas informasi yang diberikan. Dokternya juga profesional, tidak molor dari jam janji dan bahkan untuk dokter umumnya tidak ngantri lama. Terbilang murah untuk klinik. Ruang tunggunya bersih dan nyaman, hanya area parkirnya saja yg kecil. Mungkin bisa dipertimbangkan untuk penambahan area parkirnya.'
  },
  {
    id: 'rev-3',
    author: 'Alva Rizq',
    badge: 'Local Guide',
    reviewsCount: '13 ulasan · 9 foto',
    timeAgo: 'setahun lalu',
    rating: 5,
    tag: 'perawat',
    isLocalGuide: true,
    text: 'Pelayanan cepat dan ramah, dokter dan karyawan baik semua, klinik bersih dan nyaman. Klinik Wijaya Medika juga melayani Poli Dokter Umum, Poli Gigi, Poli Spesialis, Homecare, Laboratorium, dan Medical Check Up.'
  },
  {
    id: 'rev-4',
    author: 'M. Firmansyah',
    badge: 'Pasien Poli Gigi',
    timeAgo: '3 bulan lalu',
    rating: 5,
    tag: 'gigi',
    text: 'Baik Pegawai, Dokter maupun Perawat melayani dgn ramah dan Baik. Ruangannya dingin dan bersih banget, anak-anak tidak takut saat periksa ke poli gigi. Hasil scaling karang gigi rapi dan dokternya telaten.'
  },
  {
    id: 'rev-5',
    author: 'Ratna Wulandari',
    badge: 'Pasien Rutin',
    timeAgo: '6 bulan lalu',
    rating: 5,
    tag: 'dingin',
    text: 'Tempat suami dan rekan kerja langganan test antigen dulu dan sekarang periksa rutin tensi & kolesterol di sini. Ruang periksa dan ruang tunggunya selalu bersih, dingin, dan tidak pengap.'
  },
  {
    id: 'rev-6',
    author: 'Hendra Saputra',
    badge: 'Pasien Umum',
    timeAgo: '2 bulan lalu',
    rating: 4,
    tag: 'pelayanan',
    text: 'Pelayanan sangat baik, petugas dan karyawan cepat tanggap dalam melayani pasien. Pengambilan obat cepat dan dijelaskan dengan detail aturan minumnya.'
  }
];

export const PEAK_HOURS_DATA = [
  { time: '08:00', level: 'Tenang', height: 28, desc: 'Waktu ideal untuk pemeriksaan santai & lansia' },
  { time: '10:00', level: 'Sedang', height: 50, desc: 'Mulai ada pasien kontrol & lab' },
  { time: '12:00', level: 'Ramai', height: 75, desc: 'Kunjungan jam istirahat siang' },
  { time: '15:00', level: 'Sedang', height: 45, desc: 'Peralihan shift dokter' },
  { time: '17:00', level: 'Ramai Aktif', height: 90, desc: 'Jam praktek poli spesialis & poli gigi' },
  { time: '19:00', level: 'Ramai', height: 80, desc: 'Pasien pulang kantor' },
  { time: '21:00', level: 'Tutup', height: 15, desc: 'Klinik tutup pukul 21:00' }
];
