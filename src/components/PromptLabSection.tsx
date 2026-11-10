import React, { useState } from 'react';
import { ModulAjarFormInput, ModulAjarDocument, PedagogicalPractice } from '../types';
import { generateCompleteModulAjar } from '../utils/modulAjarGenerator';
import { exportModulToWord } from '../utils/modulAjarExporter';
import { buildPromptFromModulAjar } from '../utils/modulAjarPromptBuilder';
import { SubjectAwareAnalysis } from '../utils/subjectClassifier';
import { MathRenderer, MixedMathText } from './MathRenderer';
import {
  FileText,
  Sparkles,
  Download,
  Copy,
  Check,
  RotateCcw,
  Edit3,
  Layers,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Clock,
  UserCheck,
  List,
  FileCheck,
  Calculator,
  Table as TableIcon,
  Code,
  Sigma,
  Zap,
  Info,
  CheckSquare,
  ArrowRight,
  Gamepad2,
  Loader2,
  X,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLearningData } from '../context/LearningDataContext';
import { buildStructuredLearningData } from '../types/sharedLearningData';

export const PromptLabSection: React.FC = () => {
  // Input parameters state
  const [formInput, setFormInput] = useState<ModulAjarFormInput>({
    schoolName: 'SMP Negeri 1 Surabaya',
    principalName: 'Drs. H. Mulyadi, M.Pd.',
    teacherName: 'Ahmad Fauzi, S.Pd., M.Mat.',
    subject: 'Matematika',
    materi: 'Aljabar dan Persamaan Linear',
    topic: 'Persamaan Linear Satu Variabel (SPLSV)',
    learningOutcomeCP:
      'Peserta didik dapat memahami relasi dan fungsi, serta menyelesaikan persamaan dan pertidaksamaan linear satu variabel dengan berbagai strategi aljabar serta menggunakannya untuk memodelkan persoalan kontekstual.',
    element: 'Aljabar & Penalaran Simbolik',
    gradeLevel: 'Fase D (SMP Kelas 7)',
    semester: '1 (Ganjil)',
    timeAllocation: '2 JP (80 Menit)',
    pedagogicalPractice: 'Problem Based Learning (PBL)',
    customPedagogicalPractice: '',
    studentCharacteristics:
      'Peserta didik mulai beralih dari operasi aritmatika konkret ke penalaran simbolik aljabar dan antusias memecahkan teka-teki logika.',
    priorKnowledge:
      'Memahami operasi hitung penjumlahan, pengurangan, perkalian, dan pembagian bilangan bulat.',
    facilitiesAndTools:
      'Papan tulis berpetak, timbangan peraga aljabar (algebra balance), lembar kerja numerik.',
    specialLearningNeeds:
      'Tersedia peraga konkret timbangan untuk memvisualisasikan keseimbangan kedua ruas.',
    learningApproach: 'Student-Centered & Penyelidikan Terbimbing',
    teacherNotes:
      'Tekankan konsep keseimbangan ruas: kedua ruas diperlakukan sama secara adil.'
  });

  const [generatedDoc, setGeneratedDoc] = useState<ModulAjarDocument | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [activeDocSection, setActiveDocSection] = useState<string>('sec-subject-aware');
  const [copied, setCopied] = useState<boolean>(false);
  const [codeCopied, setCodeCopied] = useState<boolean>(false);
  const [isExportingWord, setIsExportingWord] = useState<boolean>(false);
  const [transferStatus, setTransferStatus] = useState<string>('');

  // State Modal Prompt Modul Ajar
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [generatedPromptText, setGeneratedPromptText] = useState<string>('');
  const [promptCopied, setPromptCopied] = useState<boolean>(false);

  const { transferToGameStudio, transferToMediaGenerator } = useLearningData();

  const handleOpenPromptModal = () => {
    if (!generatedDoc) return;
    const promptStr = buildPromptFromModulAjar(generatedDoc);
    setGeneratedPromptText(promptStr);
    setIsPromptModalOpen(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPromptText);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2500);
  };

  const handleCreateGameFromModul = () => {
    if (!generatedDoc) return;
    const structuredData = buildStructuredLearningData(formInput, generatedDoc);
    transferToGameStudio(structuredData);
    setTransferStatus('Data modul ajar berhasil diteruskan ke Game Studio!');
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setTransferStatus(''), 3500);
  };

  const handleCreateMediaFromModul = () => {
    if (!generatedDoc) return;
    const structuredData = buildStructuredLearningData(formInput, generatedDoc);
    transferToMediaGenerator(structuredData);
    setTransferStatus('Data modul ajar berhasil diteruskan ke Generator Media!');
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setTransferStatus(''), 3500);
  };

  // 8 Mandatory Testing Scenarios Presets
  const handleScenarioPreset = (scenario: string) => {
    let preset: ModulAjarFormInput;

    switch (scenario) {
      case 'math-splsv':
        preset = {
          schoolName: 'SMP Negeri 1 Surabaya',
          principalName: 'Drs. H. Mulyadi, M.Pd.',
          teacherName: 'Ahmad Fauzi, S.Pd., M.Mat.',
          subject: 'Matematika',
          materi: 'Aljabar dan Persamaan Linear',
          topic: 'Persamaan Linear Satu Variabel (SPLSV)',
          learningOutcomeCP:
            'Peserta didik dapat memahami relasi dan fungsi, serta menyelesaikan persamaan dan pertidaksamaan linear satu variabel dengan berbagai strategi aljabar.',
          element: 'Aljabar & Penalaran Simbolik',
          gradeLevel: 'Fase D (SMP Kelas 7)',
          semester: '1 (Ganjil)',
          timeAllocation: '2 JP (80 Menit)',
          pedagogicalPractice: 'Problem Based Learning (PBL)',
          customPedagogicalPractice: '',
          studentCharacteristics: 'Peserta didik mulai beralih ke penalaran simbolik aljabar.',
          priorKnowledge: 'Memahami operasi hitung bilangan bulat positif dan negatif.',
          facilitiesAndTools: 'Papan tulis berpetak, LKPD terstruktur, timbangan digital / peraga.',
          specialLearningNeeds: 'Scaffolding bertahap penyelesaian isolasi variabel x.',
          learningApproach: 'Penyelidikan Masalah Kontekstual',
          teacherNotes: 'Buktikan bahwa nilai x ruas kiri sama dengan ruas kanan.'
        };
        break;

      case 'math-geometry':
        preset = {
          schoolName: 'SMP Negeri 5 Cendekia',
          principalName: 'Hj. Siti Aminah, M.Pd.',
          teacherName: 'Budi Santoso, S.Pd.',
          subject: 'Matematika',
          materi: 'Geometri dan Pengukuran',
          topic: 'Luas Permukaan dan Volume Bangun Ruang Sisi Datar (Balok & Kubus)',
          learningOutcomeCP:
            'Peserta didik dapat membuat jaring-jaring bangun ruang dan menghitung luas permukaan serta volume bangun ruang sisi datar untuk memecahkan masalah kontekstual.',
          element: 'Geometri & Pengukuran',
          gradeLevel: 'Fase D (SMP Kelas 8)',
          semester: '2 (Genap)',
          timeAllocation: '2 JP (80 Menit)',
          pedagogicalPractice: 'Discovery Learning',
          customPedagogicalPractice: '',
          studentCharacteristics: 'Senang merakit jaring-jaring karton dan manipulasi kubus satuan.',
          priorKnowledge: 'Memahami rumus luas persegi panjang dan persegi.',
          facilitiesAndTools: 'Model balok transparan, kubus satuan kayu, gunting, jaring karton.',
          specialLearningNeeds: 'Peraga taktil kubus satuan untuk visualisasi volume konkret.',
          learningApproach: 'Eksplorasi Spasial Konkret ke Abstrak',
          teacherNotes: 'Siswa menemukan sendiri rumus V = p x l x t melalui penyusunan kubus satuan.'
        };
        break;

      case 'physics-motion':
        preset = {
          schoolName: 'SMP Negeri Prestasi Sains',
          principalName: 'Dr. Hendra Gunawan, M.Si.',
          teacherName: 'Nurul Hidayati, S.Pd. Fis.',
          subject: 'Fisika (IPA Terpadu)',
          materi: 'Kinematika & Gerak Benda',
          topic: 'Kecepatan, Jarak, dan Waktu pada Gerak Lurus Beraturan (GLB)',
          learningOutcomeCP:
            'Peserta didik mampu memahami konsep gerak dan gaya, serta melakukan penyelidikan ilmiah mengenai hubungan matematis jarak, waktu, dan kecepatan dengan satuan internasional (SI).',
          element: 'Pemahaman Sains & Keterampilan Proses',
          gradeLevel: 'Fase D (SMP Kelas 7-8)',
          semester: '1 (Ganjil)',
          timeAllocation: '2 JP (80 Menit)',
          pedagogicalPractice: 'Inquiry Based Learning',
          customPedagogicalPractice: '',
          studentCharacteristics: 'Antusias bereksperimen dengan alat ukur stopwatch dan meteran.',
          priorKnowledge: 'Mengenal besaran panjang (meter) dan waktu (sekon).',
          facilitiesAndTools: 'Trek luncuran mobil mainan, stopwatch digital, pita ukur meteran.',
          specialLearningNeeds: 'Pembagian peran kelompok: pengukur waktu, pelepas mobil, pencatat data.',
          learningApproach: 'Eksperimen Laboratorium & Analisis Data',
          teacherNotes: 'Bimbing siswa mengonversi km/jam ke satuan internasional m/s (faktor bagi 3,6).'
        };
        break;

      case 'chem-mol':
        preset = {
          schoolName: 'SMA Negeri Unggul Sains',
          principalName: 'Drs. Subroto, M.Pd.',
          teacherName: 'Dewi Lestari, S.Pd., M.Si.',
          subject: 'Kimia',
          materi: 'Stoikiometri & Hukum Dasar Kimia',
          topic: 'Konsep Mol dan Perhitungan Massa Molar Zat',
          learningOutcomeCP:
            'Peserta didik mampu menerapkan konsep mol dalam menyelesaikan perhitungan kimia kuantitatif (massa, jumlah partikel, dan volume gas pada keadaan standar STP).',
          element: 'Pemahaman Kimia & Kalkulasi Stoikiometri',
          gradeLevel: 'Fase E / F (SMA Kelas 10-11)',
          semester: '2 (Genap)',
          timeAllocation: '2 JP (80 Menit)',
          pedagogicalPractice: 'Problem Based Learning (PBL)',
          customPedagogicalPractice: '',
          studentCharacteristics: 'Memiliki penalaran logika abstrak yang baik dengan bantuan bagan jembatan mol.',
          priorKnowledge: 'Memahami lambang unsur, massa atom relatif (Ar), dan rumus senyawa kimia.',
          facilitiesAndTools: 'Neraca analitik digital, sampel garam dapur (NaCl) dan air (H2O), poster jembatan mol.',
          specialLearningNeeds: 'Diagram alir jembatan mol bergambar interaktif.',
          learningApproach: 'Kontekstual & Pemecahan Masalah Kuantitatif',
          teacherNotes: 'Gunakan analogi 1 lusin = 12 buah untuk menjelaskan 1 mol = 6,022 x 10^23 partikel.'
        };
        break;

      case 'econ-profit':
        preset = {
          schoolName: 'SMP / SMA Bina Mandiri',
          principalName: 'Dra. Endang Purwanti, M.M.',
          teacherName: 'Rian Pratama, S.E., Gr.',
          subject: 'Ekonomi / IPS Terpadu',
          materi: 'Aritmatika Sosial & Kegiatan Ekonomi',
          topic: 'Perhitungan Persentase Keuntungan dan Kerugian dalam Usaha',
          learningOutcomeCP:
            'Peserta didik mampu menerapkan konsep aritmatika sosial dalam kegiatan ekonomi, menghitung nilai jual, nilai beli, laba, rugi, dan persentasenya.',
          element: 'Literasi Finansial & Aritmatika Sosial',
          gradeLevel: 'Fase D (Kelas 7) / Fase E',
          semester: '2 (Genap)',
          timeAllocation: '2 JP (80 Menit)',
          pedagogicalPractice: 'Project Based Learning (PjBL)',
          customPedagogicalPractice: '',
          studentCharacteristics: 'Tertarik dengan dunia kewirausahaan, jualan online, dan pengelolaan uang saku.',
          priorKnowledge: 'Memahami operasi persentase, pecahan desimal, dan nilai mata uang rupiah.',
          facilitiesAndTools: 'Katalog harga barang grosir, lembar kalkulasi harga pokok penjualan (HPP), kalkulator.',
          specialLearningNeeds: 'Panduan tabel otomatis format Excel/Google Sheets untuk simulasi harga jual.',
          learningApproach: 'Simulasi Market Day & Wirausaha Siswa',
          teacherNotes: 'Tanamkan etika bisnis kejujuran dalam menentukan margin keuntungan yang wajar.'
        };
        break;

      case 'accounting-journal':
        preset = {
          schoolName: 'SMK Negeri 1 Akuntansi & Bisnis',
          principalName: 'Drs. H. Hartono, M.Ak.',
          teacherName: 'Farida Kusumawardani, S.Pd., Ak.',
          subject: 'Akuntansi Keuangan',
          materi: 'Siklus Akuntansi Perusahaan Jasa',
          topic: 'Pencatatan Transaksi ke Jurnal Umum 5 Kolom',
          learningOutcomeCP:
            'Peserta didik mampu menganalisis bukti transaksi keuangan dan mencatatnya ke dalam format Jurnal Umum sesuai prinsip debit-kredit berpasangan.',
          element: 'Pencatatan Keuangan & Pembukuan',
          gradeLevel: 'Fase F (SMK Kelas 11)',
          semester: '1 (Ganjil)',
          timeAllocation: '2 JP (80 Menit)',
          pedagogicalPractice: 'Pembelajaran Berbasis Studi Kasus',
          customPedagogicalPractice: '',
          studentCharacteristics: 'Memiliki ketelitian tinggi dan dituntut rapi dalam pembukuan angka keuangan.',
          priorKnowledge: 'Memahami saldo normal akun (Harta, Utang, Modal, Pendapatan, Beban).',
          facilitiesAndTools: 'Lembar format jurnal umum 5 kolom bergaris, bukti transaksi (nota kontan, kuitansi, faktur).',
          specialLearningNeeds: 'Scaffolding kode akun dan pengingat tabel saldo normal debit/kredit.',
          learningApproach: 'Studi Kasus Transaksi Nyata & Praktik Terbimbing',
          teacherNotes: 'Pastikan total kolom Debit sama persis dengan total kolom Kredit (keseimbangan mutlak).'
        };
        break;

      case 'info-binary':
        preset = {
          schoolName: 'SMP / SMA Cyber Nusantara',
          principalName: 'Bambang Sudarsono, M.Kom.',
          teacherName: 'Ir. Wahyu Kurniawan, S.Kom.',
          subject: 'Informatika',
          materi: 'Sistem Komputer & Representasi Data',
          topic: 'Sistem Bilangan Biner dan Konversi ke Bilangan Desimal',
          learningOutcomeCP:
            'Peserta didik mampu memahami mekanisme penyimpanan data komputer dalam sistem bilangan biner, oktal, dan heksadesimal serta melakukan konversi bilangan.',
          element: 'Sistem Komputer (SK)',
          gradeLevel: 'Fase D (Kelas 8-9) / Fase E',
          semester: '1 (Ganjil)',
          timeAllocation: '2 JP (80 Menit)',
          pedagogicalPractice: 'Problem Based Learning (PBL)',
          customPedagogicalPractice: '',
          studentCharacteristics: 'Sangat menyukai teknologi komputer, penasaran dengan cara kerja sinyal 0 dan 1.',
          priorKnowledge: 'Mengenal bilangan berpangkat dua (2^0, 2^1, 2^2, 2^3, 2^4, dst).',
          facilitiesAndTools: 'Kartu biner unplugged (kartu titik 16, 8, 4, 2, 1), proyektor, papan simulasi bit.',
          specialLearningNeeds: 'Simulasi permainan tebak angka dengan kartu biner agar konsep terasa konkret.',
          learningApproach: 'Unplugged Computer Science & Logika Algoritma',
          teacherNotes: 'Tunjukkan kaitan biner dengan saklar on (1) dan off (0) pada sirkuit transistor komputer.'
        };
        break;

      case 'bahasa-prosedur':
        preset = {
          schoolName: 'SMP Negeri 3 Nusantara',
          principalName: 'Dra. Hj. Sri Wahyuni, M.Pd.',
          teacherName: 'Siti Rahmawati, S.Pd.',
          subject: 'Bahasa Indonesia',
          materi: 'Teks Prosedur',
          topic: 'Struktur, Kaidah Kebahasaan, dan Praktik Menulis Teks Prosedur',
          learningOutcomeCP:
            'Peserta didik mampu memahami, menganalisis struktur dan kaidah kebahasaan, serta menulis dan mempresentasikan teks prosedur secara logis, runtut, dan komunikatif.',
          element: 'Membaca, Memirsa, Menulis, dan Mempresentasikan',
          gradeLevel: 'Fase D (SMP Kelas 7)',
          semester: '1 (Ganjil)',
          timeAllocation: '2 JP (80 Menit)',
          pedagogicalPractice: 'Problem Based Learning (PBL)',
          customPedagogicalPractice: '',
          studentCharacteristics: 'Senang berdiskusi dan mengekspresikan ide melalui tulisan kreatif, membutuhkan panduan struktur wacana.',
          priorKnowledge: 'Mampu membedakan kalimat perintah (imperatif) dan membaca teks instruksi sederhana.',
          facilitiesAndTools: 'Contoh teks prosedur otentik, lembar kerja analisis teks, proyektor, kertas plano.',
          specialLearningNeeds: 'Kartu panduan konjungsi temporal dan contoh templat teks prosedur berjenjang.',
          learningApproach: 'Genre-Based Approach & Diskusi Kolaboratif',
          teacherNotes: 'Fokuskan pada kejelasan langkah, penggunaan verba material dan kata penghubung waktu tanpa melibatkan rumus matematika.'
        };
        break;

      case 'econ-kebutuhan':
        preset = {
          schoolName: 'SMP Negeri 8 Harapan Bangsa',
          principalName: 'Drs. H. Mulyadi, M.M.',
          teacherName: 'Rian Pratama, S.E., Gr.',
          subject: 'Ekonomi (IPS Terpadu)',
          materi: 'Konsep Kebutuhan dan Kelangkaan Manusia',
          topic: 'Skala Prioritas dan Pengambilan Keputusan Konsumsi Rasional',
          learningOutcomeCP:
            'Peserta didik mampu memahami konsep kelangkaan, mengidentifikasi faktor-faktor yang memengaruhi kebutuhan manusia, serta menyusun skala prioritas untuk pengambilan keputusan ekonomi yang bijak.',
          element: 'Pemahaman Konsep Ekonomi & Literasi Keuangan',
          gradeLevel: 'Fase D (SMP Kelas 7) / Fase E',
          semester: '1 (Ganjil)',
          timeAllocation: '2 JP (80 Menit)',
          pedagogicalPractice: 'Pembelajaran Berbasis Studi Kasus',
          customPedagogicalPractice: '',
          studentCharacteristics: 'Kritis menanggapi isu tren konsumsi remaja dan tertarik mengelola uang saku pribadi secara mandiri.',
          priorKnowledge: 'Mengenal konsep uang, jual beli sederhana, dan kebutuhan hidup sehari-hari.',
          facilitiesAndTools: 'Lembar simulasi anggaran keluarga, artikel studi kasus kelangkaan barang, kartu prioritas belanja.',
          specialLearningNeeds: 'Penyusunan matriks 4 kuadran prioritas (mendesak-penting) untuk menyederhanakan keputusan.',
          learningApproach: 'Studi Kasus Kontekstual & Refleksi Literasi Keuangan',
          teacherNotes: 'Tanamkan nilai kesederhanaan, rasionalitas konsumsi, dan kepedulian sosial tanpa memaksakan rumus hitungan matematis.'
        };
        break;

      case 'dkv-typography':
      default:
        preset = {
          schoolName: 'SMK Seni & Desain Komunikasi Visual',
          principalName: 'Drs. Raden Mas Bagus, M.Sn.',
          teacherName: 'Maya Anggraini, S.Ds., M.Sn.',
          subject: 'Desain Komunikasi Visual (DKV)',
          materi: 'Tipografi & Prinsip Desain Grafis',
          topic: 'Anatomi Huruf, Hierarki Tipografi, dan Keterbacaan Pesan Visual',
          learningOutcomeCP:
            'Peserta didik mampu merancang karya desain komunikasi visual dengan menerapkan prinsip tipografi, hierarki visual, kontras warna, dan keterbacaan pesan secara efektif dan estetis.',
          element: 'Prinsip Tipografi & Komposisi Visual',
          gradeLevel: 'Fase E / F (SMK Kelas 10-11)',
          semester: '1 (Ganjil)',
          timeAllocation: '2 JP (80 Menit)',
          pedagogicalPractice: 'Project Based Learning (PjBL)',
          customPedagogicalPractice: '',
          studentCharacteristics: 'Memiliki kepekaan rasa visual tinggi, menyukai eksplorasi seni, dan ekspresif.',
          priorKnowledge: 'Mengenal klasifikasi font dasar (Serif, Sans-Serif, Script, Decorative).',
          facilitiesAndTools: 'Sketchbook gambar, penggaris tipografi, spesimen font cetak, proyektor karya desain.',
          specialLearningNeeds: 'Penyediaan panduan garis grid dan kartu anatomi huruf (baseline, x-height, ascender, descender).',
          learningApproach: 'Eksplorasi Estetika Visual & Kurasi Karya Kreatif',
          teacherNotes: 'Fokuskan pada nilai estetika, legibilitas pesan, dan harmoni visual tanpa memaksakan rumus atau angka numerik yang tidak relevan.'
        };
        break;
    }

    setFormInput(preset);
    setErrorMsg('');

    // Generate immediately with visual feedback
    const doc = generateCompleteModulAjar(preset);
    setGeneratedDoc(doc);
    setActiveDocSection('sec-1');
    confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });
  };

  const handleReset = () => {
    setFormInput({
      schoolName: '',
      principalName: '',
      teacherName: '',
      subject: '',
      materi: '',
      topic: '',
      learningOutcomeCP: '',
      element: '',
      gradeLevel: 'Fase D (Kelas 7-9) · Lintas Jenjang Adaptif',
      semester: '1 (Ganjil)',
      timeAllocation: '2 JP (80 Menit)',
      pedagogicalPractice: 'Problem Based Learning (PBL)',
      customPedagogicalPractice: '',
      studentCharacteristics: '',
      priorKnowledge: '',
      facilitiesAndTools: '',
      specialLearningNeeds: '',
      learningApproach: '',
      teacherNotes: ''
    });
    setGeneratedDoc(null);
    setErrorMsg('');
  };

  const handleGenerateModul = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const requiredFields = [
      { field: formInput.schoolName, label: 'Nama Sekolah' },
      { field: formInput.principalName, label: 'Nama Kepala Sekolah' },
      { field: formInput.teacherName, label: 'Nama Penyusun / Guru' },
      { field: formInput.subject, label: 'Mata Pelajaran' },
      { field: formInput.materi, label: 'Materi' },
      { field: formInput.topic, label: 'Topik Pembelajaran' },
      { field: formInput.learningOutcomeCP, label: 'Capaian Pembelajaran (CP)' },
      { field: formInput.element, label: 'Elemen' },
      { field: formInput.gradeLevel, label: 'Fase / Kelas' },
      { field: formInput.semester, label: 'Semester' },
      { field: formInput.timeAllocation, label: 'Alokasi Waktu' }
    ];

    const missing = requiredFields.filter((f) => !f.field.trim());
    if (missing.length > 0) {
      setErrorMsg(`Parameter wajib belum lengkap: ${missing.map((m) => m.label).join(', ')}.`);
      return;
    }

    setErrorMsg('');
    setIsGenerating(true);

    setTimeout(() => {
      const doc = generateCompleteModulAjar(formInput);
      setGeneratedDoc(doc);
      setIsGenerating(false);
      setActiveDocSection('sec-1');

      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 400);
  };

  const handleCopyText = () => {
    if (!generatedDoc) return;
    const plainText = `RENCANA PEMBELAJARAN MENDALAM (DEEP LEARNING)\n${generatedDoc.informasiUmum.mataPelajaran} - ${generatedDoc.informasiUmum.topikPembelajaran}\n\nBAGIAN I. INFORMASI UMUM\nSekolah: ${generatedDoc.informasiUmum.namaSekolah}\nPenyusun: ${generatedDoc.informasiUmum.namaPenyusun}\nAlokasi: ${generatedDoc.informasiUmum.alokasiWaktu}\n\nBAGIAN II. CAPAIAN PEMBELAJARAN\n${generatedDoc.identifikasiDanDesain.capaianPembelajaran}\n\nBAGIAN III. LANGKAH-LANGKAH PEMBELAJARAN (5 KOLOM)\n${generatedDoc.langkahPembelajaran.kegiatanAwal.map((k) => `[Awal] ${k.activity} (${k.timeAllocation})`).join('\n')}\n${generatedDoc.langkahPembelajaran.kegiatanInti.map((k) => `[Inti] ${k.activity} (${k.timeAllocation})`).join('\n')}\n${generatedDoc.langkahPembelajaran.kegiatanPenutup.map((k) => `[Penutup] ${k.activity} (${k.timeAllocation})`).join('\n')}\n\nMengetahui,\nKepala Sekolah: ${generatedDoc.pengesahan.namaKepalaSekolah}\n\nPenyusun: ${generatedDoc.pengesahan.namaPenyusun}`;

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportWord = async () => {
    if (!generatedDoc) return;
    setIsExportingWord(true);
    try {
      await exportModulToWord(generatedDoc);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } catch (err) {
      console.error('Gagal mengekspor Word:', err);
      alert('Terjadi kendala saat membuat file Word. Silakan coba lagi.');
    } finally {
      setIsExportingWord(false);
    }
  };

  const subjectAnalysis: SubjectAwareAnalysis | undefined = generatedDoc?.subjectAwareAnalysis as
    | SubjectAwareAnalysis
    | undefined;

  return (
    <section id="prompt-lab" className="py-20 md:py-28 relative bg-[#071426] border-t border-[#2979FF]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00E5FF]">
              <FileText className="w-4 h-4 text-[#00E5FF]" />
              <span>Prompt Lab </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Generator Modul Ajar Deep Learning
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              Menghasilkan Modul Ajar Deep Learning yang otomatis mengenali karakteristik mata pelajaran.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleScenarioPreset('math-splsv')}
              className="px-3.5 py-2 text-xs font-semibold text-[#00E5FF] bg-[#0E223D] hover:bg-[#122A4E] border border-[#00E5FF]/30 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
              <span>Isi Contoh Parameter</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-[#0B1B31] border border-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Error notification if missing parameters */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/50 flex items-center gap-3 text-rose-200 text-xs sm:text-sm animate-fade-in">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 2-Zone Workspace: Input Form & Live Document Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Parameters (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl bg-[#0B1B31] border border-[#2979FF]/25 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#00E5FF]" />
                  <span>Parameter Pembelajaran</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mendukung fleksibilitas segala mata pelajaran & numerasi adaptif
                </p>
              </div>
            </div>

            <form onSubmit={handleGenerateModul} className="space-y-4 text-xs">
              {/* Identitas Sekolah */}
              <div className="space-y-3 pt-1">
                <span className="text-[11px] font-mono font-bold text-[#FFD166] uppercase block">
                  I. Identitas Sekolah & Guru
                </span>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Nama Sekolah *</label>
                  <input
                    type="text"
                    required
                    value={formInput.schoolName}
                    onChange={(e) => setFormInput({ ...formInput, schoolName: e.target.value })}
                    placeholder="Contoh: SMP Negeri 1 Surabaya"
                    className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Nama Kepala Sekolah *</label>
                    <input
                      type="text"
                      required
                      value={formInput.principalName}
                      onChange={(e) => setFormInput({ ...formInput, principalName: e.target.value })}
                      placeholder="Nama Kepala Sekolah"
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Nama Penyusun / Guru *</label>
                    <input
                      type="text"
                      required
                      value={formInput.teacherName}
                      onChange={(e) => setFormInput({ ...formInput, teacherName: e.target.value })}
                      placeholder="Nama Guru"
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Mata Pelajaran & Topik */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-mono font-bold text-[#00E5FF] uppercase block">
                  II. Substansi Mata Pelajaran & Karakteristik
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Mata Pelajaran *</label>
                    <input
                      type="text"
                      required
                      value={formInput.subject}
                      onChange={(e) => {
                        const newSub = e.target.value;
                        const isMath = newSub.toLowerCase().includes('matematika') || newSub.toLowerCase().includes('aljabar');
                        const hasStaleMath =
                          (formInput.studentCharacteristics || '').includes('aritmatika') ||
                          (formInput.studentCharacteristics || '').includes('simbolik aljabar');
                        if (!isMath && hasStaleMath) {
                          setFormInput({
                            ...formInput,
                            subject: newSub,
                            studentCharacteristics: '',
                            priorKnowledge: '',
                            specialLearningNeeds: '',
                            facilitiesAndTools: (formInput.facilitiesAndTools || '').includes('timbangan peraga')
                              ? ''
                              : formInput.facilitiesAndTools
                          });
                        } else {
                          setFormInput({ ...formInput, subject: newSub });
                        }
                      }}
                      placeholder="Matematika, Fisika, DKV, dll."
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Materi Pokok *</label>
                    <input
                      type="text"
                      required
                      value={formInput.materi}
                      onChange={(e) => setFormInput({ ...formInput, materi: e.target.value })}
                      placeholder="Contoh: Aljabar / Kinematika / Tipografi"
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Topik Pembelajaran *</label>
                  <input
                    type="text"
                    required
                    value={formInput.topic}
                    onChange={(e) => setFormInput({ ...formInput, topic: e.target.value })}
                    placeholder="Contoh: Persamaan Linear Satu Variabel"
                    className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Capaian Pembelajaran (CP) *</label>
                  <textarea
                    rows={3}
                    required
                    value={formInput.learningOutcomeCP}
                    onChange={(e) => setFormInput({ ...formInput, learningOutcomeCP: e.target.value })}
                    placeholder="Tuliskan rumusan CP resmi mata pelajaran"
                    className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Elemen CP *</label>
                    <input
                      type="text"
                      required
                      value={formInput.element}
                      onChange={(e) => setFormInput({ ...formInput, element: e.target.value })}
                      placeholder="Contoh: Aljabar / Proses"
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Fase / Kelas *</label>
                    <input
                      type="text"
                      required
                      value={formInput.gradeLevel}
                      onChange={(e) => setFormInput({ ...formInput, gradeLevel: e.target.value })}
                      placeholder="Fase D (Kelas 7)"
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Semester *</label>
                    <select
                      value={formInput.semester}
                      onChange={(e) => setFormInput({ ...formInput, semester: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none cursor-pointer"
                    >
                      <option value="1 (Ganjil)">1 (Ganjil)</option>
                      <option value="2 (Genap)">2 (Genap)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Alokasi Waktu *</label>
                    <input
                      type="text"
                      required
                      value={formInput.timeAllocation}
                      onChange={(e) => setFormInput({ ...formInput, timeAllocation: e.target.value })}
                      placeholder="Contoh: 2 JP (80 Menit)"
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Pendekatan Pedagogis */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-mono font-bold text-[#8B5CF6] uppercase block">
                  III. Pendekatan Pedagogis
                </span>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Praktik Pedagogis Terpilih *</label>
                  <select
                    value={formInput.pedagogicalPractice}
                    onChange={(e) =>
                      setFormInput({
                        ...formInput,
                        pedagogicalPractice: e.target.value as PedagogicalPractice
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none cursor-pointer"
                  >
                    <option value="Problem Based Learning (PBL)">Problem Based Learning (PBL)</option>
                    <option value="Project Based Learning (PjBL)">Project Based Learning (PjBL)</option>
                    <option value="Discovery Learning">Discovery Learning</option>
                    <option value="Inquiry Based Learning">Inquiry Based Learning</option>
                    <option value="Pembelajaran Berdiferensiasi">Pembelajaran Berdiferensiasi</option>
                    <option value="Direct Instruction (Pembelajaran Langsung)">Direct Instruction</option>
                    <option value="Lainnya">Lainnya...</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#2979FF] via-[#00E5FF] to-[#8B5CF6] hover:shadow-lg hover:shadow-[#00E5FF]/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-[#FFD166]" />
                  <span>{isGenerating ? 'Menganalisis Karakteristik Subjek...' : 'Buat Modul Ajar'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Live Document Preview (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {generatedDoc ? (
              <div className="p-6 sm:p-7 rounded-3xl bg-[#0B1B31] border border-[#2979FF]/30 shadow-2xl space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                        {subjectAnalysis?.domainNameId || 'Subject-Aware Modul'}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {subjectAnalysis?.isQuantitative ? 'Numerik & Rumus Aktif' : 'Representasi Konseptual / Visual'}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                      {generatedDoc.informasiUmum.topikPembelajaran}
                    </h3>
                  </div>
                </div>

                {/* LANJUTKAN PENGEMBANGAN PEMBELAJARAN */}
<div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0C1F38] via-[#0E223D] to-[#071426] border-2 border-[#00E5FF]/40 shadow-xl space-y-4">

  {/* HEADER */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2979FF]/20 pb-3">
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 shrink-0 rounded-xl bg-[#00E5FF]/20 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shadow-inner">
        <Zap className="w-4 h-4 text-[#FFD166]" />
      </div>

      <div className="min-w-0">
        <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white flex flex-wrap items-center gap-2">
          <span>LANJUTKAN PENGEMBANGAN PEMBELAJARAN</span>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold whitespace-nowrap">
            Integrasi Otomatis
          </span>
        </h4>

        <p className="text-[11px] text-slate-300 leading-relaxed mt-1">
          Satu modul ajar menjadi sumber data untuk Game Studio dan Generator Media tanpa perlu mengisi ulang parameter.
        </p>
      </div>
    </div>

    {transferStatus && (
      <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5 animate-pulse bg-emerald-950/70 px-3 py-1.5 rounded-lg border border-emerald-700 shrink-0">
        <Check className="w-3.5 h-3.5 text-emerald-400" />
        {transferStatus}
      </span>
    )}
  </div>

  {/* DUA KARTU INTEGRASI */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 items-stretch">

    {/* KARTU 1: GAME STUDIO */}
    <div className="h-full p-4 rounded-xl bg-[#071426]/90 border border-[#2979FF]/40 hover:border-[#00E5FF] transition-all flex flex-col justify-between gap-4 group shadow-sm">

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
          <Gamepad2 className="w-4 h-4 shrink-0 text-[#00E5FF] group-hover:scale-110 transition-transform" />
          <span>1. Game Studio (Gemini Canvas)</span>
        </div>

        <p className="text-[11px] text-slate-300 leading-relaxed">
          Teruskan otomatis: mata pelajaran <strong>{formInput.subject}</strong>, topik <em>"{formInput.topic}"</em>, kelas, dan tujuan pembelajaran ke formulir Game Studio.
        </p>
      </div>

      <button
        type="button"
        onClick={handleCreateGameFromModul}
        className="w-full min-h-[44px] py-2.5 px-3 rounded-lg font-bold text-xs bg-gradient-to-r from-[#00E5FF] to-[#2979FF] text-[#071426] hover:brightness-110 shadow-lg shadow-[#00E5FF]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <Gamepad2 className="w-4 h-4 shrink-0" />
        <span>Buat Game dari Modul Ini</span>
        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
      </button>
    </div>

    {/* KARTU 2: GENERATOR MEDIA */}
    <div className="h-full p-4 rounded-xl bg-[#071426]/90 border border-[#8B5CF6]/40 hover:border-[#8B5CF6] transition-all flex flex-col justify-between gap-4 group shadow-sm">

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
          <Sparkles className="w-4 h-4 shrink-0 text-[#FFD166] group-hover:scale-110 transition-transform" />
          <span>2. Generator Media (ChatGPT)</span>
        </div>

        <p className="text-[11px] text-slate-300 leading-relaxed">
          Teruskan otomatis: judul, topik <em>"{formInput.topic}"</em>, jenjang, dan identitas sekolah ke perancang poster, infografis &amp; LKPD siap pakai.
        </p>
      </div>

      <button
        type="button"
        onClick={handleCreateMediaFromModul}
        className="w-full min-h-[44px] py-2.5 px-3 rounded-lg font-bold text-xs bg-gradient-to-r from-[#10B981] to-[#00E5FF] text-[#071426] hover:brightness-110 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
      >
        <Sparkles className="w-4 h-4 shrink-0" />
        <span>Buat Media dari Modul Ini</span>
        <ArrowRight className="w-3.5 h-3.5 shrink-0" />
      </button>
    </div>

  </div>
</div>

                {/* Section Navigator Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-mono">
                  {[
                    { id: 'sec-1', label: 'I. Info Umum' },
                    { id: 'sec-2', label: 'II. Identifikasi' },
                    { id: 'sec-3', label: 'III. Desain Pembelajaran' },
                    { id: 'sec-4', label: 'IV. Pengalaman Belajar (Tabel 5 Kolom)' },
                    { id: 'sec-5', label: 'V. Asesmen & Rubrik' },
                    { id: 'sec-6', label: 'VI. Refleksi & Tindak Lanjut' },
                    { id: 'sec-7', label: 'VII. Pengesahan' },
                    ...(subjectAnalysis?.isQuantitative
                      ? [
                          {
                            id: 'sec-math',
                            label: '★ Lampiran Rumus & Kalkulasi',
                            isSpecial: true
                          }
                        ]
                      : [])
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDocSection(tab.id)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                        activeDocSection === tab.id
                          ? tab.isSpecial
                            ? 'bg-gradient-to-r from-[#FFD166] to-[#00E5FF] text-[#071426] font-extrabold shadow-md'
                            : 'bg-[#00E5FF] text-[#071426] font-bold'
                          : tab.isSpecial
                          ? 'text-amber-300 hover:text-white bg-amber-500/10 border border-amber-500/30'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Document Body Render */}
                <div className="p-6 rounded-2xl bg-[#071426] border border-slate-800 max-h-[580px] overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {/* TAB 1: INFORMASI UMUM */}
                  {activeDocSection === 'sec-1' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <h4 className="text-base font-bold text-white uppercase">
                          BAGIAN I. INFORMASI UMUM
                        </h4>
                        <span className="text-[11px] font-mono text-cyan-400">
                          {subjectAnalysis?.domainNameId || 'Subject-Aware'}
                        </span>
                      </div>
                      <table className="w-full text-left text-xs">
                        <tbody className="divide-y divide-slate-800">
                          <tr>
                            <td className="py-2.5 font-bold text-[#00E5FF] w-48">Nama Sekolah</td>
                            <td className="py-2.5 text-white">{generatedDoc.informasiUmum.namaSekolah}</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-[#00E5FF]">Nama Penyusun / Guru</td>
                            <td className="py-2.5 text-white">{generatedDoc.informasiUmum.namaPenyusun}</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-[#00E5FF]">Mata Pelajaran</td>
                            <td className="py-2.5 text-white">{generatedDoc.informasiUmum.mataPelajaran}</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-[#00E5FF]">Materi Pokok</td>
                            <td className="py-2.5 text-white">{generatedDoc.informasiUmum.materi}</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-[#00E5FF]">Topik Pembelajaran</td>
                            <td className="py-2.5 text-white">{generatedDoc.informasiUmum.topikPembelajaran}</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-[#00E5FF]">Fase / Kelas</td>
                            <td className="py-2.5 text-white">{generatedDoc.informasiUmum.faseAtauKelas}</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-[#00E5FF]">Semester</td>
                            <td className="py-2.5 text-white">Semester {generatedDoc.informasiUmum.semester}</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-[#00E5FF]">Alokasi Waktu</td>
                            <td className="py-2.5 text-white">{generatedDoc.informasiUmum.alokasiWaktu}</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-[#00E5FF]">Sarana & Prasarana</td>
                            <td className="py-2.5 text-white">
                              {generatedDoc.informasiUmum.saranaDanPrasarana || formInput.facilitiesAndTools || 'Papan tulis, lembar kerja siswa, buku referensi, dan media pendukung.'}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-[#00E5FF]">Sasaran Peserta Didik</td>
                            <td className="py-2.5 text-white">
                              {generatedDoc.informasiUmum.sasaranPesertaDidik || 'Peserta didik reguler / tipikal'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* TAB 2: IDENTIFIKASI */}
                  {activeDocSection === 'sec-2' && (
                    <div className="space-y-5 animate-fade-in">
                      <h4 className="text-base font-bold text-white uppercase border-b border-slate-800 pb-2">
                        BAGIAN II. IDENTIFIKASI
                      </h4>

                      <div className="space-y-2">
                        <span className="font-bold text-[#FFD166] block">1. Identifikasi Peserta Didik:</span>
                        <div className="p-4 rounded-xl bg-[#0B1B31] border border-slate-800 space-y-2 text-xs">
                          <p><strong className="text-cyan-300">Karakteristik Peserta Didik:</strong> {generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.karakteristikPesertaDidik || formInput.studentCharacteristics}</p>
                          <p><strong className="text-cyan-300">Pengetahuan Awal:</strong> {generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.pengetahuanAwal}</p>
                          <p><strong className="text-cyan-300">Minat & Kebutuhan Belajar:</strong> {generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.minatDanKebutuhanBelajar || generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.minatDanMotivasi}</p>
                          <p><strong className="text-cyan-300">Kesiapan Belajar:</strong> {generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.kesiapanBelajar}</p>
                          <p><strong className="text-rose-300">Potensi Miskonsepsi:</strong> {generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.potensiMiskonsepsi}</p>
                          <p><strong className="text-emerald-300">Dukungan & Diferensiasi:</strong> {generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.dukunganDanDiferensiasi}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="font-bold text-[#00E5FF] block">
                          2. Dimensi Profil Lulusan yang Ditumbuhkan (Pilihan 2–3 Dimensi Resmi):
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {generatedDoc.identifikasiDanDesain.dimensiProfilLulusan.map((dp, i) => (
                            <div key={i} className="p-3.5 rounded-xl bg-[#0B1B31] border border-cyan-500/20 space-y-1.5 text-xs">
                              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                                <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0" />
                                <span>{dp.dimensi}</span>
                              </div>
                              <p className="text-slate-300 leading-relaxed text-[11px]">{dp.alasanRelevansi}</p>
                              <div className="pt-1 text-[11px] text-amber-300 font-mono">
                                <strong>Perilaku teramati:</strong> {dp.perilakuTeramati}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="font-bold text-[#FFD166] block">3. Karakteristik Materi Pelajaran:</span>
                        <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-slate-800 text-xs text-slate-300 leading-relaxed">
                          {generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.karakteristikMateri || generatedDoc.identifikasiDanDesain.identifikasiMataPelajaran.relevansiKehidupanNyata}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: DESAIN PEMBELAJARAN */}
                  {activeDocSection === 'sec-3' && (
                    <div className="space-y-5 animate-fade-in">
                      <h4 className="text-base font-bold text-white uppercase border-b border-slate-800 pb-2">
                        BAGIAN III. DESAIN PEMBELAJARAN
                      </h4>

                      <div className="space-y-1.5">
                        <span className="font-bold text-[#00E5FF] block">1. Capaian Pembelajaran (CP) Resmi:</span>
                        <p className="p-3.5 rounded-xl bg-[#0B1B31] border border-slate-800 text-slate-200 text-xs italic leading-relaxed">
                          "{generatedDoc.identifikasiDanDesain.capaianPembelajaran}"
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="font-bold text-[#FFD166] block">
                          2. Tujuan Pembelajaran (3 Pengalaman Belajar Kurikulum Deep Learning):
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-emerald-500/30 space-y-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 uppercase block w-fit">
                              A. Memahami (Meaningful)
                            </span>
                            <p className="text-slate-200 leading-relaxed">{generatedDoc.identifikasiDanDesain.tujuanPembelajaran.memahami.join(' ')}</p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-blue-500/30 space-y-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-950 text-blue-400 border border-blue-800 uppercase block w-fit">
                              B. Mengaplikasi (Authentic)
                            </span>
                            <p className="text-slate-200 leading-relaxed">{generatedDoc.identifikasiDanDesain.tujuanPembelajaran.mengaplikasi.join(' ')}</p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-amber-500/30 space-y-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-950 text-amber-400 border border-amber-800 uppercase block w-fit">
                              C. Merefleksi (Metacognitive)
                            </span>
                            <p className="text-slate-200 leading-relaxed">{generatedDoc.identifikasiDanDesain.tujuanPembelajaran.merefleksi.join(' ')}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="font-bold text-[#00E5FF] block">3. Praktik Pedagogis & Sintaks:</span>
                        <div className="p-4 rounded-xl bg-[#0B1B31] border border-slate-800 space-y-2.5 text-xs">
                          <div className="flex items-center justify-between">
                            <strong className="text-white text-sm">Pendekatan: {generatedDoc.identifikasiDanDesain.praktikPedagogis.namaPendekatan}</strong>
                          </div>
                          <p className="text-slate-300 leading-relaxed">{generatedDoc.identifikasiDanDesain.praktikPedagogis.alasanPemilihan}</p>
                          {generatedDoc.identifikasiDanDesain.praktikPedagogis.sintaksTahapan && (
                            <div className="pt-2 border-t border-slate-800 space-y-1.5">
                              <span className="font-bold text-slate-200 block text-[11px]">Sintaks Tahapan:</span>
                              {generatedDoc.identifikasiDanDesain.praktikPedagogis.sintaksTahapan.map((s, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-slate-300">
                                  <span className="font-mono text-cyan-400 font-bold shrink-0">{idx + 1}.</span>
                                  <div>
                                    <strong className="text-white">{s.tahapan}: </strong>
                                    <span>{s.deskripsi}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-slate-800 space-y-1">
                          <strong className="text-[#FFD166] block">Kemitraan Pembelajaran:</strong>
                          <p className="text-slate-300 leading-relaxed">
                            {generatedDoc.identifikasiDanDesain.kemitraanPembelajaran || generatedDoc.identifikasiDanDesain.mitraPembelajaran || 'Kolaborasi rekan sejawat dalam kelompok kecil dan umpan balik timbal balik.'}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-slate-800 space-y-1">
                          <strong className="text-[#00E5FF] block">Lingkungan Pembelajaran:</strong>
                          <p className="text-slate-300 leading-relaxed">
                            <strong>Fisik:</strong> {generatedDoc.identifikasiDanDesain.lingkunganPembelajaran.fisik}<br />
                            <strong>Sosial:</strong> {generatedDoc.identifikasiDanDesain.lingkunganPembelajaran.sosial}<br />
                            <strong>Digital:</strong> {generatedDoc.identifikasiDanDesain.lingkunganPembelajaran.digital}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: PENGALAMAN BELAJAR (TABEL 5 KOLOM) */}
                  {activeDocSection === 'sec-4' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                        <h4 className="text-base font-bold text-white uppercase">
                          BAGIAN IV. PENGALAMAN BELAJAR (TABEL 5 KOLOM)
                        </h4>
                        <span className="text-xs font-mono text-[#00E5FF] bg-[#0E223D] px-2.5 py-1 rounded-lg border border-[#00E5FF]/30">
                          {generatedDoc.langkahPembelajaran.asumsiWaktuText}
                        </span>
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-slate-800">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-[#0B1B31] text-[#00E5FF] font-bold border-b border-slate-800">
                            <tr>
                              <th className="p-3 w-5/12">Aktivitas Pembelajaran (Awal, Inti, Penutup)</th>
                              <th className="p-3 w-20 text-center">Waktu</th>
                              <th className="p-3 w-28">Prinsip (3 Prinsip)</th>
                              <th className="p-3 w-28">Pengalaman (3 Pengalaman)</th>
                              <th className="p-3">Sumber & Media</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800 text-xs">
                            {[
                              ...generatedDoc.langkahPembelajaran.kegiatanAwal,
                              ...generatedDoc.langkahPembelajaran.kegiatanInti,
                              ...generatedDoc.langkahPembelajaran.kegiatanPenutup
                            ].map((row, idx) => (
                              <tr key={idx} className="hover:bg-[#0E223D]/50 transition-colors">
                                <td className="p-3 text-slate-200">
                                  <MixedMathText content={row.activity} />
                                </td>
                                <td className="p-3 font-mono text-[#FFD166] text-center whitespace-nowrap">{row.timeAllocation}</td>
                                <td className="p-3 text-slate-300 whitespace-nowrap">{row.principle}</td>
                                <td className="p-3 font-semibold text-cyan-300 whitespace-nowrap">{row.learningExperience}</td>
                                <td className="p-3 text-slate-400 text-[11px]">{row.learningResources}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: ASESMEN & RUBRIK */}
                  {activeDocSection === 'sec-5' && (
                    <div className="space-y-5 animate-fade-in">
                      <h4 className="text-base font-bold text-white uppercase border-b border-slate-800 pb-2">
                        BAGIAN V. ASESMEN PEMBELAJARAN & RUBRIK
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-emerald-500/30 space-y-1.5">
                          <strong className="text-emerald-400 block font-mono uppercase">1. Asesmen Awal</strong>
                          <p><strong>Tujuan:</strong> {generatedDoc.asesmen.asesmenAwal.tujuan}</p>
                          <p><strong>Teknik:</strong> {generatedDoc.asesmen.asesmenAwal.teknik}</p>
                          <p className="text-[11px] text-slate-300 italic">{generatedDoc.asesmen.asesmenAwal.contohSoalTugas}</p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-blue-500/30 space-y-1.5">
                          <strong className="text-blue-400 block font-mono uppercase">2. Asesmen Formatif</strong>
                          <p><strong>Teknik:</strong> {generatedDoc.asesmen.asesmenFormatif.teknik}</p>
                          <p><strong>Waktu:</strong> {generatedDoc.asesmen.asesmenFormatif.waktuPelaksanaan}</p>
                          <p><strong>Kriteria:</strong> {generatedDoc.asesmen.asesmenFormatif.kriteriaKeberhasilan}</p>
                          <p className="text-[11px] text-slate-400"><strong>Umpan Balik:</strong> {generatedDoc.asesmen.asesmenFormatif.bentukUmpanBalik}</p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-amber-500/30 space-y-1.5">
                          <strong className="text-amber-400 block font-mono uppercase">3. Asesmen Sumatif</strong>
                          <p><strong>Bentuk:</strong> {generatedDoc.asesmen.asesmenSumatif.bentuk}</p>
                          <p><strong>Deskripsi:</strong> {generatedDoc.asesmen.asesmenSumatif.deskripsiTugasSoal}</p>
                          <p className="text-[11px] text-slate-400"><strong>Kunci / Kriteria:</strong> {generatedDoc.asesmen.asesmenSumatif.kunciAtauKriteria}</p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <span className="font-bold text-white block">Rubrik Penilaian Skala 1–4:</span>
                        <div className="overflow-x-auto rounded-xl border border-slate-800">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead className="bg-[#0B1B31] text-slate-300 font-bold border-b border-slate-800 text-[11px]">
                              <tr>
                                <th className="p-2.5 w-36">Aspek & Indikator</th>
                                <th className="p-2.5">1 (Perlu Bimbingan)</th>
                                <th className="p-2.5">2 (Cukup)</th>
                                <th className="p-2.5">3 (Baik)</th>
                                <th className="p-2.5">4 (Sangat Baik)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800 text-[11px]">
                              {generatedDoc.asesmen.rubrikPenilaian.map((r, ri) => (
                                <tr key={ri} className="hover:bg-[#0E223D]/50 transition-colors">
                                  <td className="p-2.5 font-bold text-[#00E5FF]">
                                    {r.aspek}
                                    <span className="block font-normal text-slate-400 text-[10px] mt-0.5">{r.indikator}</span>
                                  </td>
                                  <td className="p-2.5 text-slate-400">{r.skala1}</td>
                                  <td className="p-2.5 text-slate-300">{r.skala2}</td>
                                  <td className="p-2.5 text-slate-200">{r.skala3}</td>
                                  <td className="p-2.5 text-emerald-300 font-medium">{r.skala4}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 6: REFLEKSI & TINDAK LANJUT */}
                  {activeDocSection === 'sec-6' && (
                    <div className="space-y-5 animate-fade-in">
                      <h4 className="text-base font-bold text-white uppercase border-b border-slate-800 pb-2">
                        BAGIAN VI. REFLEKSI & TINDAK LANJUT
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-[#0B1B31] border border-slate-800 space-y-2 text-xs">
                          <strong className="text-[#00E5FF] block">Pertanyaan Refleksi Peserta Didik:</strong>
                          <ul className="list-disc list-inside space-y-1.5 text-slate-200">
                            {generatedDoc.refleksi.refleksiPesertaDidik.map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-[#0B1B31] border border-slate-800 space-y-2 text-xs">
                          <strong className="text-[#FFD166] block">Pertanyaan Refleksi Guru:</strong>
                          <ul className="list-disc list-inside space-y-1.5 text-slate-200">
                            {generatedDoc.refleksi.refleksiGuru.map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#0B1B31] border border-slate-800 space-y-2 text-xs">
                        <strong className="text-white block font-mono uppercase">Program Remedial & Pengayaan:</strong>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                          <div>
                            <span className="font-semibold text-rose-300 block mb-0.5">• Program Remedial:</span>
                            <p>{generatedDoc.asesmen.pengolahanDanTindakLanjut.remedial}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-emerald-300 block mb-0.5">• Program Pengayaan:</span>
                            <p>{generatedDoc.asesmen.pengolahanDanTindakLanjut.pengayaan}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 7: PENGESAHAN */}
                  {activeDocSection === 'sec-7' && (
                    <div className="space-y-6 animate-fade-in">
                      <h4 className="text-base font-bold text-white uppercase border-b border-slate-800 pb-2">
                        BAGIAN VII. PENGESAHAN DOKUMEN
                      </h4>
                      <p className="text-xs text-slate-400">{generatedDoc.pengesahan.kotaDanTanggal}</p>

                      <div className="grid grid-cols-2 gap-8 pt-4">
                        <div className="space-y-12">
                          <p className="text-xs text-slate-300">Mengetahui,<br /><strong>Kepala Sekolah</strong></p>
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-white underline">{generatedDoc.pengesahan.namaKepalaSekolah}</p>
                            <p className="text-xs text-slate-400 font-mono">NIP. ........................................</p>
                          </div>
                        </div>

                        <div className="space-y-12">
                          <p className="text-xs text-slate-300">Penyusun,<br /><strong>Guru Mata Pelajaran</strong></p>
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-white underline">{generatedDoc.pengesahan.namaPenyusun}</p>
                            <p className="text-xs text-slate-400 font-mono">NIP. ........................................</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 8: LAMPIRAN RUMUS & KALKULASI (HANYA MUNCUL JIKA isQuantitative === true) */}
                  {activeDocSection === 'sec-math' && subjectAnalysis?.isQuantitative && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-[#0C1F38] to-[#071426] border border-[#00E5FF]/40 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono uppercase tracking-wider text-[#00E5FF] font-bold flex items-center gap-1.5">
                            <Sigma className="w-4 h-4 text-[#FFD166]" />
                            Karakteristik Subjek Numerik: {subjectAnalysis.domainNameId}
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-extrabold rounded bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40">
                            Subject-Aware Aktif
                          </span>
                        </div>
                        <ul className="text-xs text-slate-300 space-y-1 pl-1">
                          {subjectAnalysis.detectedCharacteristics.map((c: string, i: number) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 1. Core Formulas (Rendered with KaTeX) */}
                      {subjectAnalysis.coreFormulas && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-1.5">
                            <Sigma className="w-4 h-4 text-[#00E5FF]" />
                            <span>Rumus & Notasi Matematika / Sains:</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {subjectAnalysis.coreFormulas.map((formula, idx: number) => (
                              <div
                                key={idx}
                                className="p-4 rounded-xl bg-[#0B1B31] border border-[#2979FF]/30 space-y-2 shadow-sm"
                              >
                                <span className="text-xs font-bold text-[#FFD166] block">
                                  {formula.name}
                                </span>
                                <div className="p-2.5 rounded-lg bg-[#071426] border border-slate-800 text-center text-white text-base">
                                  <MathRenderer latex={formula.latex} displayMode={true} fallbackText={formula.textFallback} />
                                </div>
                                {formula.variables && formula.variables.length > 0 && (
                                  <div className="pt-1 space-y-1 text-[11px] text-slate-400">
                                    <span className="font-semibold text-slate-300 block">Keterangan Variabel:</span>
                                    {formula.variables.map((v, vi: number) => (
                                      <div key={vi} className="flex items-center justify-between">
                                        <span className="font-mono text-cyan-300 font-bold">{v.symbol}</span>
                                        <span className="text-slate-300">{v.meaning}</span>
                                        {v.unit && <span className="text-amber-300 font-mono text-[10px]">[{v.unit}]</span>}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 2. Step-by-Step Worked Example */}
                      {subjectAnalysis.workedExample && (
                        <div className="space-y-3 pt-2">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-1.5">
                            <Calculator className="w-4 h-4 text-[#FFD166]" />
                            <span>Contoh Soal & Langkah Perhitungan Bertahap:</span>
                          </h4>
                          <div className="p-4 rounded-xl bg-[#0B1B31] border border-slate-800 space-y-3">
                            <div className="space-y-1">
                              <span className="text-xs font-bold text-[#00E5FF]">
                                {subjectAnalysis.workedExample.problemTitle}
                              </span>
                              <p className="text-xs text-white leading-relaxed">
                                {subjectAnalysis.workedExample.problemStatement}
                              </p>
                            </div>

                            {subjectAnalysis.workedExample.given.length > 0 && (
                              <div className="p-2.5 rounded-lg bg-[#071426] border border-slate-800 text-xs text-slate-300 space-y-1">
                                <span className="font-bold text-[#FFD166] block">Diketahui:</span>
                                {subjectAnalysis.workedExample.given.map((g: string, gi: number) => (
                                  <div key={gi} className="font-mono text-[11px] text-slate-200">• {g}</div>
                                ))}
                              </div>
                            )}

                            {/* Sequential Steps */}
                            <div className="space-y-2 pt-1">
                              <span className="text-xs font-bold text-slate-200 block">Langkah Penyelesaian:</span>
                              {subjectAnalysis.workedExample.steps.map((st) => (
                                <div key={st.stepNumber} className="p-3 rounded-lg bg-[#071426] border border-slate-800 space-y-1.5 text-xs">
                                  <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-[#2979FF] text-white flex items-center justify-center font-bold text-[10px]">
                                      {st.stepNumber}
                                    </span>
                                    <span className="text-slate-300 font-medium">{st.description}</span>
                                  </div>
                                  <div className="pl-7 font-mono text-cyan-300 text-sm overflow-x-auto py-1">
                                    <MathRenderer latex={st.mathExpression} displayMode={false} />
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200 space-y-1">
                              <strong className="block text-emerald-300">Jawaban Akhir:</strong>
                              <p className="font-semibold">{subjectAnalysis.workedExample.finalAnswer}</p>
                              <p className="text-[11px] text-emerald-400/80 italic">{subjectAnalysis.workedExample.verificationOrNote}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 3. Specialized Data Table */}
                      {subjectAnalysis.specializedTable && (
                        <div className="space-y-3 pt-2">
                          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-1.5">
                            <TableIcon className="w-4 h-4 text-[#8B5CF6]" />
                            <span>{subjectAnalysis.specializedTable.title}</span>
                          </h4>
                          <div className="overflow-x-auto rounded-xl border border-slate-800">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-[#0B1B31] text-[#00E5FF] font-bold border-b border-slate-800">
                                <tr>
                                  {subjectAnalysis.specializedTable.headers.map((h: string, hi: number) => (
                                    <th key={hi} className="p-2.5 whitespace-nowrap">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                                {subjectAnalysis.specializedTable.rows.map((row: string[], ri: number) => (
                                  <tr key={ri} className="hover:bg-[#0E223D]/50 transition-colors">
                                    {row.map((cell: string, ci: number) => (
                                      <td key={ci} className="p-2.5 text-slate-200 whitespace-pre-line">{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {subjectAnalysis.specializedTable.summaryOrInsight && (
                            <p className="text-[11px] text-slate-400 italic bg-[#0B1B31] p-2 rounded-lg border border-slate-800">
                              *Catatan Analisis: {subjectAnalysis.specializedTable.summaryOrInsight}
                            </p>
                          )}
                        </div>
                      )}

                      {/* 4. Code Block (Informatika) */}
                      {subjectAnalysis.codeOrPseudocode && (
                        <div className="space-y-3 pt-2">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Code className="w-4 h-4 text-[#00E5FF]" />
                              <span>{subjectAnalysis.codeOrPseudocode.title}</span>
                            </h4>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(subjectAnalysis.codeOrPseudocode!.code);
                                setCodeCopied(true);
                                setTimeout(() => setCodeCopied(false), 2000);
                              }}
                              className="px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white bg-[#0B1B31] border border-slate-700 rounded-lg flex items-center gap-1 cursor-pointer"
                            >
                              {codeCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{codeCopied ? 'Tersalin' : 'Salin Kode'}</span>
                            </button>
                          </div>
                          <pre className="p-4 rounded-xl bg-[#030914] border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
                            {subjectAnalysis.codeOrPseudocode.code}
                          </pre>
                          <p className="text-xs text-slate-400">{subjectAnalysis.codeOrPseudocode.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* BOTTOM ACTION BAR FOR WORD EXPORT & PROMPT GENERATOR */}
                  <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#071426]/90 p-4 rounded-2xl border border-slate-700/60 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[#2979FF] shrink-0">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">Dokumen Pembelajaran Siap Digunakan</p>
                        <p className="text-[11px] text-slate-400">
                          Format resmi Microsoft Word (.docx) & Prompt AI lengkap untuk ChatGPT / Claude
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleOpenPromptModal}
                        className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-500/20 shrink-0"
                      >
                        <Sparkles className="w-4 h-4 text-[#FFD166]" />
                        <span>Generate Prompt dari Modul Ajar</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleExportWord}
                        disabled={isExportingWord}
                        className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#2979FF] to-[#00E5FF] hover:from-[#1D63D8] hover:to-[#00B4D8] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-500/20 disabled:opacity-50 shrink-0"
                      >
                        {isExportingWord ? (
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                        ) : (
                          <Download className="w-4 h-4 text-white" />
                        )}
                        <span>{isExportingWord ? 'Menyusun Dokumen Word...' : 'Unduh Modul Ajar (Word .docx)'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* EMPTY PLACEHOLDER */
              <div className="p-12 rounded-3xl bg-[#0B1B31]/60 border border-dashed border-slate-800 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#071426] border border-slate-700 flex items-center justify-center mx-auto text-[#00E5FF]">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <h4 className="text-lg font-bold text-white">Pratinjau Modul Ajar Subject-Aware</h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Pilih salah satu tombol preset di atas (misal <strong className="text-[#00E5FF]">Matematika, Fisika, Kimia, Akuntansi, atau DKV</strong>) untuk melihat contoh nyata output subject-aware dengan notasi matematika dan rumus terkalibrasi.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL PROMPT MODUL AJAR (HASIL GENERATE PROMPT DARI MODUL AJAR) */}
      {isPromptModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fade-in">
          <div className="w-full max-w-4xl max-h-[92vh] bg-[#071426] border border-purple-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-800 bg-[#0B1B31] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
                  <Sparkles className="w-5 h-5 text-[#FFD166]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>Prompt Modul Ajar Berhasil Dibuat</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono font-semibold">
                      Siap Pakai
                    </span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400">
                    Prompt lengkap disusun dari dokumen modul ajar aktif. Anda dapat mengedit teks sebelum menyalin atau membukanya di ChatGPT.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPromptModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Active Module Context Tags & Textarea */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded-lg bg-[#0E223D] border border-slate-700 text-slate-300 font-medium">
                  🏫 {generatedDoc?.informasiUmum.namaSekolah}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#0E223D] border border-slate-700 text-slate-300 font-medium">
                  📚 {generatedDoc?.informasiUmum.mataPelajaran}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#0E223D] border border-slate-700 text-[#00E5FF] font-medium">
                  🎯 {generatedDoc?.informasiUmum.topikPembelajaran}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#0E223D] border border-slate-700 text-amber-300 font-medium">
                  👥 {generatedDoc?.informasiUmum.faseAtauKelas}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <label className="font-semibold text-slate-300">Teks Prompt Lengkap (Dapat Diedit):</label>
                  <span className="font-mono text-[11px]">{generatedPromptText.length} Karakter</span>
                </div>
                <textarea
                  value={generatedPromptText}
                  onChange={(e) => setGeneratedPromptText(e.target.value)}
                  rows={15}
                  className="w-full p-4 rounded-2xl bg-[#030914] border border-slate-700 text-slate-200 font-mono text-xs leading-relaxed focus:border-purple-400 focus:outline-none resize-y selection:bg-purple-600/40"
                  placeholder="Menyusun prompt..."
                />
                <p className="text-[11px] text-slate-400 italic">
                  * Catatan: Mengedit teks prompt di atas tidak akan mengubah isi dokumen modul ajar asli yang sedang aktif.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3.5 border-t border-slate-800 bg-[#0B1B31] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-400 hidden sm:block">
                Gunakan prompt ini untuk membuat LKPD, bank soal HOTS, atau skenario interaktif di AI.
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setIsPromptModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-[#071426] hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors cursor-pointer"
                >
                  Tutup
                </button>

                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-purple-500/20"
                >
                  {promptCopied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{promptCopied ? 'Tersalin!' : 'Salin Prompt'}</span>
                </button>

                <a
                  href="https://chatgpt.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#10A37F] hover:bg-[#0E906F] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <span>Buka di ChatGPT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
