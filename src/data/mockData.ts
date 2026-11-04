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
