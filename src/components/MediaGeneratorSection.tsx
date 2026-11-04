import React, { useState } from 'react';
import {
  MediaType,
  PageSize,
  PageOrientation,
  ColorTheme,
  DesignStyle,
  IllustrationStyle,
  MediaGeneratorConfig
} from '../types/mediaGenerator';
import {
  FileText,
  PieChart,
  CheckSquare,
  BookOpen,
  Layers,
  ImageIcon,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Edit3,
  ExternalLink,
  Palette,
  Sliders,
  Type,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';

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

  // Extended config with defaults
  const [config, setConfig] = useState<MediaGeneratorConfig>({
    mediaType: 'poster',
    title: '5 Langkah Bijak Memanfaatkan AI dalam Belajar',
    subject: 'Informatika & Literasi Digital',
    gradeLevel: 'Fase D (SMP) / Fase E (SMA) · Adaptif',
    topic: 'Etika, Integritas Akademik & Keamanan Privasi AI',
    learningGoal: 'Peserta didik memahami prinsip berpikir kritis, verifikasi kebenaran informasi, dan etika saat berinteraksi dengan kecerdasan artifisial.',
    contentPoints: '1. Verifikasi Fakta: Selalu periksa kembali data penting dengan sumber terpercaya.\n2. Lindungi Privasi: Jangan pernah membagikan password, NIK, atau data pribadi ke dalam AI.\n3. Pendamping Belajar: Gunakan AI untuk berdiskusi konsep, bukan menyalin tugas secara instan.\n4. Kejujuran Akademik: Sebutkan jika ide karya dibantu oleh AI secara bertanggung jawab.\n5. Konsultasi Guru: Diskusikan hal yang meragukan bersama guru dan teman sebaya.',
    language: 'Bahasa Indonesia',
    pageSize: 'A4',
    orientation: 'potret',
    colorTheme: 'Biru dan cyan futuristik',
    designStyle: 'Futuristik',
    illustrationStyle: 'Ikon',
    typography: 'Modern Sans-Serif (Outfit / Plus Jakarta Sans)',
    authorOrSchool: 'Sekolah Penggerak Nusantara · Tim Pendidik Inspiratif',
    posterSubtitle: 'Panduan Praktis Menjadi Pelajar Digital yang Kritis, Beradab & Kreatif',
    posterMainMessage: 'Kecerdasan Artifisial adalah kompas cerdasmu. Akal budi dan nuranimu yang memegang kendali.',
    posterCallToAction: 'Ayo jadikan AI jembatan inspirasi, bukan pengganti daya berpikir kritis kita!',
    posterAdditionalInfo: 'Dipasang di Mading Sekolah, Lab Komputer & Ruang Kelas'
  });

  // Presets for different media types
  const handleLoadSample = (type: MediaType) => {
    setSelectedType(type);
    setIsEditingPrompt(false);
    setCustomPromptText('');

    if (type === 'poster') {
      setConfig({
        ...config,
        mediaType: 'poster',
        title: '5 Langkah Bijak Memanfaatkan AI dalam Belajar',
        subject: 'Informatika & Literasi Digital',
        gradeLevel: 'Fase D (SMP) / Fase E (SMA) · Adaptif',
        topic: 'Etika, Integritas Akademik & Keamanan Privasi AI',
        learningGoal: 'Peserta didik memahami prinsip berpikir kritis, verifikasi kebenaran informasi, dan etika saat berinteraksi dengan AI.',
        contentPoints: '1. Verifikasi Fakta: Selalu periksa kembali data penting dengan sumber terpercaya.\n2. Lindungi Privasi: Jangan pernah membagikan password, NIK, atau data pribadi ke dalam AI.\n3. Pendamping Belajar: Gunakan AI untuk berdiskusi konsep, bukan menyalin tugas secara instan.\n4. Kejujuran Akademik: Sebutkan jika ide karya dibantu oleh AI secara bertanggung jawab.\n5. Konsultasi Guru: Diskusikan hal yang meragukan bersama guru dan teman sebaya.',
        pageSize: 'A4',
        orientation: 'potret',
        colorTheme: 'Biru dan cyan futuristik',
        designStyle: 'Futuristik',
        illustrationStyle: 'Ikon',
        posterSubtitle: 'Panduan Praktis Menjadi Pelajar Digital yang Kritis, Beradab & Kreatif',
        posterMainMessage: 'Kecerdasan Artifisial adalah kompas cerdasmu. Akal budi dan nuranimu yang memegang kendali.',
        posterCallToAction: 'Ayo jadikan AI jembatan inspirasi, bukan pengganti daya berpikir kritis kita!',
        posterAdditionalInfo: 'Dipasang di Mading Sekolah, Lab Komputer & Ruang Kelas'
      });
    } else if (type === 'infografis') {
      setConfig({
        ...config,
        mediaType: 'infografis',
        title: 'Siklus Aliran Energi & Jaring-Jaring Makanan',
        subject: 'Ilmu Pengetahuan Alam (IPA)',
        gradeLevel: 'Fase D (Kelas 7-8)',
        topic: 'Interaksi Antarmakhluk Hidup & Keseimbangan Ekosistem',
        learningGoal: 'Peserta didik mampu menganalisis perpindahan energi dari produsen, konsumen bertingkat, hingga pengurai dalam menjaga kestabilan biosfer.',
        contentPoints: 'Tingkat 1: Matahari memancarkan energi foton kepada produsen (tumbuhan hijau/fitoplankton).\nTingkat 2: Herbivora mengonsumsi produsen dengan efisiensi transfer energi sekitar 10%.\nTingkat 3: Karnivora dan predator memangsa konsumen primer dalam jaring interaktif.\nTingkat 4: Dekomposer (jamur & bakteri) menguraikan materi organik kembali ke tanah dan air.',
        pageSize: 'A4',
        orientation: 'potret',
        colorTheme: 'Hijau edukatif',
        designStyle: 'Infografis editorial',
        illustrationStyle: 'Diagram',
        infographicType: 'Infografis proses',
        infographicConclusion: 'Runtuhnya satu spesies kunci dapat merusak stabilitas seluruh rantai kehidupan ekosistem.',
        infographicSourceReference: 'Buku Guru & Siswa IPA Kurikulum Merdeka Kemendikbudristek 2024'
      });
    } else if (type === 'lkpd') {
      setConfig({
        ...config,
        mediaType: 'lkpd',
        title: 'LKPD Eksperimen: Menyelidiki Fotosintesis & Oksigen',
        subject: 'IPA / Biologi Terapan',
        gradeLevel: 'Fase D / E (SMP - SMA)',
        topic: 'Percobaan Ingenhousz pada Tumbuhan Air Hydrilla',
        learningGoal: 'Membuktikan produksi gas oksigen selama reaksi fotosintesis di bawah variasi intensitas pencahayaan.',
        contentPoints: 'Alat & Bahan: Corong kaca, tabung reaksi, beker glass 1000ml, kawat penyangga, tumbuhan Hydrilla verticillata, air bersih, soda kue (NaHCO3), dan sumber sinar matahari.\nLangkah Kerja: Rangkai alat, amati jumlah gelembung per 5 menit, bandingkan tempat terang vs tempat teduh.\nPertanyaan: Gas apa yang terbentuk? Faktor apa yang mempercepat gelembung?',
        pageSize: 'A4',
        orientation: 'potret',
        colorTheme: 'Biru profesional',
        designStyle: 'Modern edukatif',
        illustrationStyle: 'Ikon',
        lkpdType: 'Eksperimen atau praktik',
        lkpdAnswerSpaceFormat: 'Tabel Isian'
      });
    } else if (type === 'sampul') {
      setConfig({
        ...config,
        mediaType: 'sampul',
        title: 'MODUL AJAR: MENJELAJAH SAMUDRA KECERDASAN BUATAN',
        subject: 'Informatika & Proyek Penguatan Profil Pelajar Pancasila',
        gradeLevel: 'Fase E (Kelas 10 SMA/SMK)',
        topic: 'Panduan Pembelajaran Berdiferensiasi & Integrasi AI Produktif',
        learningGoal: 'Membimbing siswa membangun nalar komputasional, literasi prompt rekayasa, dan penciptaan karya kreatif digital.',
        contentPoints: 'Bagian I: Fondasi Kecerdasan Artifisial & Etika Digital\nBagian II: Rekayasa Prompt Efektif dengan Formula 7P\nBagian III: Proyek Inovasi Solusi Masalah di Lingkungan Sekolah\nBagian IV: Asesmen Otentik & Rubrik Refleksi Siswa',
        pageSize: 'A4',
        orientation: 'potret',
        colorTheme: 'Biru dan cyan futuristik',
        designStyle: 'Futuristik',
        illustrationStyle: 'Ilustrasi vektor',
        posterSubtitle: 'Edisi Guru Penggerak · Dilengkapi Aktivitas Kolaboratif & Lembar Kerja'
      });
    } else if (type === 'presentasi') {
      setConfig({
        ...config,
        mediaType: 'presentasi',
        title: 'Revolusi Pembelajaran Berbasis AI: Dari Guru Pengajar ke Fasilitator Kreatif',
        subject: 'Pengembangan Keprofesian Berkelanjutan (PKB)',
        gradeLevel: 'Komunitas Belajar Guru / Workshop Pendidik',
        topic: 'Transformasi Pedagogik Abad ke-21 dengan Alat Bantu AI Generatif',
        learningGoal: 'Pendidik mampu memanfaatkan AI untuk merancang asesmen berdiferensiasi, media pembelajaran adaptif, dan manajemen waktu yang lebih efisien.',
        contentPoints: 'Slide 1: Realitas Kelas Abad 21 & Mengapa AI Bukan Pengganti Guru\nSlide 2: Tiga Pilar Guru AI: Prompt Cerdas, Kurasi Humanis, Refleksi Kritis\nSlide 3: Contoh Praktik Baik: Pembuatan Rencana Pembelajaran 10 Menit\nSlide 4: Simulasi Game Edukasi Interaktif Berbasis Skenario\nSlide 5: Rencana Aksi Nyata di Satuan Pendidikan Masing-Masing',
        pageSize: 'Letter',
        orientation: 'lanskap',
        colorTheme: 'Biru dan cyan futuristik',
        designStyle: 'Futuristik',
        illustrationStyle: 'Diagram',
        posterSubtitle: 'Materi Workshop Interaktif 3 Jam Komunitas Pendidik Hebat'
      });
    } else {
      // ilustrasi
      setConfig({
        ...config,
        mediaType: 'ilustrasi',
        title: 'Visualisasi Konsep Algoritma & Jalur Logika Komputasi',
        subject: 'Informatika Dasar',
        gradeLevel: 'Fase D (SMP Kelas 7-9)',
        topic: 'Dekomposisi Masalah, Pengenalan Pola & Algoritma Berurutan',
        learningGoal: 'Memvisualisasikan secara konkret bagaimana alur logika input-proses-output dijalankan dalam sebuah sistem terstruktur.',
        contentPoints: 'Elemen 1: Titik Awal (Input Data) digambarkan sebagai aliran energi data terstruktur.\nElemen 2: Gerbang Keputusan (Kondisi If-Else) dengan percabangan jalur pilihan yang jelas.\nElemen 3: Siklus Perulangan (Looping) berputar dinamis dengan indikator kondisi terminasi.\nElemen 4: Output Akhir berupa kristal solusi atau data terverifikasi yang rapi.',
        pageSize: 'A4',
        orientation: 'potret',
        colorTheme: 'Ungu kreatif',
        designStyle: 'Modern edukatif',
        illustrationStyle: 'Ilustrasi semi-realistis',
        posterSubtitle: 'Aset Visual Pembelajaran Berpikir Komputasional'
      });
    }
  };

  // Helper: Detailed description for selected color theme
  const getColorThemeDetail = (theme: ColorTheme, custom?: { primary: string; secondary: string; accent: string }): string => {
    switch (theme) {
      case 'Biru profesional':
        return `Dominan Biru Tua Formal (Navy / Slate Blue) dengan warna pendukung Biru Muda Bersih dan aksen Putih/Abu-abu Terang. Memberikan kesan akademis, tenang, dan berwibawa.`;
      case 'Biru dan cyan futuristik':
        return `Dominan Midnight Navy Gelap (#071426) dengan aksen bercahaya Electric Blue (#2979FF) dan Neon Cyan (#00E5FF), serta aksen sorotan Kuning (#FFD166).`;
      case 'Ungu kreatif':
        return `Dominan Deep Violet dan Ungu Kreatif dengan aksen Lavender, Lilac, dan Emas Lembut. Memberikan kesan imajinatif, inovatif, dan premium.`;
      case 'Hijau edukatif':
        return `Dominan Hijau Hutan (Forest Green / Emerald) dengan aksen Hijau Daun Segar, Mint, dan Kuning Alami. Sangat cocok untuk tema sains, alam, dan lingkungan hidup.`;
      case 'Kuning dan oranye ceria':
        return `Dominan Oranye Ceria dan Kuning Hangat dengan aksen Coral dan Amber. Memberikan nuansa energik, optimis, dan memotivasi belajar peserta didik.`;
      case 'Pastel lembut':
        return `Palet warna-warna pastel yang ramah anak dan lembut di mata (Soft Baby Blue, Sage Mint, Pale Peach, dan Krem Lembut) dengan latar belakang terang bersih.`;
      case 'Monokrom':
        return `Kombinasi Hitam, Putih, dan Skala Abu-abu Netral dengan kontras tajam. Tampilan minimalis, tegas, dan mudah dibaca pada dokumen cetak standar.`;
      case 'Warna sekolah':
        return `Menggunakan kombinasi warna identitas resmi sekolah / madrasah yang formal, tertib, dan memiliki keterbacaan tinggi.`;
      case 'Kustom':
        return custom
          ? `Warna Utama: ${custom.primary}, Warna Pendukung: ${custom.secondary}, Warna Aksen: ${custom.accent}. Gunakan proporsi 60-30-10 untuk keseimbangan visual.`
          : `Kombinasi palet warna kustom pilihan pengguna dengan kontras tinggi yang nyaman dibaca.`;
      default:
        return `${theme} dengan kontras tinggi dan kenyamanan visual bagi peserta didik.`;
    }
  };

  // Helper: Detailed description for selected design style
  const getDesignStyleDetail = (style: DesignStyle): string => {
    switch (style) {
      case 'Minimalis profesional':
        return `Gaya Minimalis Profesional — Tata letak sangat bersih, ruang negatif (white space) yang lega dan lapang, tanpa hiasan ornamen berlebihan. Menomorsatukan kejelasan tipografi, hierarki judul, dan kemudahan navigasi baca.`;
      case 'Futuristik':
        return `Gaya Futuristik — Elemen grafis modern bernuansa teknologi, kartu informasi dengan sudut halus, garis batas tipis yang rapi, dan aksen visual kontemporer.`;
      case 'Modern edukatif':
        return `Gaya Modern Edukatif — Desain ramah siswa yang bersih dan terstruktur. Menggunakan kartu modul berbingkai halus, ikon pemantik, dan jarak baris yang nyaman untuk pembelajaran di kelas.`;
      case 'Infografis editorial':
        return `Gaya Infografis Editorial — Pendekatan majalah edukasi terstruktur dengan blok perbandingan, diagram alur, penanda data visual, dan tipografi editorial yang elegan.`;
      case 'Ilustrasi kartun':
        return `Gaya Ilustrasi Kartun — Visual yang ceria, bersahabat, penuh warna, dan ekspresif. Sangat cocok untuk membangun antusiasme belajar siswa.`;
      case 'Flat design':
        return `Gaya Flat Design 2D — Visual dua dimensi dengan bidang warna solid, ikon grafis tegas, tanpa bayangan atau gradien berlebihan, mengedepankan efisiensi informasi.`;
      case 'Hand-drawn':
        return `Gaya Hand-Drawn / Sketsa Tangan — Aksen coretan ilustratif yang hangat, organik, bersahaja, dan terasa humanis layaknya catatan belajar visual guru.`;
      case 'Geometris':
        return `Gaya Geometris — Komposisi berbasis bentuk-bentuk geometris presisi (lingkaran, bujur sangkar, poligon) yang teratur, proporsional, dan dinamis.`;
      case 'Majalah pendidikan':
        return `Gaya Majalah Pendidikan — Tata letak artikel majalah cetak dengan headline yang kuat, kolom kisi-kisi rapi, dan kutipan pemantik (pull-quote) yang menarik perhatian.`;
      case 'Fun dan ceria':
        return `Gaya Fun & Ceria — Pendekatan visual penuh kegembiraan dengan sudut melengkung besar, warna-warni positif, dan ikonografi ramah anak.`;
      case 'Formal untuk sekolah':
        return `Gaya Formal Satuan Pendidikan — Tata letak resmi institusional, simetris, berwibawa, tertib, dan sesuai standar dokumen kedinasan/sekolah.`;
      default:
        return `${style} yang disesuaikan secara proporsional dengan tujuan materi dan karakteristik peserta didik.`;
    }
  };

  // Helper: Layout instruction based on media type & orientation
  const getLayoutGuidance = (type: MediaType, orientation: PageOrientation, size: PageSize): string => {
    const orientText = orientation === 'potret' ? 'Potret (Vertikal)' : 'Lanskap (Horizontal)';
    switch (type) {
      case 'poster':
        return `- Tata Letak Poster Edukasi (${orientText} - Format ${size}):
  * Area Atas (Header): Judul utama berukuran besar, tebal, dan sangat kontras. Terbaca jelas dari jarak pandang 2-3 meter.
  * Area Tengah (Body): Komposisi seimbang yang membagi poin-poin materi ke dalam kartu informasi atau visualisasi sentral yang mudah ditelusuri.
  * Area Bawah (Footer): Pesan ajakan (call-to-action) yang tegas, identitas penyusun, dan informasi penerbitan sekolah.`;
      case 'infografis':
        return `- Tata Letak Infografis Pembelajaran (${orientText} - Format ${size}):
  * Alur Visual: Susun informasi secara hierarkis dan kronologis (alur proses bernomor, komparasi berdampingan, atau daftar terstruktur).
  * Pemisahan Bagian: Gunakan garis pemisah halus atau kartu berlatar kontras lembut untuk mengelompokkan setiap langkah konsep.
  * Ringkasan & Sumber: Sertakan kesimpulan penting dan rujukan sumber belajar di bagian akhir.`;
      case 'lkpd':
        return `- Tata Letak Lembar Kerja Peserta Didik / LKPD (${orientText} - Format ${size}):
  * Kop Dokumen: Header formal LKPD lengkap dengan kolom identitas siswa (Nama Siswa / Kelompok, Kelas, Tanggal, dan Nilai).
  * Petunjuk & Langkah Kerja: Instruksi pengerjaan bernomor tegas dengan tata letak rapi.
  * Ruang Jawaban Siswa: Sediakan area pengerjaan lapang (kotak berbingkai atau garis-garis isian) yang siap dicetak dan ditulis langsung oleh siswa.
  * Refleksi & Kriteria: Bagian penutup memuat pertanyaan refleksi diri dan rubrik penilaian ringkas.`;
      case 'sampul':
        return `- Tata Letak Sampul Modul / Bahan Ajar (${orientText} - Format ${size}):
  * Komposisi Sampul: 1/3 bagian atas memuat judul modul dan mata pelajaran secara megah dan elegan.
  * Visual Sentral: Area tengah didedikasikan untuk ilustrasi utama yang mencerminkan inti materi.
  * Area Bawah: Nama penulis, jenjang/fase, logo atau nama satuan pendidikan, dan tahun ajar.`;
      case 'presentasi':
        return `- Tata Letak Slide Presentasi (${orientText} - Format Aspek Rasio Layar 16:9):
  * Komposisi Slide: Ruang negatif lega dengan aturan "satu konsep utama per slide".
  * Struktur: Headline di sudut atas, visual diagram atau analogi di sisi utama, dan 3-4 poin ringkas penjelas di sisi pelengkap.
  * Keterbacaan Layar: Ukuran huruf besar yang nyaman dibaca oleh seluruh siswa di ruang kelas melalui proyektor/layar digital.`;
      case 'ilustrasi':
        return `- Tata Letak Ilustrasi Konsep (${orientText} - Format ${size}):
  * Komposisi Terpusat: Fokus visual pada objek atau analogi konseptual yang sedang dijelaskan.
  * Label Penjelas: Keterangan bagian-bagian elemen penting ditata dengan garis penunjuk (callout line) yang bersih dan tidak menutupi gambar.`;
      default:
        return `- Tata Letak: Proporsional, terstruktur rapi, dan disesuaikan dengan format ${size} ${orientText}.`;
    }
  };

  // Helper: Detect if user explicitly requested octopus mascot
  const checkOctopusRequest = (): boolean => {
    const combinedText = `
      ${config.title}
      ${config.topic}
      ${config.learningGoal}
      ${config.contentPoints}
      ${config.authorOrSchool}
      ${config.posterSubtitle || ''}
      ${config.posterMainMessage || ''}
      ${config.posterCallToAction || ''}
      ${config.posterAdditionalInfo || ''}
      ${config.designStyle}
      ${config.illustrationStyle}
    `.toLowerCase();

    return combinedText.includes('gurita') || combinedText.includes('octopus');
  };

  // Build the comprehensive ChatGPT prompt strictly following user inputs
  const buildAiDesignPrompt = (): string => {
    const mediaNameMap: Record<MediaType, string> = {
      poster: 'POSTER EDUKASI VISUAL',
      infografis: 'INFOGRAFIS PEMBELAJARAN TERSTRUKTUR',
      lkpd: 'LEMBAR KERJA PESERTA DIDIK (LKPD) KREATIF',
      sampul: 'SAMPUL BUKU / MODUL AJAR RESMI',
      presentasi: 'SLIDE / DECK PRESENTASI KELAS INTERAKTIF',
      ilustrasi: 'ILUSTRASI KONSEP EDUKASI & ANALOGI VISUAL'
    };

    const ratioMap: Record<PageOrientation, string> = {
      potret: 'Potret (Vertikal)',
      lanskap: 'Lanskap (Horizontal - Layar Lebar)'
    };

    const isOctopusExplicitlyRequested = checkOctopusRequest();

    return `Bertindaklah sebagai Senior Graphic Designer, Art Director, dan Ahli Desain Media Pembelajaran Profesional.

Saya ingin Anda merancang desain media pembelajaran berkualitas tinggi yang sepenuhnya mengikuti spesifikasi, gaya visual, palet warna, dan tata letak yang telah ditentukan di bawah ini.

==================================================
1. IDENTITAS & SPESIFIKASI MEDIA
==================================================
- Jenis Media: ${mediaNameMap[config.mediaType]}
- Judul Utama: "${config.title}"
- Subjudul / Tagline: "${config.posterSubtitle || config.topic}"
- Mata Pelajaran: ${config.subject}
- Sasaran / Jenjang: ${config.gradeLevel}
- Topik / Materi Pembelajaran: ${config.topic}
- Lembaga / Penyusun: ${config.authorOrSchool}
- Format & Ukuran: ${config.pageSize} (${ratioMap[config.orientation]})

==================================================
2. TUJUAN & PESAN INTI PEMBELAJARAN
==================================================
- Tujuan Pembelajaran:
  "${config.learningGoal}"
- Pesan Utama / Ajakan:
  "${config.posterMainMessage || config.posterCallToAction || 'Sajikan materi secara menarik, mudah dipahami siswa, dan menumbuhkan rasa ingin tahu.'}"

==================================================
3. KONTEN & TEKS YANG HARUS DICANTUMKAN
==================================================
${config.contentPoints}

==================================================
4. PANDUAN GAYA VISUAL, WARNA & TATA LETAK
==================================================
- Gaya Desain yang Dipilih Pengguna:
  ${getDesignStyleDetail(config.designStyle)}

- Gaya Ilustrasi:
  ${config.illustrationStyle}

- Palet Warna yang Dipilih Pengguna:
  ${getColorThemeDetail(config.colorTheme, config.customColors)}

- Tata Letak & Komposisi:
${getLayoutGuidance(config.mediaType, config.orientation, config.pageSize)}

- Tipografi & Hierarki Visual:
  * Gaya Tipografi: ${config.typography}
  * Judul: Menonjol, tebal, dan mudah dibaca secara instan.
  * Subjudul: Ukuran sedang yang melengkapi judul dengan warna harmonis.
  * Isi / Teks Penjelas: Ukuran nyaman dibaca, spasi teratur, kontras tinggi terhadap latar belakang, hindari teks bertumpuk atau terpotong.

- Elemen Ilustrasi & Karakter:
  ${
    isOctopusExplicitlyRequested
      ? 'Sertakan karakter/maskot gurita edukasi yang ramah dan inspiratif sesuai permintaan spesifik pengguna.'
      : `Fokuskan ilustrasi dan aset visual secara eksklusif pada objek/konsep materi "${config.topic}". PENTING: JANGAN menambahkan maskot gurita, karakter hewan kartun, atau elemen logo yang tidak diminta secara eksplisit oleh pengguna.`
  }

==================================================
5. INSTRUKSI EKSEKUSI UNTUK CHATGPT
==================================================
1. JIKA ANDA MEMILIKI FITUR PEMBUATAN GAMBAR (DALL-E / IMAGE GENERATION TOOL):
   Tolong buatkan visual desain utama sesuai seluruh spesifikasi, gaya visual "${config.designStyle}", dan palet warna "${config.colorTheme}" di atas sekarang juga dengan resolusi tinggi, rasio aspek ${config.pageSize} ${ratioMap[config.orientation]}, bebas typo, dan komposisi yang seimbang antara teks dengan visual pendukung.

2. JIKA ANDA MEMBERIKAN PANDUAN DESAIN / TATA LETAK TEKS:
   - Berikan blueprint wireframe tata letak dari atas ke bawah.
   - Uraikan hierarki penempatan setiap blok teks, kartu konten, dan ilustrasi pendukung.
   - Sertakan rekomendasi spesifikasi font, kode warna HEX pelengkap, dan tip penataan di Canva / software desain.
   - Pastikan Bahasa Indonesia yang digunakan baku, komunikatif, dan ramah bagi dunia pendidikan.`;
  };

  const activePrompt = customPromptText || buildAiDesignPrompt();

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

  // Open ChatGPT
  const handleOpenChatGPT = () => {
    window.open('https://chatgpt.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="generator-media" className="relative py-20 bg-[#071426] text-white overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#2979FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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
            Hasilkan prompt rekayasa desain presisi tinggi untuk Poster, Infografis, LKPD, Sampul Modul, Slide Presentasi, dan Ilustrasi Konsep. Salin prompt dalam satu klik dan langsung kreasikan di ChatGPT.
          </p>
        </div>

        {/* Media Type Selector Chips */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3 text-center sm:text-left">
            Pilih Jenis Media yang Ingin Dibuat:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {[
              { id: 'poster', label: 'Poster Edukasi', icon: FileText, desc: 'Pesan visual persuasif' },
              { id: 'infografis', label: 'Infografis Materi', icon: PieChart, desc: 'Alur konsep & data' },
              { id: 'lkpd', label: 'LKPD Siswa', icon: CheckSquare, desc: 'Lembar kerja aktivitas' },
              { id: 'sampul', label: 'Sampul Modul', icon: BookOpen, desc: 'Cover buku & ajar' },
              { id: 'presentasi', label: 'Slide Presentasi', icon: Layers, desc: 'Materi tayang kelas' },
              { id: 'ilustrasi', label: 'Ilustrasi Konsep', icon: ImageIcon, desc: 'Visualisasi analogi' },
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
          <div className="lg:col-span-5 bg-[#0B1B31]/80 backdrop-blur-md border border-[#2979FF]/20 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
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

            {/* Field: Judul */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Judul Media Pembelajaran <span className="text-[#FFD166]">*</span>
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#071426] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00E5FF] transition-colors"
                placeholder="Misal: 5 Langkah Bijak Mengarungi Samudra AI"
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
                  placeholder="Informatika / IPA / IPS"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Jenjang / Fase</label>
                <input
                  type="text"
                  value={config.gradeLevel}
                  onChange={(e) => setConfig({ ...config, gradeLevel: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-[#071426] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00E5FF]"
                  placeholder="Fase D (SMP) / Fase E (SMA)"
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

            {/* Field: Poin-Poin Konten Utama */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Poin-Poin Konten Utama (Teks yang Harus Tampil) <span className="text-[#FFD166]">*</span>
              </label>
              <textarea
                rows={4}
                value={config.contentPoints}
                onChange={(e) => setConfig({ ...config, contentPoints: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#071426] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00E5FF] resize-none font-mono"
                placeholder="1. Poin pertama...&#10;2. Poin kedua...&#10;3. Poin ketiga..."
              />
            </div>

            {/* Visual Options: Layout, Tema Warna, Gaya Desain */}
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
                  <option value="Futuristik">Futuristik EdTech</option>
                  <option value="Modern edukatif">Modern Edukatif Bersih</option>
                  <option value="Infografis editorial">Infografis Editorial</option>
                  <option value="Ilustrasi kartun">Kartun Ramah Siswa</option>
                  <option value="Minimalis profesional">Minimalis Bersih</option>
                  <option value="Geometris">Geometris Modern</option>
                </select>
              </div>
            </div>

            {/* Field: Satuan Pendidikan */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Satuan Pendidikan / Penyusun</label>
              <input
                type="text"
                value={config.authorOrSchool}
                onChange={(e) => setConfig({ ...config, authorOrSchool: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#071426] border border-slate-700 rounded-lg text-white focus:outline-none focus:border-[#00E5FF]"
                placeholder="Sekolah Penggerak Nusantara · Tim MGMP"
              />
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
                    <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                      Prompt Desain AI Siap Pakai
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#10A37F]/20 text-[#10A37F] border border-[#10A37F]/30">
                        ChatGPT
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Dirancang khusus untuk ChatGPT (GPT-4o / GPT-4.5) & DALL-E Image Generation
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
                        setCustomPromptText(buildAiDesignPrompt());
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

              {/* Main Prompt Text Container */}
              <div className="mt-4 relative">
                {isEditingPrompt ? (
                  <textarea
                    rows={17}
                    value={customPromptText || buildAiDesignPrompt()}
                    onChange={(e) => setCustomPromptText(e.target.value)}
                    className="w-full p-4 rounded-xl bg-[#071426] border-2 border-[#8B5CF6] text-slate-100 text-xs sm:text-sm font-mono leading-relaxed focus:outline-none resize-none shadow-inner"
                    placeholder="Tulis atau modifikasi prompt sesuai kebutuhan spesifik Anda..."
                  />
                ) : (
                  <div className="w-full h-[400px] overflow-y-auto p-4 rounded-xl bg-[#071426]/90 border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-mono leading-relaxed whitespace-pre-wrap select-all selection:bg-[#00E5FF]/30 selection:text-white shadow-inner">
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
                  <span className="font-semibold text-white">Cara Menggunakan:</span>
                  <span className="text-slate-300 ml-1">
                    Klik <strong>Salin Prompt</strong>, lalu klik <strong>Buka di ChatGPT</strong> (akan membuka tab baru). Tempelkan prompt ke kolom obrolan ChatGPT. Jika Anda menggunakan ChatGPT Plus atau model dengan kapabilitas DALL-E, ChatGPT akan langsung melukis visual media pembelajaran beresolusi tinggi untuk Anda!
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
