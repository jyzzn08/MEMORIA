import { Student, YearbookMessage } from '../types';

/**
 * Helper untuk membuat tanda tangan dummy berupa SVG Data URL
 * Berguna agar sample data awal sudah memiliki signature digital yang elegan
 */
function createDummySignature(name: string, strokeColor: string = '#1e293b'): string {
  // SVG kaligrafi sederhana yang di-encode ke Base64 Data URL
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" width="240" height="80">
    <path d="M 20,50 Q 50,15 80,45 T 130,40 Q 160,20 180,55 T 220,40 M 40,65 Q 110,68 200,60" fill="none" stroke="${strokeColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="120" y="74" font-family="'Caveat', cursive, sans-serif" font-size="14" fill="${strokeColor}" opacity="0.8" text-anchor="middle">${name}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 1,
    name: 'Alya Putri Maharani',
    nickname: 'Alya',
    class: 'XII MIPA 1',
    bio: 'Ketua kelas yang selalu memastikan tugas kelompok selesai tepat waktu. Pecinta senja dan secangkir teh hangat di lab komputer.',
    quote: 'Bukan tentang seberapa cepat kita sampai, tapi siapa saja yang melangkah bersama kita.',
    hobbies: ['Fotografi', 'Membaca'],
    extracurriculars: ['OSIS'],
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    bentoSpan: 'featured', // Card featured 2x2 di desktop/tablet
    dreamCareer: 'Data Scientist & Wildlife Photographer',
    socialHandle: '@alyaputri.m',
    favoriteMemory: 'Begadang bikin mading sekolah sampai diusir penjaga gerbang'
  },
  {
    id: 2,
    name: 'Bima Arya Pratama',
    nickname: 'Bima',
    class: 'XII MIPA 1',
    bio: 'Kapten tim basket yang selalu punya stok lelucon garing saat suasana kelas tegang sebelum ulangan matematika.',
    quote: 'Keringat di lapangan hari ini adalah senyuman di masa depan.',
    hobbies: ['Olahraga', 'Gaming'],
    extracurriculars: ['Basket'],
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    bentoSpan: 'tall', // Card tinggi 1x2
    dreamCareer: 'Sports Medicine Specialist',
    socialHandle: '@bima_aryap',
    favoriteMemory: 'Mencetak buzzer beater di DBL semifinal'
  },
  {
    id: 3,
    name: 'Citra Dewi Lestari',
    nickname: 'Citra',
    class: 'XII IPS 2',
    bio: 'Penyanyi bersuara emas yang selalu memenangkan piala vokal solo. Buku sketsanya penuh gambar karikatur teman sekelas.',
    quote: 'Setiap nada punya cerita, dan angkatan ini adalah simfoni terindah.',
    hobbies: ['Musik', 'Menggambar'],
    extracurriculars: ['Paduan Suara'],
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    bentoSpan: 'normal',
    dreamCareer: 'Sound Engineer & Music Producer',
    socialHandle: '@citradewi_vocal',
    favoriteMemory: 'Konser paduan suara perpisahan di aula provinsi'
  },
  {
    id: 4,
    name: 'Dafi Muhammad Farhan',
    nickname: 'Farhan',
    class: 'XII MIPA 2',
    bio: 'Ahli strategi futsal dan programmer cilik yang sering bantu setup sound system upacara bendera.',
    quote: 'Bug di kode bisa di-debug, tapi kenangan SMA nggak bisa di-undo.',
    hobbies: ['Gaming', 'Olahraga'],
    extracurriculars: ['Futsal'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bentoSpan: 'wide', // Card lebar 2x1
    dreamCareer: 'Full-Stack Developer',
    socialHandle: '@farhan.df',
    favoriteMemory: 'Juara 1 Turnamen Futsal Antar Sekolah'
  },
  {
    id: 5,
    name: 'Elisa Rahmawati',
    nickname: 'Elisa',
    class: 'XII MIPA 3',
    bio: 'Anggota PMR paling cekatan. Selalu membawa kotak obat darurat dan permen jahe di saku seragamnya.',
    quote: 'Memberi arti pada hidup adalah dengan meringankan langkah orang lain.',
    hobbies: ['Membaca', 'Memasak'],
    extracurriculars: ['PMR'],
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    bentoSpan: 'normal',
    dreamCareer: 'Dokter Bedah Anak',
    socialHandle: '@elisarahma_',
    favoriteMemory: 'Jaga tenda posko PMR saat kemah akbar hujan lebat'
  },
  {
    id: 6,
    name: 'Fauzan Rizky Kurniawan',
    nickname: 'Ojan',
    class: 'XII IPS 1',
    bio: 'Ketua seksi dokumentasi yang fotonya jarang ada di kamera sendiri karena selalu berada di balik lensa.',
    quote: 'Kamera mengabadikan cahaya, hati kita yang menyimpan hangatnya.',
    hobbies: ['Fotografi', 'Musik'],
    extracurriculars: ['OSIS'],
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    bentoSpan: 'tall',
    dreamCareer: 'Cinematographer & Film Director',
    socialHandle: '@fauzankrn',
    favoriteMemory: 'Bikin aftermovie porseni sekolah yang tembus 100k views'
  },
  {
    id: 7,
    name: 'Gita Kirana Salsabila',
    nickname: 'Gita',
    class: 'XII IPS 1',
    bio: 'Juara debat bahasa Inggris nasional. Jago bikin kue brownies kukus yang selalu ludes di bazaar sekolah.',
    quote: 'Words have power, but true kindness speaks without words.',
    hobbies: ['Memasak', 'Membaca'],
    extracurriculars: ['English Club'],
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    bentoSpan: 'wide',
    dreamCareer: 'Diplomat Internasional',
    socialHandle: '@gitakirana_',
    favoriteMemory: 'Model United Nations pertama di Bali'
  },
  {
    id: 8,
    name: 'Hadi Prasetyo Utomo',
    nickname: 'Hadi',
    class: 'XII MIPA 2',
    bio: 'Pradana Pramuka yang paling paham navigasi darat dan sandi morse. Pengingat sholat berjamaah di kelas.',
    quote: 'Disiplin, berani, dan setia. Sampai jumpa di puncak kejayaan masing-masing.',
    hobbies: ['Olahraga', 'Membaca'],
    extracurriculars: ['Pramuka'],
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    bentoSpan: 'normal',
    dreamCareer: 'Perwira Angkatan Laut',
    socialHandle: '@hadiprasetyo',
    favoriteMemory: 'Api unggun malam pelantikan bantara di lereng gunung'
  },
  {
    id: 9,
    name: 'Indah Permata Sari',
    nickname: 'Indah',
    class: 'XII MIPA 3',
    bio: 'Paling pendiam di kelas, tapi karya ilustrasinya telah memenangkan kompetisi digital art internasional.',
    quote: 'Warna di atas kanvas akan pudar, tapi persahabatan kita abadi.',
    hobbies: ['Menggambar', 'Gaming'],
    extracurriculars: ['Paduan Suara'],
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    bentoSpan: 'normal',
    dreamCareer: 'Concept Artist di Industri Game',
    socialHandle: '@indah_illustrations',
    favoriteMemory: 'Melukis mural perpisahan di koridor lantai dua'
  },
  {
    id: 10,
    name: 'Julian Satria Wibowo',
    nickname: 'Satria',
    class: 'XII IPS 2',
    bio: 'Gitaris band sekolah yang hobi bikin podcast tongkrongan. Selalu punya kopi sachet cadangan di loker.',
    quote: 'Nada yang salah di panggung bisa jadi solo jazz, kesalahan hidup bisa jadi pengalaman berharga.',
    hobbies: ['Musik', 'Gaming'],
    extracurriculars: ['Basket'],
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    bentoSpan: 'wide',
    dreamCareer: 'Broadcaster & Creative Producer',
    socialHandle: '@juliansatria_',
    favoriteMemory: 'Tampil di pensi Dies Natalis ditonton 2000 orang'
  },
  {
    id: 11,
    name: 'Kezia Aurelia Tan',
    nickname: 'Kezia',
    class: 'XII MIPA 1',
    bio: 'Wakil ketua OSIS yang super enerjik. Spesialis negosiasi sponsor pensi dan peraih medali olimpiade biologi.',
    quote: 'Mimpi besar tidak dibangun di zona nyaman.',
    hobbies: ['Fotografi', 'Memasak'],
    extracurriculars: ['OSIS', 'English Club'],
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    bentoSpan: 'featured',
    dreamCareer: 'Biomedical Researcher',
    socialHandle: '@kezia.aurelia',
    favoriteMemory: 'Menghitung sisa kas pensi dengan mata mengantuk tapi bahagia'
  },
  {
    id: 12,
    name: 'Lutfi Haidar Azmi',
    nickname: 'Lutfi',
    class: 'XII IPS 1',
    bio: 'Pramuka teladan dan striker andalan tim futsal. Selalu membawa keceriaan dan siap menolong siapa saja.',
    quote: 'Jadilah seperti pohon kelapa, berguna dari akar hingga pucuk daunnya.',
    hobbies: ['Olahraga', 'Menggambar'],
    extracurriculars: ['Pramuka', 'Futsal'],
    photo: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=crop&w=800&q=80',
    bentoSpan: 'tall',
    dreamCareer: 'Arsitek Lanskap',
    socialHandle: '@lutfi_haidar',
    favoriteMemory: 'Tidur bersama di tenda basah saat jambore daerah'
  }
];

export const INITIAL_MESSAGES: YearbookMessage[] = [
  {
    id: 'msg-1',
    studentId: 1, // Untuk Alya Putri
    sender: 'Bima Arya Pratama',
    senderRole: 'Teman Sekelas',
    message: 'Alya, terima kasih udah selalu jadi ketua kelas paling sabar! Kalau nggak ada kamu yang ingetin PR fisika, kita sekelas pasti udah sering dihukum lari keliling lapangan. Sukses terus buat impianmu!',
    signature: createDummySignature('Bima Arya'),
    createdAt: '2026-05-18T10:15:00Z'
  },
  {
    id: 'msg-2',
    studentId: 2, // Untuk Bima Arya
    sender: 'Citra Dewi Lestari',
    senderRole: 'Sahabat Karib',
    message: 'Bim, makasih udah sering nemenin latihan akustik dan sorak-sorak paling kenceng tiap kali aku tampil di panggung. Nanti kalau kamu jadi atlet sukses, jangan lupa tanda tanganin jerseymu buat aku ya!',
    signature: createDummySignature('Citra Dewi'),
    createdAt: '2026-05-18T11:30:00Z'
  },
  {
    id: 'msg-3',
    studentId: null, // Pesan umum untuk seluruh angkatan
    sender: 'Pak Joko Santoso, M.Pd.',
    senderRole: 'Wali Kelas XII MIPA 1',
    message: 'Untuk anak-anakku tersayang satu angkatan: Kalian adalah angkatan yang tangguh. Lewati masa depan dengan kepala tegak, jaga integritas, dan jangan pernah berhenti belajar. Pintu sekolah ini selalu terbuka untuk kepulangan kalian.',
    signature: createDummySignature('Joko Santoso'),
    createdAt: '2026-05-18T13:00:00Z'
  },
  {
    id: 'msg-4',
    studentId: 4, // Untuk Farhan
    sender: 'Julian Satria',
    senderRole: 'Partner Sound & Game',
    message: 'Han, GGWP buat 3 tahun ini! Makasih udah sering carry ranked pas malam minggu dan benerin mixer pensi yang mendadak mati. Sampai ketemu di kampus impian kita berdua!',
    signature: createDummySignature('Satria Wibowo'),
    createdAt: '2026-05-18T14:20:00Z'
  },
  {
    id: 'msg-5',
    studentId: 3, // Untuk Citra Dewi
    sender: 'Alya Putri Maharani',
    senderRole: 'Teman Sebangku',
    message: 'Cit, 3 tahun duduk bareng kamu rasanya cepat banget. Suaramu pas nyanyi di pojok kelas waktu guru kosong bakal selalu aku kangenin. Kejar impian bermusikmu, aku bakal jadi penonton baris terdepan!',
    signature: createDummySignature('Alya Putri'),
    createdAt: '2026-05-18T15:45:00Z'
  },
  {
    id: 'msg-6',
    studentId: 6, // Untuk Fauzan Rizky
    sender: 'Gita Kirana',
    senderRole: 'Partner OSIS',
    message: 'Zan, makasih ribuan foto keren selama 3 tahun ini. Kamu selalu bikin kita semua terlihat luar biasa di feed sekolah. Semoga impianmu jadi sutradara film ternama segera tercapai!',
    signature: createDummySignature('Gita Kirana'),
    createdAt: '2026-05-19T08:10:00Z'
  },
  {
    id: 'msg-7',
    studentId: null, // Pesan umum untuk seluruh angkatan
    sender: 'Kezia Aurelia Tan',
    senderRole: 'Wakil Ketua OSIS',
    message: 'Terima kasih untuk semua tawa di kantin belakang, tangisan di ruang ujian, dan pelukan saat pensi selesai. Kita mungkin berpisah jalan, tapi memori putih abu-abu ini selamanya tersimpan!',
    signature: createDummySignature('Kezia Aurelia'),
    createdAt: '2026-05-19T09:40:00Z'
  },
  {
    id: 'msg-8',
    studentId: 8, // Untuk Hadi
    sender: 'Lutfi Haidar Azmi',
    senderRole: 'Sahabat Seperjuangan',
    message: 'Kak Hadi! Makasih udah bimbing saya di Pramuka dari kelas X. Kamu teladan sejati, disiplin tapi selalu humoris. Sampai jumpa di korps perwira nanti!',
    signature: createDummySignature('Lutfi Haidar'),
    createdAt: '2026-05-19T10:05:00Z'
  }
];

export const ALL_HOBBIES = [
  'Fotografi',
  'Musik',
  'Membaca',
  'Gaming',
  'Olahraga',
  'Menggambar',
  'Memasak'
];

export const ALL_EXTRACURRICULARS = [
  'OSIS',
  'Pramuka',
  'Basket',
  'Futsal',
  'Paduan Suara',
  'PMR',
  'English Club'
];
