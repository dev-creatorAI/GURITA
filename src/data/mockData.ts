import { QuizQuestion, ShowcaseProject, TeacherReflection } from '../types';

export const INITIAL_SAMPLE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Organel sel manakah yang sering dijuluki sebagai "Pembangkit Listrik" sel karena menghasilkan energi ATP?',
    options: ['Nukleus (Inti Sel)', 'Mitokondria', 'Ribosom', 'Badan Golgi'],
    correctIndex: 1,
    explanation: 'Mitokondria bertanggung jawab memproduksi ATP melalui respirasi seluler, memasok energi bagi aktivitas seluruh sel.',
    funFact: 'Mitokondria memiliki DNA sendiri yang diwariskan hanya dari garis ibu!'
  },
  {
    id: 'q2',
    question: 'Jika seekor bunglon beradaptasi dengan mengubah warna kulitnya, adaptasi jenis apakah ini?',
    options: ['Adaptasi Morfologi', 'Adaptasi Fisiologi', 'Adaptasi Tingkah Laku', 'Adaptasi Buatan'],
    correctIndex: 1,
    explanation: 'Kemampuan sel kromatofora kulit bunglon mengatur pigmen cahaya adalah proses biokimiawi tubuh (fisiologi).',
    funFact: 'Bunglon sering mengubah warna bukan cuma untuk kamuflase, melainkan mengekspresikan suasana hati!'
  },
  {
    id: 'q3',
    question: 'Fenomena fotosintesis pada tumbuhan hijau menghasilkan zat utama apa yang kita hirup setiap hari?',
    options: ['Karbon Monoksida', 'Gas Nitrogen', 'Gas Oksigen (O2)', 'Gas Metana'],
    correctIndex: 2,
    explanation: 'Reaksi terang fotosintesis memecah molekul air (H2O) dan melepaskan oksigen murni ke atmosfer.',
    funFact: 'Hutan hujan dan fitoplankton di samudra menyumbang lebih dari 70% oksigen di Bumi!'
  }
];

export const MATHEMATICS_SAMPLE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'mq1',
    question: 'Tentukan nilai x yang memenuhi persamaan linear: 4x + 12 = 36!',
    options: ['x = 4', 'x = 5', 'x = 6', 'x = 8'],
    correctIndex: 2,
    explanation: 'Kurangkan kedua ruas dengan 12: 4x = 36 - 12 = 24. Bagi kedua ruas dengan 4: x = 24 / 4 = 6. Pembuktian: 4(6) + 12 = 36.',
    funFact: 'Persamaan linear satu variabel selalu memiliki tepat satu solusi tunggal di bilangan real!'
  },
  {
    id: 'mq2',
    question: 'Sebuah wadah berbentuk balok memiliki ukuran p = 10 cm, l = 6 cm, dan t = 4 cm. Berapakah volume wadah tersebut?',
    options: ['200 cm³', '240 cm³', '280 cm³', '320 cm³'],
    correctIndex: 1,
    explanation: 'Rumus volume balok: V = p × l × t. Substitusi angka: V = 10 cm × 6 cm × 4 cm = 240 cm³.',
    funFact: 'Jika seluruh rusuk balok diperbesar 2 kali lipat, volumenya akan membesar 2³ = 8 kali lipat!'
  }
];

export const PHYSICS_SAMPLE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'pq1',
    question: 'Sebuah kendaraan menempuh jarak 150 km dalam waktu 2,5 jam. Berapakah kecepatan rata-ratanya dalam Satuan Internasional (m/s)?',
    options: ['12,50 m/s', '16,67 m/s', '20,00 m/s', '25,00 m/s'],
    correctIndex: 1,
    explanation: 'Kecepatan v = s / t = 150 km / 2,5 jam = 60 km/jam. Konversi ke SI: 60 ÷ 3,6 = 16,67 m/s.',
    funFact: 'Angka 3,6 berasal dari rasio konversi 1.000 meter dibagi 3.600 detik (sekon)!'
  }
];

export const CHEMISTRY_SAMPLE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'cq1',
    question: 'Berapakah jumlah mol zat yang terkandung di dalam 36 gram air (H₂O) jika diketahui Ar H = 1 dan Ar O = 16?',
    options: ['1,0 mol', '2,0 mol', '3,0 mol', '4,0 mol'],
    correctIndex: 1,
    explanation: 'Massa molekul relatif Mr H₂O = (2 × 1) + 16 = 18 g/mol. Jumlah mol n = m / Mr = 36 / 18 = 2,0 mol.',
    funFact: '2 mol air mengandung 2 × 6,022 × 10²³ = 1,2044 × 10²⁴ molekul air!'
  }
];

export const DKV_SAMPLE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'dq1',
    question: 'Dalam anatomi tipografi, garis maya horizontal tempat bertumpunya bagian bawah sebagian besar badan huruf kecil disebut...',
    options: ['Baseline', 'Cap Height', 'X-Height', 'Mean Line'],
    correctIndex: 0,
    explanation: 'Baseline adalah garis dasar tumpuan huruf. Bagian huruf yang memanjang ke bawah garis ini (seperti huruf p, q, y) disebut descender.',
    funFact: 'Jarak antara baseline ke mean line disebut x-height, patokan visual tinggi huruf kecil seperti x, u, dan o!'
  }
];

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'showcase-1',
    title: 'Petualangan Ekosistem Terumbu Karang',
    subject: 'IPA / Biologi Laut',
    grade: 'Fase D (SMP Kelas 7)',
    description: 'Game eksplorasi bawah laut di mana murid bertindak sebagai peneliti laut muda yang menyelamatkan karang dari pemutihan (bleaching).',
    gameType: 'Kuis Petualangan Berantai',
    aiToolsUsed: ['Gemini 2.5 Flash', 'Image Prompting', 'Diferensiasi Kognitif'],
    previewMetrics: {
      questionsCount: 5,
      estimatedMinutes: 8,
      funScore: '98% Engagement'
    }
  },
  {
    id: 'showcase-2',
    title: 'Lab Aljabar Antariksa: Misi Orbit Mars',
    subject: 'Matematika Terapan',
    grade: 'Fase E (SMA Kelas 10)',
    description: 'Memecahkan sistem persamaan linear untuk menghitung lintasan roket dan konsumsi bahan bakar pendorong orbit.',
    gameType: 'Kuis Simulasi Kalkulasi',
    aiToolsUsed: ['Prompt Generator Matematika', 'Scaffolding Bertingkat'],
    previewMetrics: {
      questionsCount: 4,
      estimatedMinutes: 10,
      funScore: '95% Pemahaman Konsep'
    }
  },
  {
    id: 'showcase-3',
    title: 'Detektif Sejarah: Menelusuri Jejak Rengasdengklok',
    subject: 'IPS / Sejarah Indonesia',
    grade: 'Fase C & D (SD Kelas 6 - SMP 8)',
    description: 'Game naratif pilihan ganda interaktif untuk memahami dinamika pemuda dan golongan tua menjelang Proklamasi 17 Agustus 1945.',
    gameType: 'Roleplay Narrative Quiz',
    aiToolsUsed: ['Skenario Roleplay AI', 'Historical Fact Checker'],
    previewMetrics: {
      questionsCount: 6,
      estimatedMinutes: 12,
      funScore: '99% Empati Sejarah'
    }
  },
  {
    id: 'showcase-4',
    title: 'Story Lab: Petualangan Ejaan & Pantun Ceria',
    subject: 'Bahasa Indonesia',
    grade: 'Fase B (SD Kelas 3-4)',
    description: 'Menebak rima pantun jenaka dan menyusun kalimat majemuk untuk membebaskan Si Gurita dari pulau teka-teki kata.',
    gameType: 'Kuis Teka-Teki Kata',
    aiToolsUsed: ['Rhyme Generator AI', 'Visual Word Cards'],
    previewMetrics: {
      questionsCount: 5,
      estimatedMinutes: 7,
      funScore: '97% Keceriaan Kelas'
    }
  }
];

export const INITIAL_REFLECTIONS: TeacherReflection[] = [
  {
    id: 'ref-1',
    teacherName: 'Ibu Ratna Suminar, M.Pd.',
    schoolName: 'SMP Negeri 3 Surabaya',
    subjectTaught: 'IPA Terpadu',
    biggestInsight: 'AI ternyata bukan pengganti guru, melainkan kanvas percepatan. Sebelumnya saya butuh 3 jam untuk membuat game kuis berjenjang, sekarang dalam 30 menit sudah jadi!',
    weeklyCommitment: 'Mengimplementasikan 1 game kuis interaktif ekosistem di kelas VII-A pada hari Kamis ini.',
    timestamp: 'Kemarin, 14:20 WIB',
    avatarSeed: 1
  },
  {
    id: 'ref-2',
    teacherName: 'Bapak Hendra Wijaya, S.Pd.',
    schoolName: 'SMA Negeri 1 Yogyakarta',
    subjectTaught: 'Matematika & Informatika',
    biggestInsight: 'Siswa kami sangat menyukai cerita di balik soal. Dengan formula prompt Gurita, soal aljabar bisa dikemas menjadi misi roket Mars yang seru.',
    weeklyCommitment: 'Melatih 4 rekan guru satu MGMP untuk membuat game kuis adaptif berbasis AI.',
    timestamp: '2 hari lalu',
    avatarSeed: 2
  },
  {
    id: 'ref-3',
    teacherName: 'Ibu Maria Kristanti, S.Pd.',
    schoolName: 'SD Santa Angela Bandung',
    subjectTaught: 'Guru Kelas 4',
    biggestInsight: 'Filosofi Gurita sangat mengena. Kita tidak perlu cemas tertinggal teknologi jika kita merangkulnya dengan semangat riang gembira.',
    weeklyCommitment: 'Menggunakan game kuis tebak kata ceria untuk asesmen diagnostik di awal tema baru.',
    timestamp: '3 hari lalu',
    avatarSeed: 3
  }
];
