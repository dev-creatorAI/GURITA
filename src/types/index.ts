export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  funFact: string;
}

export interface ShowcaseProject {
  id: string;
  title: string;
  subject: string;
  grade: string;
  description: string;
  gameType: string;
  aiToolsUsed: string[];
  previewMetrics: {
    questionsCount: number;
    estimatedMinutes: number;
    funScore: string;
  };
}

export interface TeacherReflection {
  id: string;
  teacherName: string;
  schoolName: string;
  subjectTaught: string;
  biggestInsight: string;
  weeklyCommitment: string;
  timestamp: string;
  avatarSeed: number;
}

// ==========================================
// GAME STUDIO (GEMINI CANVAS PROMPT GENERATOR)
// ==========================================
export type GameDifficulty = 'Mudah' | 'Sedang' | 'Sulit';
export type GameMode = 'Individu' | 'Tim';

export type GameColorTheme =
  | 'Biru dan cyan futuristik'
  | 'Ungu neon'
  | 'Hijau digital'
  | 'Oranye kompetitif'
  | 'Merah dan hitam'
  | 'Pastel'
  | 'Warna kustom';

export type GameDesignTheme =
  | 'Cyber Arena'
  | 'Kerajaan Fantasi'
  | 'Game Show'
  | 'Esports'
  | 'Pixel Art'
  | 'Kartun 3D'
  | 'Petualangan'
  | 'Misteri'
  | 'Minimalis'
  | 'Science Fiction'
  | 'Desain kustom';

export type GameTypeOption =
  | 'Kuis Interaktif'
  | 'Spin the Wheel'
  | 'Ular Tangga'
  | 'Drag and Drop'
  | 'Memory Game'
  | 'Who Wants to Be a Millionaire'
  | 'Clash of Champions'
  | 'RPG Edukasi'
  | 'Adventure Game'
  | 'Escape Room'
  | 'Trivia Battle'
  | 'Board Game'
  | 'Puzzle'
  | 'Tebak Gambar'
  | 'Susun Kata'
  | 'Word Search'
  | 'Matching Game'
  | 'Tower Defense Edukasi'
  | 'Simulation Game'
  | 'Game Berbasis Cerita'
  | 'Platformer Edukasi'
  | 'Pilihan jenis lainnya';

export interface GameStudioConfig {
  gameName: string;
  subject: string;
  gradeLevel: string;
  topic: string;
  learningGoal: string;
  questionCount: number;
  difficulty: GameDifficulty;
  gameType: GameTypeOption;
  customGameTypeDescription?: string;
  mode: GameMode;
  // Individu specific
  individualPlayerCount?: number;
  individualScoreSystem?: string;
  individualRecapDetails?: string;
  // Tim specific
  teamCount?: number;
  teamNames?: string;
  membersPerTeam?: number;
  turnMechanism?: string;
  teamScoreboardFormat?: string;
  winnerDetermination?: string;
  // Visual & Aesthetic choices
  colorTheme: GameColorTheme;
  customColorHex?: string;
  designTheme: GameDesignTheme;
  customDesignDescription?: string;
  characterStyle: string;
  backgroundStyle: string;
  buttonShape: string;
  visualEffects: string;
  animationStyle: string;
  soundEffects: string;
  durationMinutes: number;
  scoreSystem: string;
  winLoseRule: string;
  language: string;
  // Feature toggles
  enableTimer: boolean;
  enableScoreboard: boolean;
  enableLivesOrEnergy: boolean;
  enableSoundEffects: boolean;
  enableAnimations: boolean;
  enableInstantFeedback: boolean;
  enableRestartButton: boolean;
  enableHints: boolean;
  enableResultsRecap: boolean;
  // Type-specific configs
  memoryPairCount?: number;
  wheelSegments?: string;
  boardGridSize?: string;
  dragDropItems?: string;
}

// ==========================================
// PROMPT LAB (MODUL AJAR KURIKULUM MENDALAM)
// ==========================================
export type PedagogicalPractice =
  | 'Problem Based Learning (PBL)'
  | 'Project Based Learning (PjBL)'
  | 'Discovery Learning'
  | 'Inquiry Based Learning'
  | 'Cooperative Learning'
  | 'Contextual Teaching and Learning (CTL)'
  | 'Pembelajaran Berdiferensiasi'
  | 'Direct Instruction (Pembelajaran Langsung)'
  | 'Game Based Learning'
  | 'Design Thinking'
  | 'Pembelajaran Berbasis Studi Kasus'
  | 'Lainnya';

export interface ModulAjarFormInput {
  schoolName: string;
  principalName: string;
  teacherName: string;
  subject: string;
  materi: string;
  topic: string;
  learningOutcomeCP: string;
  element: string;
  gradeLevel: string;
  semester: string;
  timeAllocation: string;
  pedagogicalPractice: PedagogicalPractice;
  customPedagogicalPractice?: string;
  // Optional inputs
  studentCharacteristics?: string;
  priorKnowledge?: string;
  facilitiesAndTools?: string;
  specialLearningNeeds?: string;
  learningApproach?: string;
  teacherNotes?: string;
}

export interface LearningStepRow {
  activity: string; // Detail langkah
  timeAllocation: string; // e.g. "15 Menit"
  principle: 'Berkesadaran' | 'Bermakna' | 'Menggembirakan' | string;
  learningExperience: 'Memahami' | 'Mengaplikasi' | 'Merefleksi';
  learningResources: string;
}

export interface ModulAjarDocument {
  // BAGIAN I. INFORMASI UMUM
  informasiUmum: {
    namaSekolah: string;
    mataPelajaran: string;
    materi: string;
    topikPembelajaran: string;
    faseAtauKelas: string;
    semester: string;
    alokasiWaktu: string;
    namaPenyusun: string;
    saranaDanPrasarana?: string;
    sasaranPesertaDidik?: string;
  };
  // BAGIAN II. IDENTIFIKASI DAN DESAIN PEMBELAJARAN
  identifikasiDanDesain: {
    identifikasiPesertaDidik: {
      karakteristikPesertaDidik?: string;
      pengetahuanAwal: string;
      minatDanMotivasi: string;
      minatDanKebutuhanBelajar?: string;
      kesiapanBelajar: string;
      kebutuhanBelajar: string;
      karakteristikMateri?: string;
      potensiMiskonsepsi: string;
      dukunganDanDiferensiasi: string;
      catatanAsumsi: string;
    };
    identifikasiMataPelajaran: {
      mataPelajaran: string;
      materi: string;
      topik: string;
      elemen: string;
      faseAtauKelas: string;
      semester: string;
      alokasiWaktu: string;
      relevansiKehidupanNyata: string;
    };
    dimensiProfilLulusan: Array<{
      dimensi: string;
      alasanRelevansi: string;
      perilakuTeramati: string;
    }>;
    capaianPembelajaran: string;
    lintasDisiplinIlmu: string;
    tujuanPembelajaran: {
      memahami: string[];
      mengaplikasi: string[];
      merefleksi: string[];
    };
    praktikPedagogis: {
      namaPendekatan: string;
      alasanPemilihan: string;
      karakteristik: string;
      peranGuru: string;
      peranPesertaDidik: string;
      sintaksTahapan: Array<{ tahapan: string; deskripsi: string }>;
      hubunganDenganTujuan: string;
    };
    mitraPembelajaran: string;
    kemitraanPembelajaran?: string;
    lingkunganPembelajaran: {
      fisik: string;
      sosial: string;
      digital: string;
    };
    pemanfaatanDigital: string;
  };
  // BAGIAN III. LANGKAH-LANGKAH PEMBELAJARAN (TABEL 5 KOLOM)
  langkahPembelajaran: {
    kegiatanAwal: LearningStepRow[];
    kegiatanInti: LearningStepRow[];
    kegiatanPenutup: LearningStepRow[];
    totalWaktuMenit: number;
    asumsiWaktuText: string;
  };
  // BAGIAN IV. ASESMEN PEMBELAJARAN
  asesmen: {
    asesmenAwal: {
      tujuan: string;
      teknik: string;
      contohSoalTugas: string;
      penyesuaianPembelajaran: string;
    };
    asesmenFormatif: {
      teknik: string;
      waktuPelaksanaan: string;
      indikator: string;
      instrumen: string;
      kriteriaKeberhasilan: string;
      bentukUmpanBalik: string;
    };
    asesmenSumatif: {
      bentuk: string;
      deskripsiTugasSoal: string;
      kunciAtauKriteria: string;
    };
    rubrikPenilaian: Array<{
      aspek: string;
      indikator: string;
      skala1: string; // Perlu Bimbingan (1)
      skala2: string; // Cukup (2)
      skala3: string; // Baik (3)
      skala4: string; // Sangat Baik (4)
    }>;
    pengolahanDanTindakLanjut: {
      remedial: string;
      pengayaan: string;
      umpanBalik: string;
      refleksiGuru: string;
    };
  };
  // BAGIAN V. ALAT DAN SUMBER BELAJAR
  alatDanSumberBelajar: {
    alatDanBahan: string[];
    mediaPembelajaran: string[];
    bukuReferensi: string[];
    sumberDigital: string[];
    perangkatDibutuhkan: string[];
    alternatifLuring: string;
    catatanVerifikasi: string;
  };
  // BAGIAN VI. REFLEKSI
  refleksi: {
    refleksiPesertaDidik: string[];
    refleksiGuru: string[];
  };
  // BAGIAN VII. PENGESAHAN
  pengesahan: {
    kotaDanTanggal: string;
    namaKepalaSekolah: string;
    nipKepalaSekolah?: string;
    namaPenyusun: string;
    nipPenyusun?: string;
  };
  // DUKUNGAN SUBJECT-AWARE OUTPUT (MATEMATIKA, RUMUS, DATA, SIMBOL, DAN KODE)
  subjectAwareAnalysis?: any;
}
