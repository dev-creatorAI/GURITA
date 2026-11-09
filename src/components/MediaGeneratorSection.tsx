import React, { useState, useEffect, useRef } from 'react';
import {
  MediaType,
  PageSize,
  PageOrientation,
  ColorTheme,
  DesignStyle,
  IllustrationStyle,
  CharacterChoice,
  SchoolLogoData,
  MediaGeneratorConfig
} from '../types/mediaGenerator';
import { buildCompleteChatGPTMediaPrompt } from '../utils/mediaContentGenerator';
import {
  FileText,
  PieChart,
  CheckSquare,
  BookOpen,
  Layers,
  ImageIcon,
  MessageSquare,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Edit3,
  ExternalLink,
  Sliders,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Upload,
  Trash2,
  RefreshCw,
  Users,
  EyeOff,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLearningData } from '../context/LearningDataContext';

// Default configuration for Media Generator
const DEFAULT_MEDIA_CONFIG: MediaGeneratorConfig = {
  mediaType: 'poster',
  title: '5 Langkah Bijak Memanfaatkan AI dalam Belajar',
  subject: 'Informatika & Literasi Digital',
  gradeLevel: 'Fase D (SMP) / Fase E (SMA) · Adaptif',
  topic: 'Etika, Integritas Akademik & Keamanan Privasi AI',
  learningGoal:
    'Peserta didik memahami prinsip berpikir kritis, verifikasi kebenaran informasi, dan etika saat berinteraksi dengan kecerdasan artifisial.',
  language: 'Bahasa Indonesia',
  pageSize: 'A4',
  orientation: 'potret',
  colorTheme: 'Biru dan cyan futuristik',
  designStyle: '3D Pixar',
  illustrationStyle: '3D Pixar',
  characterChoice: 'Karakter Muslimah Berhijab',
  schoolLogo: null,
  typography: 'Modern Sans-Serif (Outfit / Plus Jakarta Sans)',
  authorOrSchool: 'Sekolah Penggerak Nusantara · Tim Pendidik Inspiratif',
  posterSubtitle: 'Panduan Praktis Menjadi Pelajar Digital yang Kritis, Beradab & Kreatif',
  posterMainMessage:
    'Kecerdasan Artifisial adalah kompas cerdasmu. Akal budi dan nuranimu yang memegang kendali.',
  posterCallToAction: 'Ayo jadikan AI jembatan inspirasi, bukan pengganti daya berpikir kritis kita!',
  posterAdditionalInfo: 'Dipasang di Mading Sekolah, Lab Komputer & Ruang Kelas'
};

// Sample School Logo (SVG data URL formatted as lightweight image for instant 1-click testing)
const SAMPLE_SCHOOL_LOGO_DATA: SchoolLogoData = {
  fileName: 'logo_smpn1_nusantara.png',
  fileSize: 49200,
  fileType: 'image/png',
  dataUrl:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2300E5FF"/><stop offset="100%" stop-color="%232979FF"/></linearGradient></defs><circle cx="90" cy="90" r="84" fill="%230E223D" stroke="url(%23g)" stroke-width="6"/><circle cx="90" cy="90" r="70" fill="%23071426" stroke="%23FFD166" stroke-width="3"/><path d="M90 36 L104 68 L138 72 L112 96 L120 130 L90 112 L60 130 L68 96 L42 72 L76 68 Z" fill="%23FFD166"/><circle cx="90" cy="90" r="22" fill="%2300E5FF"/><text x="90" y="96" font-size="14" font-weight="900" text-anchor="middle" fill="%23071426" font-family="Arial, sans-serif">TUT WURI</text><text x="90" y="152" font-size="11" font-weight="bold" text-anchor="middle" fill="%2300E5FF" font-family="Arial, sans-serif">SMPN 1 NUSANTARA</text></svg>'
};

// Official ChatGPT Icon
const ChatGptIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829 14.6174 7.2144a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4021-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L8.907 9.2297V6.8974a.0662.0662 0 0 1 .0331-.0615L13.914 3.998a4.4992 4.4992 0 0 1 6.526 4.7297zM8.6655 13.0645l-2.0153-1.1638 5.8428-3.3685 2.0153 1.1638-5.8428 3.3685zm1.5238-2.6311l2.4087-1.3912 2.4087 1.3912-2.4087 1.3912-2.4087-1.3912z" />
  </svg>
);

export const MediaGeneratorSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<MediaType>('poster');
  const [promptCopied, setPromptCopied] = useState<boolean>(false);
  const [copyFeedbackText, setCopyFeedbackText] = useState<string>('');
  const [isEditingPrompt, setIsEditingPrompt] = useState<boolean>(false);
  const [customPromptText, setCustomPromptText] = useState<string>('');
  const [logoError, setLogoError] = useState<string>('');
  const [isDraggingLogo, setIsDraggingLogo] = useState<boolean>(false);

  // Shared Learning Data Context
  const { activeLearningData, importedForMedia, clearMediaGeneratorData, scrollToSection } = useLearningData();
  const lastAppliedModulId = useRef<string | null>(null);

  // Extended config with defaults (characterChoice default: Karakter Muslimah Berhijab, schoolLogo default: null)
  const [config, setConfig] = useState<MediaGeneratorConfig>(DEFAULT_MEDIA_CONFIG);

  // Synchronize when learning data is transferred from Prompt Lab
  useEffect(() => {
    if (importedForMedia && activeLearningData && lastAppliedModulId.current !== activeLearningData.id) {
      lastAppliedModulId.current = activeLearningData.id;
      const { inputAsli, hasilModul } = activeLearningData;

      setConfig((prev) => ({
        ...prev,
        title: inputAsli.topic ? `Media Pembelajaran: ${inputAsli.topic}` : `Media Pembelajaran: ${inputAsli.materi}`,
        subject: inputAsli.subject,
        gradeLevel: inputAsli.gradeLevel,
        topic: inputAsli.topic ? `${inputAsli.materi} — ${inputAsli.topic}` : inputAsli.materi,
        learningGoal: hasilModul.tujuanPembelajaranRingkasan || inputAsli.learningOutcomeCP,
        authorOrSchool: `${inputAsli.schoolName} · ${inputAsli.teacherName}`,
        posterSubtitle: `Eksplorasi Konsep & Pemahaman Bermakna ${inputAsli.materi}`
      }));
      setCustomPromptText('');
      setIsEditingPrompt(false);
    }
  }, [importedForMedia, activeLearningData]);

  const handleClearModulData = () => {
    lastAppliedModulId.current = null;
    clearMediaGeneratorData();
    setConfig(DEFAULT_MEDIA_CONFIG);
    setCustomPromptText('');
    setIsEditingPrompt(false);
    setCopyFeedbackText('Data modul telah dibersihkan. Formulir kembali ke pengaturan default.');
    setTimeout(() => setCopyFeedbackText(''), 3000);
  };

  // Handle Logo Upload File
  const handleLogoFile = (file: File) => {
    setLogoError('');
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const isExtensionValid = /\.(png|jpe?g)$/i.test(file.name);
    const isMimeValid = validTypes.includes(file.type.toLowerCase());

    if (!isMimeValid && !isExtensionValid) {
      setLogoError('Format file tidak didukung. Harap unggah file logo berformat PNG, JPG, atau JPEG.');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setLogoError('Ukuran file melebihi batas 5MB. Silakan pilih file logo yang lebih kecil.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setConfig((prev) => ({
        ...prev,
        schoolLogo: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type || 'image/png',
          dataUrl
        }
      }));
      setIsEditingPrompt(false);
      setCustomPromptText('');
      setCopyFeedbackText('Logo sekolah berhasil diunggah dan diintegrasikan!');
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      setTimeout(() => setCopyFeedbackText(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleLogoFile(e.target.files[0]);
      e.target.value = ''; // Reset input to allow re-uploading same file name if needed
    }
  };

  // Handle Remove Logo
  const handleRemoveLogo = () => {
    setConfig((prev) => ({
      ...prev,
      schoolLogo: null
    }));
    setLogoError('');
    setIsEditingPrompt(false);
    setCustomPromptText('');
    setCopyFeedbackText('Logo sekolah dihapus. Prompt otomatis kembali ke mode tanpa logo.');
    setTimeout(() => setCopyFeedbackText(''), 3000);
  };

  // Handle Load Sample Logo for instant 1-click test
  const handleLoadSampleLogo = () => {
    setConfig((prev) => ({
      ...prev,
      schoolLogo: SAMPLE_SCHOOL_LOGO_DATA
    }));
    setLogoError('');
    setIsEditingPrompt(false);
    setCustomPromptText('');
    setCopyFeedbackText('Contoh logo sekolah resmi berhasil dipasang!');
    confetti({ particleCount: 25, spread: 45, origin: { y: 0.7 } });
    setTimeout(() => setCopyFeedbackText(''), 3000);
  };

  // Presets for different media types (preserves logo & characterChoice if already set)
  const handleLoadSample = (type: MediaType) => {
    setSelectedType(type);
    setIsEditingPrompt(false);
    setCustomPromptText('');

    if (type === 'poster') {
      setConfig((prev) => ({
        ...prev,
        mediaType: 'poster',
        title: '5 Langkah Bijak Memanfaatkan AI dalam Belajar',
        subject: 'Informatika & Literasi Digital',
        gradeLevel: 'Fase D (SMP) / Fase E (SMA) · Adaptif',
        topic: 'Etika, Integritas Akademik & Keamanan Privasi AI',
        learningGoal:
          'Peserta didik memahami prinsip berpikir kritis, verifikasi kebenaran informasi, dan etika saat berinteraksi dengan AI.',
        pageSize: 'A4',
        orientation: 'potret',
        colorTheme: 'Biru dan cyan futuristik',
        designStyle: '3D Pixar',
        illustrationStyle: '3D Pixar',
        posterSubtitle: 'Panduan Praktis Menjadi Pelajar Digital yang Kritis, Beradab & Kreatif',
        posterMainMessage:
          'Kecerdasan Artifisial adalah kompas cerdasmu. Akal budi dan nuranimu yang memegang kendali.',
        posterCallToAction: 'Ayo jadikan AI jembatan inspirasi, bukan pengganti daya berpikir kritis kita!',
        posterAdditionalInfo: 'Dipasang di Mading Sekolah, Lab Komputer & Ruang Kelas'
      }));
    } else if (type === 'infografis') {
      setConfig((prev) => ({
        ...prev,
        mediaType: 'infografis',
        title: 'Siklus Aliran Energi & Jaring-Jaring Makanan Ekosistem',
        subject: 'Ilmu Pengetahuan Alam (IPA)',
        gradeLevel: 'Fase D (SMP Kelas 7-8)',
        topic: 'Interaksi Antarmakhluk Hidup & Keseimbangan Ekosistem',
        learningGoal:
          'Peserta didik mampu menganalisis perpindahan energi dari produsen, konsumen bertingkat, hingga pengurai dalam menjaga kestabilan biosfer.',
        pageSize: 'A4',
        orientation: 'potret',
        colorTheme: 'Hijau edukatif',
        designStyle: 'Infografis editorial',
        illustrationStyle: 'Diagram',
        posterSubtitle: 'Memahami Rantai Kehidupan dan Peran Setiap Organisme di Alam'
      }));
    } else if (type === 'lkpd') {
      setConfig((prev) => ({
        ...prev,
        mediaType: 'lkpd',
        title: 'LKPD Eksperimen: Menyelidiki Fotosintesis & Produksi Oksigen',
        subject: 'IPA / Biologi Terapan',
        gradeLevel: 'Fase D / E (SMP - SMA)',
        topic: 'Percobaan Ingenhousz pada Tumbuhan Air Hydrilla',
        learningGoal:
          'Membuktikan produksi gas oksigen selama reaksi fotosintesis di bawah variasi intensitas pencahayaan matahari.',
        pageSize: 'A4',
        orientation: 'potret',
        colorTheme: 'Biru profesional',
        designStyle: 'Modern edukatif',
        illustrationStyle: 'Diagram',
        posterSubtitle: 'Lembar Penyelidikan Ilmiah Terbimbing Laboratorium Sains'
      }));
    } else if (type === 'sampul') {
      setConfig((prev) => ({
        ...prev,
        mediaType: 'sampul',
        title: 'MODUL AJAR: MENJELAJAH SAMUDRA KECERDASAN BUATAN',
        subject: 'Informatika & Literasi Digital',
        gradeLevel: 'Fase E (Kelas 10 SMA/SMK)',
        topic: 'Panduan Pembelajaran Berdiferensiasi & Integrasi AI Produktif',
        learningGoal:
          'Membimbing siswa membangun nalar komputasional, literasi prompt rekayasa, dan penciptaan karya kreatif digital.',
        pageSize: 'A4',
        orientation: 'potret',
        colorTheme: 'Biru dan cyan futuristik',
        designStyle: 'Futuristik',
        illustrationStyle: '3D Pixar',
        posterSubtitle: 'Edisi Kurikulum Merdeka · Panduan Guru dan Aktivitas Kolaboratif Siswa'
      }));
    } else if (type === 'presentasi') {
      setConfig((prev) => ({
        ...prev,
        mediaType: 'presentasi',
        title: 'Prinsip Tipografi & Komposisi Visual Desain Grafis',
        subject: 'Desain Komunikasi Visual (DKV)',
        gradeLevel: 'Fase E / F (SMK Kelas 10-11)',
        topic: 'Hierarki Tipografi, Anatomi Huruf & Legibilitas Pesan Visual',
        learningGoal:
          'Peserta didik menguasai pemilihan font, kontras hierarki visual, dan tata letak grid portofolio desain secara komunikatif.',
        pageSize: 'Letter',
        orientation: 'lanskap',
        colorTheme: 'Biru dan cyan futuristik',
        designStyle: 'Minimalis profesional',
        illustrationStyle: 'Ilustrasi flat',
        posterSubtitle: 'Materi Presentasi Interaktif: Membangun Jiwa Estetika di Setiap Goresan Huruf'
      }));
    } else if (type === 'komik') {
      setConfig((prev) => ({
        ...prev,
        mediaType: 'komik',
        title: 'Petualangan Detektif Sains: Menyingkap Rahasia Fotosintesis',
        subject: 'Ilmu Pengetahuan Alam (IPA)',
        gradeLevel: 'Fase D (SMP Kelas 7)',
        topic: 'Fotosintesis Tumbuhan dan Pelepasan Gas Oksigen',
        learningGoal:
          'Menjelaskan peran klorofil dan sinar matahari dalam fotosintesis melalui cerita bergambar yang seru dan edukatif.',
        pageSize: 'A4',
        orientation: 'potret',
        colorTheme: 'Pastel lembut',
        designStyle: 'Kartun 2D',
        illustrationStyle: 'Kartun 2D',
        posterSubtitle: 'Komik Pembelajaran 4 Panel: Kolaborasi Sains di Laboratorium Sekolah'
      }));
    } else {
      // ilustrasi
      setConfig((prev) => ({
        ...prev,
        mediaType: 'ilustrasi',
        title: 'Visualisasi Konsep Algoritma & Jalur Logika Komputasi',
        subject: 'Informatika Dasar',
        gradeLevel: 'Fase D (SMP Kelas 7-9)',
        topic: 'Dekomposisi Masalah, Pengenalan Pola & Algoritma Berurutan',
        learningGoal:
          'Memvisualisasikan secara konkret bagaimana alur logika input-proses-output dijalankan dalam sebuah sistem terstruktur.',
        pageSize: 'A4',
        orientation: 'potret',
        colorTheme: 'Ungu kreatif',
        designStyle: 'Modern edukatif',
        illustrationStyle: 'Semi-realistis',
        posterSubtitle: 'Aset Visual Pembelajaran Berpikir Komputasional'
      }));
    }

    confetti({ particleCount: 25, spread: 45, origin: { y: 0.7 } });
  };

  // Handler for direct testing of the 8 scenarios
  const handleApplyScenario = (
    scenario:
      | 'muslimah'
      | 'umum'
      | 'tanpa-manusia'
      | 'bebas'
      | 'upload-logo'
      | 'tanpa-logo'
  ) => {
    setIsEditingPrompt(false);
    setCustomPromptText('');

    if (scenario === 'muslimah') {
      setConfig((prev) => ({
        ...prev,
        characterChoice: 'Karakter Muslimah Berhijab'
      }));
      setCopyFeedbackText('Skenario 1 Aktif: Karakter Muslimah Berhijab (Wajib Hijab Siswi & Guru)');
    } else if (scenario === 'umum') {
      setConfig((prev) => ({
        ...prev,
        characterChoice: 'Karakter Umum (Tanpa Ketentuan Hijab)'
      }));
      setCopyFeedbackText('Skenario 2 Aktif: Karakter Umum (Tanpa Kewajiban Hijab)');
    } else if (scenario === 'tanpa-manusia') {
      setConfig((prev) => ({
        ...prev,
        characterChoice: 'Karakter Tanpa Manusia'
      }));
      setCopyFeedbackText('Skenario 3 Aktif: Karakter Tanpa Manusia (Fokus Objek & Diagram Saja)');
    } else if (scenario === 'bebas') {
      setConfig((prev) => ({
        ...prev,
        characterChoice: 'Karakter Bebas Sesuai Materi'
      }));
      setCopyFeedbackText('Skenario 4 Aktif: Karakter Bebas Sesuai Materi (Adaptif AI)');
    } else if (scenario === 'upload-logo') {
      setConfig((prev) => ({
        ...prev,
        schoolLogo: SAMPLE_SCHOOL_LOGO_DATA
      }));
      setCopyFeedbackText('Skenario 5 Aktif: Logo Sekolah Terpasang (Instruksi Proteksi 100% Aktif)');
    } else if (scenario === 'tanpa-logo') {
      setConfig((prev) => ({
        ...prev,
        schoolLogo: null
      }));
      setCopyFeedbackText('Skenario 6 Aktif: Tanpa Logo Sekolah (Bebas Logo Fiktif)');
    }

    confetti({ particleCount: 20, spread: 40, origin: { y: 0.65 } });
    setTimeout(() => setCopyFeedbackText(''), 3000);
  };

  // The active prompt is automatically composed using the intelligent content generator
  const activePrompt = customPromptText || buildCompleteChatGPTMediaPrompt(config);

  // Copy prompt handler
  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(activePrompt);
      setPromptCopied(true);
      setCopyFeedbackText('Prompt desain berhasil disalin ke clipboard!');
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
      setTimeout(() => {
        setPromptCopied(false);
        setCopyFeedbackText('');
      }, 3000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = activePrompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setPromptCopied(true);
      setCopyFeedbackText('Prompt desain berhasil disalin!');
      setTimeout(() => {
        setPromptCopied(false);
        setCopyFeedbackText('');
      }, 3000);
    }
  };

  // Open ChatGPT official link
  const handleOpenChatGPT = () => {
    window.open('https://chatgpt.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="generator-media" className="relative py-20 bg-[#071426] text-white overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#2979FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-semibold tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <Sparkles className="w-4 h-4 text-[#FFD166]" />
            GENERATOR MEDIA PEMBELAJARAN
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Rancang Media Pembelajaran AI <br />
            <span className="bg-gradient-to-r from-[#00E5FF] via-[#2979FF] to-[#8B5CF6] bg-clip-text text-transparent">
              Siap Pakai untuk ChatGPT
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Hasilkan prompt desain AI terstruktur dengan <strong>konten otomatis</strong>,{' '}
            <strong>pilihan aturan karakter fleksibel</strong>, dan <strong>dukungan upload logo resmi sekolah</strong>. Cukup masukkan info dasar pembelajaran, lalu salin dan buka langsung di ChatGPT.
          </p>
        </div>


        {/* Media Type Selector Chips */}
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3 text-center sm:text-left">
            Pilih Jenis Media yang Ingin Dibuat:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {[
              { id: 'poster', label: 'Poster Edukasi', icon: FileText, desc: 'Pesan visual persuasif' },
              { id: 'infografis', label: 'Infografis Materi', icon: PieChart, desc: 'Alur konsep & data' },
              { id: 'lkpd', label: 'LKPD Siswa', icon: CheckSquare, desc: 'Lembar kerja aktivitas' },
              { id: 'sampul', label: 'Sampul Modul', icon: BookOpen, desc: 'Cover buku & ajar' },
              { id: 'presentasi', label: 'Slide Presentasi', icon: Layers, desc: 'Materi tayang kelas' },
              { id: 'komik', label: 'Komik Edukasi', icon: MessageSquare, desc: 'Cerita strip bergambar' },
              { id: 'ilustrasi', label: 'Ilustrasi Konsep', icon: ImageIcon, desc: 'Visualisasi analogi' }
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = selectedType === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLoadSample(item.id as MediaType)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-[#00E5FF]/20 to-[#2979FF]/10 border-[#00E5FF] text-white shadow-[0_0_20px_rgba(0,229,255,0.25)] scale-[1.02]'
                      : 'bg-[#0B1B31]/60 border-slate-700/60 text-slate-400 hover:border-slate-500 hover:text-slate-200 hover:bg-[#0B1B31]'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-[#00E5FF]' : 'text-slate-400'}`} />
                  <span className="text-xs font-bold leading-tight">{item.label}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">{item.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Work Area: 2 Columns (Form on left 5 cols, ChatGPT Prompt on right 7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Column 1: Config Form (5 cols) */}
          <div className="lg:col-span-5 bg-[#0B1B31]/80 backdrop-blur-md border border-[#2979FF]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#00E5FF]" />
                <h3 className="font-bold text-sm sm:text-base text-white">Parameter Media Pembelajaran</h3>
              </div>
              <button
                onClick={() => handleLoadSample(selectedType)}
                className="text-xs text-[#00E5FF] hover:text-[#FFD166] flex items-center gap-1 transition-colors cursor-pointer"
                title="Muat contoh parameter siap pakai untuk jenis media ini"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Muat Contoh
              </button>
            </div>

            {/* Indikator Data Terisi Otomatis dari Modul Ajar */}
            {importedForMedia && activeLearningData && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#0C1F38] to-[#071426] border-2 border-[#00E5FF]/60 shadow-lg space-y-2.5 animate-fade-in">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#00E5FF]/20 border border-[#00E5FF]/40 flex items-center justify-center text-[#00E5FF] shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-[#FFD166]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white">
                        Data diisi otomatis dari Modul Ajar:
                      </span>
                      <span className="text-xs font-bold text-[#00E5FF] truncate block">
                        {activeLearningData.sourceModulTitle}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Mata pelajaran, topik, jenjang, dan tujuan pembelajaran telah disinkronkan. Anda tetap bebas mengubah formulir ini.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      const inputEl = document.getElementById('media-generator-title-input');
                      if (inputEl) inputEl.focus();
                    }}
                    className="px-2.5 py-1 text-xs rounded-lg bg-[#071426] hover:bg-[#122A4E] border border-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-medium"
                  >
                    <Edit3 className="w-3 h-3 text-[#00E5FF]" />
                    <span>Edit Data</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('prompt-lab')}
                    className="px-2.5 py-1 text-xs rounded-lg bg-[#071426] hover:bg-[#122A4E] border border-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-medium"
                  >
                    <RotateCcw className="w-3 h-3 text-[#FFD166]" />
                    <span>Ganti Modul</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearModulData}
                    className="px-2.5 py-1 text-xs rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-800/60 text-red-300 hover:text-red-200 transition-colors cursor-pointer flex items-center gap-1 font-medium ml-auto"
                  >
                    <RotateCcw className="w-3 h-3 text-red-400" />
                    <span>Bersihkan Data</span>
                  </button>
                </div>
              </div>
            )}

            {/* Field: Judul */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Judul Media Pembelajaran
              </label>
              <input
                id="media-generator-title-input"
                type="text"
                value={config.title}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#071426] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
                placeholder="Misal: 5 Langkah Bijak Memanfaatkan AI"
              />
            </div>

            {/* Field: Mata Pelajaran & Jenjang */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Mata Pelajaran</label>
                <input
                  type="text"
                  value={config.subject}
                  onChange={(e) => setConfig({ ...config, subject: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-[#071426] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00E5FF]"
                  placeholder="Informatika / IPA / IPS / DKV"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Jenjang / Fase</label>
                <input
                  type="text"
                  value={config.gradeLevel}
                  onChange={(e) => setConfig({ ...config, gradeLevel: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-[#071426] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00E5FF]"
                  placeholder="Fase B (SD) / Fase D (SMP) / Fase E"
                />
              </div>
            </div>

            {/* Field: Topik Pembelajaran */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Topik / Materi Pokok</label>
              <input
                type="text"
                value={config.topic}
                onChange={(e) => setConfig({ ...config, topic: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#071426] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00E5FF]"
                placeholder="Materi spesifik yang akan divisualisasikan"
              />
            </div>

            {/* Field: Tujuan Pembelajaran */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tujuan Pembelajaran / Pesan Kunci
              </label>
              <textarea
                rows={2}
                value={config.learningGoal}
                onChange={(e) => setConfig({ ...config, learningGoal: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#071426] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00E5FF] resize-none"
                placeholder="Kemampuan atau pemahaman apa yang dicapai peserta didik?"
              />
            </div>

            {/* Smart Auto-Content Banner */}
            <div className="p-3.5 rounded-xl bg-[#071426] border border-[#00E5FF]/30 text-xs text-slate-300 space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 text-[#00E5FF] font-semibold">
                <Sparkles className="w-4 h-4 text-[#FFD166]" />
                <span>Penyusunan Konten Otomatis AI Aktif</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Anda tidak perlu mengetik poin materi secara manual. AI menyusun judul, subjudul, poin esensial, contoh nyata, aktivitas interaktif, dan tata letak secara otomatis.
              </p>
            </div>

            {/* PARAMETER BARU 1: PILIHAN KARAKTER (Dropdown) */}
            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-white flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#00E5FF]" />
                  <span>Pilihan Karakter</span>
                </label>
                <span className="text-[11px] font-medium text-[#00E5FF]">
                  {config.characterChoice === 'Karakter Muslimah Berhijab' && '🌸 Hijab Wajib'}
                  {config.characterChoice === 'Karakter Umum (Tanpa Ketentuan Hijab)' && '👥 Karakter Umum'}
                  {config.characterChoice === 'Karakter Tanpa Manusia' && '🔬 Objek/Diagram'}
                  {config.characterChoice === 'Karakter Bebas Sesuai Materi' && '✨ Karakter Adaptif'}
                </span>
              </div>

              <select
                value={config.characterChoice}
                onChange={(e) =>
                  setConfig({ ...config, characterChoice: e.target.value as CharacterChoice })
                }
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#071426] border border-[#2979FF]/50 rounded-lg text-white font-medium focus:outline-none focus:border-[#00E5FF] transition-colors"
              >
                <option value="Karakter Muslimah Berhijab">1. Karakter Muslimah Berhijab (Default)</option>
                <option value="Karakter Umum (Tanpa Ketentuan Hijab)">2. Karakter Umum (Tanpa Ketentuan Hijab)</option>
                <option value="Karakter Tanpa Manusia">3. Karakter Tanpa Manusia</option>
                <option value="Karakter Bebas Sesuai Materi">4. Karakter Bebas Sesuai Materi</option>
              </select>

              {/* Explanatory description card based on selected character */}
              <div className="p-2.5 rounded-lg bg-[#071426] border border-slate-700/70 text-[11px] leading-relaxed">
                {config.characterChoice === 'Karakter Muslimah Berhijab' && (
                  <div className="text-emerald-300 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                    <div>
                      <span className="font-semibold text-emerald-200">Karakter Muslimah Berhijab:</span>
                      <p className="text-slate-300 mt-0.5">
                        Guru dan siswi perempuan wajib mengenakan hijab rapi dan sopan. Karakter laki-laki berbusana sopan. Seluruh karakter tampil ramah dan sesuai lingkungan pendidikan.
                      </p>
                    </div>
                  </div>
                )}
                {config.characterChoice === 'Karakter Umum (Tanpa Ketentuan Hijab)' && (
                  <div className="text-cyan-300 flex items-start gap-2">
                    <Users className="w-4 h-4 shrink-0 text-[#00E5FF] mt-0.5" />
                    <div>
                      <span className="font-semibold text-cyan-200">Karakter Umum:</span>
                      <p className="text-slate-300 mt-0.5">
                        Karakter perempuan dan laki-laki mengikuti konteks dan gaya visual tanpa kewajiban hijab. Tetap berbusana sopan, santun, dan mencerminkan lingkungan pendidikan.
                      </p>
                    </div>
                  </div>
                )}
                {config.characterChoice === 'Karakter Tanpa Manusia' && (
                  <div className="text-amber-300 flex items-start gap-2">
                    <EyeOff className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-200">Karakter Tanpa Manusia:</span>
                      <p className="text-slate-300 mt-0.5">
                        Tidak menampilkan karakter manusia dalam bentuk apa pun. Fokus visual pada objek materi, ikon, diagram skematik, simbol, atau instrumen yang relevan.
                      </p>
                    </div>
                  </div>
                )}
                {config.characterChoice === 'Karakter Bebas Sesuai Materi' && (
                  <div className="text-purple-300 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 text-purple-400 mt-0.5" />
                    <div>
                      <span className="font-semibold text-purple-200">Karakter Bebas Sesuai Materi:</span>
                      <p className="text-slate-300 mt-0.5">
                        AI menentukan secara adaptif karakter yang paling tepat: manusia sopan, hewan representatif, maskot edukatif, atau objek personifikasi sesuai kebutuhan topik.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* PARAMETER BARU 2: UPLOAD LOGO SEKOLAH (OPSIONAL) */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-white flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#00E5FF]" />
                  <span>Upload Logo Sekolah (Opsional)</span>
                </label>
                {config.schoolLogo ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Logo Terlampir
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-slate-400">Tidak Wajib</span>
                )}
              </div>

              <p className="text-[11px] text-slate-400 leading-normal">
                Unggah logo sekolah jika ingin ditampilkan pada media. Bagian ini tidak wajib diisi.
                (Format: PNG, JPG, JPEG · Maks. 5MB · Disarankan PNG transparan)
              </p>

              {logoError && (
                <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{logoError}</span>
                </div>
              )}

              {/* Upload Box or Attached Preview Box */}
              {config.schoolLogo ? (
                <div className="p-3.5 rounded-xl bg-[#071426] border border-emerald-500/50 shadow-md space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg bg-[#0B1B31] border border-slate-700 flex items-center justify-center p-1 overflow-hidden shrink-0">
                      <img
                        src={config.schoolLogo.dataUrl}
                        alt="Logo Sekolah Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate" title={config.schoolLogo.fileName}>
                        {config.schoolLogo.fileName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {(config.schoolLogo.fileSize / 1024).toFixed(1)} KB ·{' '}
                        {config.schoolLogo.fileType || 'Image'}
                      </div>
                      <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Instruksi proteksi logo asli 100% aktif di prompt</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                    <label className="px-2.5 py-1 text-xs rounded-lg bg-[#0B1B31] hover:bg-[#122A4E] border border-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 text-[#00E5FF]" />
                      <span>Ganti</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="px-2.5 py-1 text-xs rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-800/60 text-red-300 hover:text-red-200 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3 text-red-400" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingLogo(true);
                  }}
                  onDragLeave={() => setIsDraggingLogo(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingLogo(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleLogoFile(e.dataTransfer.files[0]);
                    }
                  }}
                  className={`p-4 rounded-xl border-2 border-dashed text-center transition-all ${
                    isDraggingLogo
                      ? 'border-[#00E5FF] bg-[#00E5FF]/10'
                      : 'border-slate-700/80 hover:border-slate-500 bg-[#071426]/50'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-[#2979FF]/10 flex items-center justify-center text-[#00E5FF]">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-300">
                        Tarik & lepaskan file logo sekolah di sini, atau
                      </p>
                      <label className="inline-block mt-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-[#2979FF]/20 hover:bg-[#2979FF]/30 border border-[#2979FF]/40 text-[#00E5FF] cursor-pointer transition-colors">
                        Pilih File Logo
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={handleLoadSampleLogo}
                        className="text-[11px] text-slate-400 hover:text-[#FFD166] underline transition-colors cursor-pointer"
                      >
                        Gunakan Contoh Logo Sekolah (Uji Cepat)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Visual Options: Layout, Tema Warna, Gaya Desain & Ilustrasi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Format Ukuran</label>
                <select
                  value={config.pageSize}
                  onChange={(e) => setConfig({ ...config, pageSize: e.target.value as PageSize })}
                  className="w-full px-3 py-2 text-xs bg-[#071426] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00E5FF]"
                >
                  <option value="A4">A4 (Dokumen / Poster Standar)</option>
                  <option value="A3">A3 (Poster Besar)</option>
                  <option value="Letter">Letter / Slide 16:9</option>
                  <option value="A5">A5 (Buku Saku / Flyer)</option>
                  <option value="Kustom">Kustom / Persegi 1:1</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Orientasi Kertas</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setConfig({ ...config, orientation: 'potret' })}
                    className={`flex-1 py-1.5 text-xs rounded-lg border font-medium transition-colors ${
                      config.orientation === 'potret'
                        ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF]'
                        : 'bg-[#071426] border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Potret (Tegak)
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfig({ ...config, orientation: 'lanskap' })}
                    className={`flex-1 py-1.5 text-xs rounded-lg border font-medium transition-colors ${
                      config.orientation === 'lanskap'
                        ? 'bg-[#00E5FF]/20 border-[#00E5FF] text-[#00E5FF]'
                        : 'bg-[#071426] border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Lanskap (Mendatar)
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Palet Warna</label>
                <select
                  value={config.colorTheme}
                  onChange={(e) => setConfig({ ...config, colorTheme: e.target.value as ColorTheme })}
                  className="w-full px-3 py-2 text-xs bg-[#071426] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00E5FF]"
                >
                  <option value="Biru dan cyan futuristik">Biru & Cyan Futuristik</option>
                  <option value="Biru profesional">Biru Profesional Tenang</option>
                  <option value="Ungu kreatif">Ungu Kreatif Mewah</option>
                  <option value="Hijau edukatif">Hijau Edukatif / Sains</option>
                  <option value="Kuning dan oranye ceria">Kuning Ceria / Semangat</option>
                  <option value="Pastel lembut">Pastel Lembut & Ramah</option>
                  <option value="Monokrom">Monokrom Kontras Tinggi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Gaya Desain</label>
                <select
                  value={config.designStyle}
                  onChange={(e) => setConfig({ ...config, designStyle: e.target.value as DesignStyle })}
                  className="w-full px-3 py-2 text-xs bg-[#071426] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00E5FF]"
                >
                  <option value="3D Pixar">3D Pixar Style</option>
                  <option value="Kartun 2D">Kartun 2D Edukatif</option>
                  <option value="Anime">Anime Edukatif</option>
                  <option value="Flat design">Flat Design 2D</option>
                  <option value="Semi-realistis">Semi-Realistis</option>
                  <option value="Realistis">Realistis Edukatif</option>
                  <option value="Clay style">Clay Style (Plastisin 3D)</option>
                  <option value="Futuristik">Futuristik EdTech</option>
                  <option value="Modern edukatif">Modern Edukatif Bersih</option>
                  <option value="Infografis editorial">Infografis Editorial</option>
                  <option value="Minimalis profesional">Minimalis Bersih</option>
                  <option value="Geometris">Geometris Modern</option>
                  <option value="Hand-drawn">Hand-drawn Sketsa</option>
                  <option value="Fun dan ceria">Fun & Ceria</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Gaya Ilustrasi Karakter</label>
                <select
                  value={config.illustrationStyle}
                  onChange={(e) =>
                    setConfig({ ...config, illustrationStyle: e.target.value as IllustrationStyle })
                  }
                  className="w-full px-3 py-2 text-xs bg-[#071426] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00E5FF]"
                >
                  <option value="3D Pixar">3D Pixar Character</option>
                  <option value="Kartun 2D">Kartun 2D Ramah Siswa</option>
                  <option value="Anime">Anime Style</option>
                  <option value="Ilustrasi flat">Flat Vector Illustration</option>
                  <option value="Semi-realistis">Semi-Realistis</option>
                  <option value="Realistis">Realistis Manusia</option>
                  <option value="Clay style">Clay Style (Plastisin)</option>
                  <option value="Diagram">Diagram Konseptual</option>
                  <option value="Ikon">Ikon & Simbol Grafis</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Nama Satuan Pendidikan / Penyusun
                </label>
                <input
                  type="text"
                  value={config.authorOrSchool}
                  onChange={(e) => setConfig({ ...config, authorOrSchool: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-[#071426] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00E5FF]"
                  placeholder="Sekolah Penggerak Nusantara · Tim MGMP"
                />
              </div>
            </div>
          </div>

          {/* Column 2: ChatGPT Prompt Output Box (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Action Bar Header */}
            <div className="bg-[#0B1B31] border border-[#2979FF]/30 rounded-2xl p-4 sm:p-5 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-700/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#10A37F]/20 border border-[#10A37F]/40 flex items-center justify-center text-[#10A37F]">
                    <ChatGptIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2 flex-wrap">
                      <span>Prompt Desain AI Siap Pakai</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#10A37F]/20 text-[#10A37F] border border-[#10A37F]/30">
                        ChatGPT
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {config.characterChoice}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Format teruji untuk ChatGPT (GPT-4o / GPT-4.5) & DALL-E Image Generation
                    </p>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setCustomPromptText('');
                      setIsEditingPrompt(false);
                      setCopyFeedbackText('Prompt diperbarui dari formulir!');
                      setTimeout(() => setCopyFeedbackText(''), 2500);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#071426] hover:bg-[#122A4E] border border-[#00E5FF]/40 text-[#00E5FF] transition-colors cursor-pointer"
                    title="Perbarui teks prompt sesuai input formulir terbaru"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Perbarui Prompt
                  </button>

                  <button
                    onClick={() => {
                      setIsEditingPrompt(!isEditingPrompt);
                      if (!isEditingPrompt && !customPromptText) {
                        setCustomPromptText(buildCompleteChatGPTMediaPrompt(config));
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      isEditingPrompt
                        ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-[#C084FC]'
                        : 'bg-[#071426] border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    {isEditingPrompt ? 'Selesai Edit' : 'Edit Prompt'}
                  </button>
                </div>
              </div>

              {/* Status Indicator for Logo */}
              {config.schoolLogo && (
                <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <img
                      src={config.schoolLogo.dataUrl}
                      alt="Thumbnail Logo"
                      className="w-6 h-6 object-contain rounded bg-white/10 p-0.5"
                    />
                    <span>
                      Logo terpasang: <strong>{config.schoolLogo.fileName}</strong> (Instruksi proteksi visual 100% aktif di prompt)
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-semibold px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-700">
                    Presisi Mutlak
                  </span>
                </div>
              )}

              {/* Main Prompt Text Container */}
              <div className="mt-4 relative">
                {isEditingPrompt ? (
                  <textarea
                    rows={17}
                    value={customPromptText || buildCompleteChatGPTMediaPrompt(config)}
                    onChange={(e) => setCustomPromptText(e.target.value)}
                    className="w-full p-4 rounded-xl bg-[#071426] border-2 border-[#8B5CF6] text-slate-100 text-xs sm:text-sm font-mono leading-relaxed focus:outline-none resize-none shadow-inner"
                    placeholder="Tulis atau modifikasi prompt sesuai kebutuhan spesifik Anda..."
                  />
                ) : (
                  <div className="w-full h-[430px] overflow-y-auto p-4 rounded-xl bg-[#071426]/90 border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-mono leading-relaxed whitespace-pre-wrap select-all selection:bg-[#00E5FF]/30 selection:text-white shadow-inner">
                    {activePrompt}
                  </div>
                )}
              </div>

              {/* Primary Action Buttons: Copy and Open ChatGPT */}
              <div className="mt-4 pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-400 order-2 sm:order-1">
                  {copyFeedbackText ? (
                    <span className="text-[#00E5FF] font-semibold flex items-center gap-1.5 animate-pulse">
                      <Check className="w-4 h-4 text-[#00E5FF]" />
                      {copyFeedbackText}
                    </span>
                  ) : (
                    <span>Panjang prompt: {activePrompt.length} karakter</span>
                  )}
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
                  {/* Salin Prompt Button */}
                  <button
                    onClick={handleCopyPrompt}
                    className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg cursor-pointer ${
                      promptCopied
                        ? 'bg-[#10B981] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        : 'bg-gradient-to-r from-[#00E5FF] to-[#2979FF] text-[#071426] hover:brightness-110 shadow-[0_0_20px_rgba(0,229,255,0.3)]'
                    }`}
                  >
                    {promptCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Salin Prompt
                      </>
                    )}
                  </button>

                  {/* Buka di ChatGPT Button */}
                  <button
                    onClick={handleOpenChatGPT}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#10A37F] hover:bg-[#0E8E6E] text-white transition-all shadow-[0_0_20px_rgba(16,163,127,0.3)] cursor-pointer"
                  >
                    <ChatGptIcon className="w-4 h-4" />
                    Buka di ChatGPT
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </button>
                </div>
              </div>

              {/* Informative Guidance Note */}
              <div className="mt-4 p-3 rounded-xl bg-[#071426]/60 border border-slate-700/50 flex items-start gap-2.5 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-[#FFD166] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Panduan Alur Penggunaan:</span>
                  <p className="text-slate-300 mt-0.5">
                    1. Klik <strong>Salin Prompt</strong> untuk menyimpan teks instruksi ke clipboard.<br />
                    2. Klik <strong>Buka di ChatGPT</strong> (membuka tab baru di https://chatgpt.com/).<br />
                    3. Tempelkan prompt pada kolom percakapan ChatGPT. {config.schoolLogo ? (
                      <span className="text-emerald-300 font-semibold">
                        (Tips: Lampirkan juga file logo sekolah Anda agar ChatGPT / DALL-E menjadikannya referensi visual asli secara presisi).
                      </span>
                    ) : (
                      'ChatGPT / DALL-E akan langsung menyusun media pembelajaran berkualitas tinggi sesuai aturan karakter dan tata letak yang dipilih.'
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
