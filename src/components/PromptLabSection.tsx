import React, { useState } from 'react';
import { ModulAjarFormInput, ModulAjarDocument, PedagogicalPractice } from '../types';
import { generateCompleteModulAjar } from '../utils/modulAjarGenerator';
import { exportModulToWord } from '../utils/modulAjarExporter';
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
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PromptLabSection: React.FC = () => {
  // Input parameters state
  const [formInput, setFormInput] = useState<ModulAjarFormInput>({
    schoolName: 'Sekolah Penggerak Nusantara',
    principalName: 'Drs. H. Mulyadi, M.Pd.',
    teacherName: 'Siti Rahmawati, S.Pd.',
    subject: 'IPA & Literasi Sains',
    materi: 'Ekosistem & Keanekaragaman Hayati',
    topic: 'Interaksi Antarmakhluk Hidup dan Jaring-Jaring Makanan',
    learningOutcomeCP: 'Peserta didik mampu mengidentifikasi interaksi antarmakhluk hidup dan lingkungannya, merancang upaya pencegahan kerusakan ekosistem, serta menyajikan hasil penyelidikan jaring-jaring makanan secara mandiri dan kritis.',
    element: 'Pemahaman Sains & Keterampilan Proses',
    gradeLevel: 'Fase D (Kelas 7-9) · Lintas Jenjang Adaptif',
    semester: '1 (Ganjil)',
    timeAllocation: '2 JP (80 Menit)',
    pedagogicalPractice: 'Problem Based Learning (PBL)',
    customPedagogicalPractice: '',
    studentCharacteristics: 'Mayoritas peserta didik memiliki gaya belajar visual dan kinestetik, senang berdiskusi dalam kelompok kecil, dan antusias dengan studi kasus lingkungan sekitar.',
    priorKnowledge: 'Telah memahami pengertian produsen dan konsumen sederhana pada pembelajaran sebelumnya.',
    facilitiesAndTools: 'LCD Proyektor, LKPD cetak, kartu pengamatan, dan lingkungan taman sekolah.',
    specialLearningNeeds: 'Tersedia materi pengayaan kartu bergambar bagi siswa yang butuh akselerasi serta bimbingan intensif untuk siswa yang membutuhkan pendampingan.',
    learningApproach: 'Student-Centered Learning (Berpusat pada Peserta Didik)',
    teacherNotes: 'Prioritaskan pengamatan langsung jaring-jaring makanan di kolam/taman sekolah.'
  });

  const [generatedDoc, setGeneratedDoc] = useState<ModulAjarDocument | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [activeDocSection, setActiveDocSection] = useState<string>('sec-1');
  const [copied, setCopied] = useState<boolean>(false);
  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);
  const [isExportingWord, setIsExportingWord] = useState<boolean>(false);

  const handleFillSample = () => {
    setFormInput({
      schoolName: 'Sekolah Penggerak Mandiri',
      principalName: 'Bambang Sudarsono, M.Pd.',
      teacherName: 'Ratna Suminar, S.Pd., Gr.',
      subject: 'Informatika',
      materi: 'Berpikir Komputasional',
      topic: 'Dekomposisi & Pengenalan Pola untuk Pemecahan Masalah',
      learningOutcomeCP: 'Peserta didik mampu menerapkan berpikir komputasional untuk menghasilkan banyak solusi dari persoalan dengan data diskrit bervolume kecil serta mendisposisikan berpikir komputasional dalam bidang lain.',
      element: 'Berpikir Komputasional (BK)',
      gradeLevel: 'Fase D / E (Kelas 7-10)',
      semester: '1 (Ganjil)',
      timeAllocation: '2 JP (80 Menit)',
      pedagogicalPractice: 'Problem Based Learning (PBL)',
      customPedagogicalPractice: '',
      studentCharacteristics: 'Peserta didik aktif berinteraksi dengan gawai, senang tantangan teka-teki logika, dan memiliki rasa ingin tahu tinggi.',
      priorKnowledge: 'Mengenal konsep instruksi langkah demi langkah sederhana.',
      facilitiesAndTools: 'Laboratorium Komputer / Kartu Permainan Logika Unplugged.',
      specialLearningNeeds: 'Aktivitas dapat dilakukan secara unplugged (tanpa komputer) jika listrik terkendala.',
      learningApproach: 'Pembelajaran Kontekstual & Game Based',
      teacherNotes: 'Gunakan studi kasus pembagian rute kurir pengantar paket di kota Surabaya.'
    });
    setErrorMsg('');
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

    // Simulate generation process with deep pedagogical synthesis
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
    }, 800);
  };

  const handleCopyText = () => {
    if (!generatedDoc) return;
    const plainText = `MODUL AJAR KURIKULUM MERDEKA\n${generatedDoc.informasiUmum.mataPelajaran} - ${generatedDoc.informasiUmum.topikPembelajaran}\n\nBAGIAN I. INFORMASI UMUM\nSekolah: ${generatedDoc.informasiUmum.namaSekolah}\nPenyusun: ${generatedDoc.informasiUmum.namaPenyusun}\nAlokasi: ${generatedDoc.informasiUmum.alokasiWaktu}\n\nBAGIAN II. CAPAIAN PEMBELAJARAN\n${generatedDoc.identifikasiDanDesain.capaianPembelajaran}\n\nBAGIAN III. LANGKAH-LANGKAH PEMBELAJARAN\n${generatedDoc.langkahPembelajaran.kegiatanAwal.map(k => `[Awal] ${k.activity} (${k.timeAllocation})`).join('\n')}\n${generatedDoc.langkahPembelajaran.kegiatanInti.map(k => `[Inti] ${k.activity} (${k.timeAllocation})`).join('\n')}\n${generatedDoc.langkahPembelajaran.kegiatanPenutup.map(k => `[Penutup] ${k.activity} (${k.timeAllocation})`).join('\n')}\n\nMengetahui,\nKepala Sekolah: ${generatedDoc.pengesahan.namaKepalaSekolah}\n\nPenyusun: ${generatedDoc.pengesahan.namaPenyusun}`;

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

  return (
    <section id="prompt-lab" className="py-20 md:py-28 relative bg-[#071426] border-t border-[#2979FF]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00E5FF]">
              <FileText className="w-4 h-4 text-[#00E5FF]" />
              <span>Prompt Lab · Generator Modul Ajar Kurikulum Mendalam</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Generator Modul Ajar Profesional
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              Hasilkan draf dokumen Modul Ajar Kurikulum Merdeka yang lengkap, mendalam, berlandaskan Capaian Pembelajaran, dilengkapi tabel pembelajaran 5 kolom, asesmen, rubrik, dan siap diunduh dalam format <strong className="text-white">Word (.docx)</strong> dan <strong className="text-white">PDF (.pdf)</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleFillSample}
              className="px-3.5 py-2 text-xs font-semibold text-[#00E5FF] bg-[#0E223D] hover:bg-[#122A4E] border border-[#00E5FF]/30 rounded-xl transition-colors cursor-pointer"
            >
              Isi Contoh Parameter
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
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00E5FF]" />
                <span>Parameter Kurikulum & Pembelajaran</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Pastikan data sekolah dan CP diisi persis sesuai dokumen resmi
              </p>
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
                  II. Substansi Mata Pelajaran
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Mata Pelajaran *</label>
                    <input
                      type="text"
                      required
                      value={formInput.subject}
                      onChange={(e) => setFormInput({ ...formInput, subject: e.target.value })}
                      placeholder="IPA, Matematika, dll."
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
                      placeholder="Contoh: Ekosistem"
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Topik Spesifik Pembelajaran *</label>
                  <input
                    type="text"
                    required
                    value={formInput.topic}
                    onChange={(e) => setFormInput({ ...formInput, topic: e.target.value })}
                    placeholder="Contoh: Jaring-Jaring Makanan & Keseimbangan Lingkungan"
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
                    placeholder="Salin teks CP resmi di sini..."
                    className="w-full p-2.5 rounded-xl bg-[#071426] border border-slate-700 text-xs text-slate-200 focus:border-[#00E5FF] focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-medium">Elemen *</label>
                    <input
                      type="text"
                      required
                      value={formInput.element}
                      onChange={(e) => setFormInput({ ...formInput, element: e.target.value })}
                      placeholder="Contoh: Pemahaman IPA"
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
                      placeholder="Contoh: Fase D (Kelas 7-9) / Fase E (Kelas 10) / Fase B (Kelas 3-4)"
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
                      className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-slate-700 text-slate-200 focus:border-[#00E5FF] focus:outline-none"
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

              {/* Praktik Pedagogis */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-mono font-bold text-[#C084FC] uppercase block">
                  III. Praktik Pedagogis Pilihan *
                </span>
                <select
                  value={formInput.pedagogicalPractice}
                  onChange={(e: any) => setFormInput({ ...formInput, pedagogicalPractice: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#071426] border border-slate-700 text-xs sm:text-sm text-slate-200 focus:border-[#00E5FF] focus:outline-none font-medium text-[#00E5FF]"
                >
                  <option value="Problem Based Learning (PBL)">Problem Based Learning (PBL)</option>
                  <option value="Project Based Learning (PjBL)">Project Based Learning (PjBL)</option>
                  <option value="Discovery Learning">Discovery Learning</option>
                  <option value="Inquiry Based Learning">Inquiry Based Learning</option>
                  <option value="Cooperative Learning">Cooperative Learning</option>
                  <option value="Contextual Teaching and Learning (CTL)">Contextual Teaching and Learning (CTL)</option>
                  <option value="Pembelajaran Berdiferensiasi">Pembelajaran Berdiferensiasi</option>
                  <option value="Direct Instruction (Pembelajaran Langsung)">Direct Instruction (Pembelajaran Langsung)</option>
                  <option value="Game Based Learning">Game Based Learning</option>
                  <option value="Design Thinking">Design Thinking</option>
                  <option value="Pembelajaran Berbasis Studi Kasus">Pembelajaran Berbasis Studi Kasus</option>
                  <option value="Lainnya">Praktik Pedagogis Lainnya...</option>
                </select>

                {formInput.pedagogicalPractice === 'Lainnya' && (
                  <input
                    type="text"
                    required
                    value={formInput.customPedagogicalPractice || ''}
                    onChange={(e) => setFormInput({ ...formInput, customPedagogicalPractice: e.target.value })}
                    placeholder="Tuliskan nama praktik pedagogis..."
                    className="w-full px-3 py-2 rounded-xl bg-[#071426] border border-[#00E5FF]/40 text-xs text-slate-200 focus:outline-none animate-fade-in"
                  />
                )}
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#2979FF] via-[#00E5FF] to-[#2979FF] rounded-xl hover:shadow-xl hover:shadow-[#2979FF]/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sedang Menyusun Modul Ajar Mendalam...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#FFD166]" />
                      <span>Buat Modul Ajar Lengkap</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Complete Document Preview & Export (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {generatedDoc ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1B31] border border-[#00E5FF]/40 shadow-2xl space-y-6 animate-fade-in">
                {/* Header Action Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#00E5FF] uppercase block">
                      DRAF MODUL AJAR KURIKULUM MERDEKA
                    </span>
                    <h3 className="text-lg font-bold text-white truncate max-w-sm">
                      {generatedDoc.informasiUmum.mataPelajaran} — {generatedDoc.informasiUmum.topikPembelajaran}
                    </h3>
                  </div>

                  {/* Export & Copy Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleCopyText}
                      className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Salin Teks Modul"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Tersalin' : 'Salin'}</span>
                    </button>

                    <button
                      onClick={handleExportWord}
                      disabled={isExportingWord}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#2979FF] hover:bg-[#1D63D8] rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                      title="Unduh File Word .docx"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isExportingWord ? 'Menyiapkan...' : 'Unduh Word (.docx)'}</span>
                    </button>
                  </div>
                </div>

                {/* Section Navigator Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 text-xs font-mono">
                  {[
                    { id: 'sec-1', label: 'I. Informasi Umum' },
                    { id: 'sec-2', label: 'II. Desain Pembelajaran' },
                    { id: 'sec-3', label: 'III. Langkah (Tabel 5 Kolom)' },
                    { id: 'sec-4', label: 'IV. Asesmen & Rubrik' },
                    { id: 'sec-5', label: 'V. Alat & Bahan' },
                    { id: 'sec-6', label: 'VI. Refleksi' },
                    { id: 'sec-7', label: 'VII. Pengesahan' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDocSection(tab.id)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                        activeDocSection === tab.id
                          ? 'bg-[#00E5FF] text-[#071426] font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Document Body Render */}
                <div className="p-6 rounded-2xl bg-[#071426] border border-slate-800 max-h-[550px] overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {/* TAB 1: INFORMASI UMUM */}
                  {activeDocSection === 'sec-1' && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-base font-bold text-white uppercase border-b border-slate-800 pb-2">
                        BAGIAN I. INFORMASI UMUM
                      </h4>
                      <table className="w-full text-left text-xs">
                        <tbody className="divide-y divide-slate-800">
                          <tr>
                            <td className="py-2 font-bold text-[#00E5FF] w-40">Nama Sekolah</td>
                            <td className="py-2 text-white">{generatedDoc.informasiUmum.namaSekolah}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#00E5FF]">Mata Pelajaran</td>
                            <td className="py-2 text-white">{generatedDoc.informasiUmum.mataPelajaran}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#00E5FF]">Materi Pokok</td>
                            <td className="py-2 text-white">{generatedDoc.informasiUmum.materi}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#00E5FF]">Topik Pembelajaran</td>
                            <td className="py-2 text-white">{generatedDoc.informasiUmum.topikPembelajaran}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#00E5FF]">Fase / Kelas</td>
                            <td className="py-2 text-white">{generatedDoc.informasiUmum.faseAtauKelas}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#00E5FF]">Semester</td>
                            <td className="py-2 text-white">Semester {generatedDoc.informasiUmum.semester}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#00E5FF]">Alokasi Waktu</td>
                            <td className="py-2 text-white">{generatedDoc.informasiUmum.alokasiWaktu}</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-bold text-[#00E5FF]">Nama Penyusun</td>
                            <td className="py-2 text-white">{generatedDoc.informasiUmum.namaPenyusun}</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-[11px] text-slate-500 italic pt-2">
                        *Catatan: Sesuai pedoman, Elemen, Capaian Pembelajaran, dan Praktik Pedagogis disajikan pada Bagian II.
                      </p>
                    </div>
                  )}

                  {/* TAB 2: IDENTIFIKASI & DESAIN PEMBELAJARAN */}
                  {activeDocSection === 'sec-2' && (
                    <div className="space-y-5 animate-fade-in">
                      <h4 className="text-base font-bold text-white uppercase border-b border-slate-800 pb-2">
                        BAGIAN II. IDENTIFIKASI DAN DESAIN PEMBELAJARAN
                      </h4>

                      <div className="space-y-2">
                        <span className="font-bold text-[#FFD166] block">1. Identifikasi Peserta Didik:</span>
                        <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300">
                          <li><strong>Pengetahuan Awal:</strong> {generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.pengetahuanAwal}</li>
                          <li><strong>Minat & Motivasi:</strong> {generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.minatDanMotivasi}</li>
                          <li><strong>Kesiapan Belajar:</strong> {generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.kesiapanBelajar}</li>
                          <li><strong>Kebutuhan Belajar:</strong> {generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.kebutuhanBelajar}</li>
                          <li><strong>Potensi Miskonsepsi:</strong> {generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.potensiMiskonsepsi}</li>
                          <li><strong>Dukungan & Diferensiasi:</strong> {generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.dukunganDanDiferensiasi}</li>
                        </ul>
                        <p className="text-[11px] text-[#FFD166] italic bg-[#0B1B31] p-2.5 rounded-lg border border-[#FFD166]/20">
                          {generatedDoc.identifikasiDanDesain.identifikasiPesertaDidik.catatanAsumsi}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="font-bold text-[#00E5FF] block">2. Dimensi Profil Lulusan yang Ditumbuhkan:</span>
                        {generatedDoc.identifikasiDanDesain.dimensiProfilLulusan.map((dp, i) => (
                          <div key={i} className="p-2.5 rounded-lg bg-[#0B1B31] border border-slate-800 text-xs">
                            <strong className="text-white">{dp.dimensi}:</strong> {dp.alasanRelevansi}
                            <span className="block text-slate-400 mt-0.5">Perilaku teramati: {dp.perilakuTeramati}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1">
                        <span className="font-bold text-[#00E5FF] block">3. Capaian Pembelajaran (CP) Resmi:</span>
                        <p className="p-3 rounded-lg bg-[#0B1B31] border border-slate-800 text-slate-200 italic">
                          "{generatedDoc.identifikasiDanDesain.capaianPembelajaran}"
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="font-bold text-[#00E5FF] block">4. Tujuan Pembelajaran (3 Pengalaman Belajar):</span>
                        <div className="p-3 rounded-lg bg-[#0B1B31] border border-slate-800 space-y-1 text-xs">
                          <p><strong className="text-emerald-400">A. Memahami:</strong> {generatedDoc.identifikasiDanDesain.tujuanPembelajaran.memahami[0]}</p>
                          <p><strong className="text-blue-400">B. Mengaplikasi:</strong> {generatedDoc.identifikasiDanDesain.tujuanPembelajaran.mengaplikasi[0]}</p>
                          <p><strong className="text-amber-400">C. Merefleksi:</strong> {generatedDoc.identifikasiDanDesain.tujuanPembelajaran.merefleksi[0]}</p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="font-bold text-[#00E5FF] block">5. Praktik Pedagogis & Sintaks:</span>
                        <p><strong>Pendekatan:</strong> {generatedDoc.identifikasiDanDesain.praktikPedagogis.namaPendekatan}</p>
                        <p className="text-slate-400">{generatedDoc.identifikasiDanDesain.praktikPedagogis.alasanPemilihan}</p>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: LANGKAH-LANGKAH PEMBELAJARAN (TABEL 5 KOLOM) */}
                  {activeDocSection === 'sec-3' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <h4 className="text-base font-bold text-white uppercase">
                          BAGIAN III. LANGKAH-LANGKAH PEMBELAJARAN
                        </h4>
                        <span className="text-xs font-mono text-[#FFD166]">
                          Total: {generatedDoc.langkahPembelajaran.totalWaktuMenit} Menit
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{generatedDoc.langkahPembelajaran.asumsiWaktuText}</p>

                      <div className="rounded-xl border border-slate-800 overflow-x-auto shadow-md">
                        <table className="w-full text-left text-xs min-w-[650px]">
                          <thead className="bg-[#0B1B31] text-[#00E5FF] font-mono text-[11px] uppercase border-b border-slate-800">
                            <tr>
                              <th className="px-3.5 py-2.5 w-2/5">Aktivitas Pembelajaran</th>
                              <th className="px-3 py-2.5 w-1/8">Alokasi Waktu</th>
                              <th className="px-3 py-2.5 w-1/8">Prinsip</th>
                              <th className="px-3 py-2.5 w-1/8">Pengalaman</th>
                              <th className="px-3 py-2.5 w-1/5">Sumber & Media</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800">
                            {/* KEGIATAN AWAL */}
                            <tr className="bg-[#0E223D]/50 font-bold text-white">
                              <td colSpan={5} className="px-3.5 py-1.5 text-[#FFD166]">A. KEGIATAN AWAL</td>
                            </tr>
                            {generatedDoc.langkahPembelajaran.kegiatanAwal.map((step, idx) => (
                              <tr key={`awal_${idx}`} className="hover:bg-[#0E223D]/20">
                                <td className="px-3.5 py-2.5 leading-relaxed text-slate-200">{step.activity}</td>
                                <td className="px-3 py-2.5 font-mono text-[#00E5FF]">{step.timeAllocation}</td>
                                <td className="px-3 py-2.5 text-slate-300">{step.principle}</td>
                                <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px]">{step.learningExperience}</span></td>
                                <td className="px-3 py-2.5 text-slate-400">{step.learningResources}</td>
                              </tr>
                            ))}

                            {/* KEGIATAN INTI */}
                            <tr className="bg-[#0E223D]/50 font-bold text-white">
                              <td colSpan={5} className="px-3.5 py-1.5 text-[#00E5FF]">B. KEGIATAN INTI</td>
                            </tr>
                            {generatedDoc.langkahPembelajaran.kegiatanInti.map((step, idx) => (
                              <tr key={`inti_${idx}`} className="hover:bg-[#0E223D]/20">
                                <td className="px-3.5 py-2.5 leading-relaxed text-slate-200">{step.activity}</td>
                                <td className="px-3 py-2.5 font-mono text-[#00E5FF]">{step.timeAllocation}</td>
                                <td className="px-3 py-2.5 text-slate-300">{step.principle}</td>
                                <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono text-[10px]">{step.learningExperience}</span></td>
                                <td className="px-3 py-2.5 text-slate-400">{step.learningResources}</td>
                              </tr>
                            ))}

                            {/* KEGIATAN PENUTUP */}
                            <tr className="bg-[#0E223D]/50 font-bold text-white">
                              <td colSpan={5} className="px-3.5 py-1.5 text-[#C084FC]">C. KEGIATAN PENUTUP</td>
                            </tr>
                            {generatedDoc.langkahPembelajaran.kegiatanPenutup.map((step, idx) => (
                              <tr key={`penutup_${idx}`} className="hover:bg-[#0E223D]/20">
                                <td className="px-3.5 py-2.5 leading-relaxed text-slate-200">{step.activity}</td>
                                <td className="px-3 py-2.5 font-mono text-[#00E5FF]">{step.timeAllocation}</td>
                                <td className="px-3 py-2.5 text-slate-300">{step.principle}</td>
                                <td className="px-3 py-2.5"><span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono text-[10px]">{step.learningExperience}</span></td>
                                <td className="px-3 py-2.5 text-slate-400">{step.learningResources}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: ASESMEN & RUBRIK */}
                  {activeDocSection === 'sec-4' && (
                    <div className="space-y-5 animate-fade-in">
                      <h4 className="text-base font-bold text-white uppercase border-b border-slate-800 pb-2">
                        BAGIAN IV. ASESMEN PEMBELAJARAN
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-slate-800 space-y-1">
                          <strong className="text-[#00E5FF] block">1. Asesmen Awal:</strong>
                          <p className="text-slate-300">{generatedDoc.asesmen.asesmenAwal.tujuan}</p>
                          <p className="text-slate-400 font-mono">Teknik: {generatedDoc.asesmen.asesmenAwal.teknik}</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-slate-800 space-y-1">
                          <strong className="text-[#00E5FF] block">2. Asesmen Formatif:</strong>
                          <p className="text-slate-300">{generatedDoc.asesmen.asesmenFormatif.indikator}</p>
                          <p className="text-slate-400 font-mono">Teknik: {generatedDoc.asesmen.asesmenFormatif.teknik}</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-slate-800 space-y-1">
                          <strong className="text-[#00E5FF] block">3. Asesmen Sumatif:</strong>
                          <p className="text-slate-300">{generatedDoc.asesmen.asesmenSumatif.bentuk}</p>
                          <p className="text-slate-400">{generatedDoc.asesmen.asesmenSumatif.deskripsiTugasSoal}</p>
                        </div>
                      </div>

                      {/* Rubrik Penilaian Skala 1-4 */}
                      <div className="space-y-2 pt-2">
                        <span className="font-bold text-white block">Rubrik Penilaian Analitik (Skala 1–4):</span>
                        <div className="space-y-3">
                          {generatedDoc.asesmen.rubrikPenilaian.map((rubrik, idx) => (
                            <div key={idx} className="p-3.5 rounded-xl bg-[#0B1B31] border border-slate-800 space-y-2 text-xs">
                              <div className="flex items-center justify-between">
                                <strong className="text-[#FFD166] text-sm">{rubrik.aspek}</strong>
                                <span className="text-slate-400 font-mono">{rubrik.indikator}</span>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                                <div className="p-2 rounded bg-[#071426] border border-slate-800">
                                  <span className="text-rose-400 font-bold block">Skor 1 (Bimbingan)</span>
                                  <span className="text-slate-400">{rubrik.skala1}</span>
                                </div>
                                <div className="p-2 rounded bg-[#071426] border border-slate-800">
                                  <span className="text-amber-400 font-bold block">Skor 2 (Cukup)</span>
                                  <span className="text-slate-400">{rubrik.skala2}</span>
                                </div>
                                <div className="p-2 rounded bg-[#071426] border border-slate-800">
                                  <span className="text-blue-400 font-bold block">Skor 3 (Baik)</span>
                                  <span className="text-slate-400">{rubrik.skala3}</span>
                                </div>
                                <div className="p-2 rounded bg-[#071426] border border-slate-800">
                                  <span className="text-emerald-400 font-bold block">Skor 4 (Sangat Baik)</span>
                                  <span className="text-slate-300">{rubrik.skala4}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: ALAT & SUMBER BELAJAR */}
                  {activeDocSection === 'sec-5' && (
                    <div className="space-y-4 animate-fade-in">
                      <h4 className="text-base font-bold text-white uppercase border-b border-slate-800 pb-2">
                        BAGIAN V. ALAT DAN SUMBER BELAJAR
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-slate-800 space-y-1.5">
                          <strong className="text-[#00E5FF] block">Alat & Bahan Praktik:</strong>
                          <ul className="list-disc list-inside space-y-1 text-slate-300">
                            {generatedDoc.alatDanSumberBelajar.alatDanBahan.map((a, i) => (
                              <li key={i}>{a}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-slate-800 space-y-1.5">
                          <strong className="text-[#00E5FF] block">Media Pembelajaran:</strong>
                          <ul className="list-disc list-inside space-y-1 text-slate-300">
                            {generatedDoc.alatDanSumberBelajar.mediaPembelajaran.map((m, i) => (
                              <li key={i}>{m}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-[#0B1B31] border border-slate-800 text-xs space-y-1">
                        <strong className="text-[#FFD166] block">Alternatif Pembelajaran Luring:</strong>
                        <p className="text-slate-300">{generatedDoc.alatDanSumberBelajar.alternatifLuring}</p>
                      </div>
                    </div>
                  )}

                  {/* TAB 6: REFLEKSI GURU & MURID */}
                  {activeDocSection === 'sec-6' && (
                    <div className="space-y-5 animate-fade-in">
                      <h4 className="text-base font-bold text-white uppercase border-b border-slate-800 pb-2">
                        BAGIAN VI. REFLEKSI GURU DAN PESERTA DIDIK
                      </h4>
                      <div className="space-y-3">
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
                </div>
              </div>
            ) : (
              /* EMPTY PLACEHOLDER */
              <div className="p-12 rounded-3xl bg-[#0B1B31]/60 border border-dashed border-slate-800 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#071426] border border-slate-700 flex items-center justify-center mx-auto text-[#00E5FF]">
                  <FileText className="w-8 h-8" />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <h4 className="text-lg font-bold text-white">Pratinjau Modul Ajar</h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Lengkapi parameter di sebelah kiri atau klik <strong className="text-[#00E5FF]">"Isi Contoh Parameter"</strong>, lalu tekan <strong className="text-white">"Buat Modul Ajar Lengkap"</strong> untuk menghasilkan dokumen Word & PDF.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
