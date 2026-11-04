import React, { useState } from 'react';
import {
  Sparkles,
  Crown,
  Target,
  Route,
  ClipboardCheck,
  GraduationCap,
  Brain,
  Clapperboard,
  Clock,
  Lock,
  Info,
  X,
  CheckCircle2,
  Zap,
  ArrowRight
} from 'lucide-react';

interface FeatureItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  specialNote?: string;
  icon: React.ElementType;
  gradient: string;
  accentColor: string;
  badgeColor: string;
  borderColor: string;
  keyHighlights: string[];
}

export const GuritaProSection: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  const features: FeatureItem[] = [
    {
      id: 'tp',
      number: '01',
      title: 'Generate Tujuan Pembelajaran',
      tagline: 'Perumusan TP Terukur dari CP',
      description:
        'Buat tujuan pembelajaran secara otomatis berdasarkan Capaian Pembelajaran (CP), dengan rumusan yang jelas, terukur, dan sesuai karakteristik mata pelajaran serta fase.',
      icon: Target,
      gradient: 'from-[#00E5FF]/20 via-[#2979FF]/10 to-transparent',
      accentColor: 'text-[#00E5FF]',
      badgeColor: 'border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/10',
      borderColor: 'group-hover:border-[#00E5FF]/50',
      keyHighlights: [
        'Konversi langsung dari rumusan CP resmi',
        'Struktur ABCD (Audience, Behavior, Condition, Degree)',
        'Taksonomi Bloom & Marzano terkalibrasi fase'
      ]
    },
    {
      id: 'atp',
      number: '02',
      title: 'Generate Alur Tujuan Pembelajaran (ATP)',
      tagline: 'Sistematika Alur Fase Terintegrasi',
      description:
        'Susun Alur Tujuan Pembelajaran secara sistematis dan berurutan berdasarkan CP dan tujuan pembelajaran, dari awal hingga akhir fase.',
      icon: Route,
      gradient: 'from-[#2979FF]/20 via-[#8B5CF6]/10 to-transparent',
      accentColor: 'text-[#2979FF]',
      badgeColor: 'border-[#2979FF]/40 text-[#2979FF] bg-[#2979FF]/10',
      borderColor: 'group-hover:border-[#2979FF]/50',
      keyHighlights: [
        'Urutan hierarkis dari konkret ke abstrak',
        'Peta keterkaitan antartujuan per semester',
        'Estimasi alokasi jam pelajaran (JP) adaptif'
      ]
    },
    {
      id: 'kktp',
      number: '03',
      title: 'Generate Kriteria Ketercapaian TP (KKTP)',
      tagline: 'Rubrik & Interval Nilai Objektif',
      description:
        'Buat kriteria ketercapaian tujuan pembelajaran yang terukur, lengkap dengan indikator, deskripsi pencapaian, dan kriteria penilaian.',
      icon: ClipboardCheck,
      gradient: 'from-[#8B5CF6]/20 via-[#00E5FF]/10 to-transparent',
      accentColor: 'text-[#8B5CF6]',
      badgeColor: 'border-[#8B5CF6]/40 text-[#8B5CF6] bg-[#8B5CF6]/10',
      borderColor: 'group-hover:border-[#8B5CF6]/50',
      keyHighlights: [
        'Deskripsi interval tuntas & belum tuntas',
        'Rubrik skala 4 level kemahiran',
        'Pendekatan asesmen formatif otentik'
      ]
    },
    {
      id: 'rpm',
      number: '04',
      title: 'Generate Rencana Pembelajaran Mendalam',
      tagline: 'Desain Berkesadaran, Bermakna, & Menggembirakan',
      description:
        'Buat rencana pembelajaran mendalam secara terstruktur dan terperinci, mencakup identifikasi, desain pembelajaran, pengalaman belajar, asesmen, refleksi, serta prinsip berkesadaran, bermakna, dan menggembirakan.',
      icon: GraduationCap,
      gradient: 'from-[#FFD166]/20 via-[#2979FF]/10 to-transparent',
      accentColor: 'text-[#FFD166]',
      badgeColor: 'border-[#FFD166]/40 text-[#FFD166] bg-[#FFD166]/10',
      borderColor: 'group-hover:border-[#FFD166]/50',
      keyHighlights: [
        'Sintaks pedagogis 3 fase (Awal, Inti, Penutup)',
        'Diferensiasi konten, proses, dan produk',
        'Integrasi refleksi guru dan peserta didik'
      ]
    },
    {
      id: 'soal',
      number: '05',
      title: 'Generate Materi & Soal',
      tagline: 'Multi-Bentuk Evaluasi & Soal HOTS',
      description:
        'Buat soal evaluasi pembelajaran berdasarkan materi dan tujuan pembelajaran, mulai dari pilihan ganda, pilihan ganda kompleks, benar-salah, menjodohkan, isian, hingga uraian. Mendukung variasi tingkat kesulitan dan soal HOTS.',
      icon: Brain,
      gradient: 'from-[#2979FF]/20 via-[#FFD166]/10 to-transparent',
      accentColor: 'text-[#00E5FF]',
      badgeColor: 'border-[#00E5FF]/40 text-[#00E5FF] bg-[#00E5FF]/10',
      borderColor: 'group-hover:border-[#00E5FF]/50',
      keyHighlights: [
        '6 variasi tipe soal sesuai standar asesmen nasional',
        'Tingkat kognitif C1 hingga C6 (HOTS)',
        'Dilengkapi stimulus teks/kasus & kunci jawaban'
      ]
    },
    {
      id: 'video',
      number: '06',
      title: 'Video Pembelajaran AI',
      tagline: 'Konsep Storyboard & Multi-Scene Prompt',
      description:
        'Buat konsep dan prompt video pembelajaran berbasis AI dalam beberapa scene. Dilengkapi alur cerita, narasi, dialog, visual, arahan kamera, dan durasi setiap scene.',
      specialNote:
        'Generate video secara bertahap dalam beberapa scene agar materi lebih menarik, runtut, dan mudah dipahami siswa.',
      icon: Clapperboard,
      gradient: 'from-[#FFD166]/20 via-[#8B5CF6]/10 to-transparent',
      accentColor: 'text-[#FFD166]',
      badgeColor: 'border-[#FFD166]/40 text-[#FFD166] bg-[#FFD166]/10',
      borderColor: 'group-hover:border-[#FFD166]/50',
      keyHighlights: [
        'Pecahan per-scene dengan estimasi durasi detik',
        'Instruksi visual, gaya kamera & framing sinematik',
        'Naskah narasi / voiceover bahasa Indonesia komunikatif'
      ]
    }
  ];

  return (
    <section
      id="gurita-pro"
      className="py-20 md:py-28 relative bg-[#071426] border-t border-[#2979FF]/15 overflow-hidden"
    >
      {/* Background Ambience Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-[#2979FF]/10 via-[#8B5CF6]/10 to-[#00E5FF]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#FFD166]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Pro Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FFD166]/10 via-[#8B5CF6]/15 to-[#00E5FF]/10 border border-[#FFD166]/30 shadow-lg shadow-[#FFD166]/5">
            <Crown className="w-4 h-4 text-[#FFD166] animate-pulse" />
            <span className="text-xs font-bold tracking-wider uppercase text-[#FFD166]">
              GURITA PRO · SUITE LANJUTAN
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
            <span className="text-[11px] font-semibold text-[#00E5FF]">Eksklusif Guru</span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              GURITA{' '}
              <span className="bg-gradient-to-r from-[#00E5FF] via-[#FFD166] to-[#8B5CF6] bg-clip-text text-transparent">
                PRO
              </span>
            </h2>
            <p className="text-lg md:text-2xl font-bold text-slate-100">
              Lebih dari Sekadar AI, Asisten Cerdas untuk Guru Masa Depan.
            </p>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Jelajahi berbagai fitur AI lanjutan yang dirancang untuk membantu guru merancang
            pembelajaran, menyusun asesmen, dan menciptakan media pembelajaran yang lebih inovatif.
          </p>

          {/* Development Status Notice */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B1E38]/80 border border-[#2979FF]/30 text-xs text-slate-300 backdrop-blur-sm">
            <Clock className="w-3.5 h-3.5 text-[#FFD166] shrink-0" />
            <span>
              Fitur sedang dalam tahap riset & pengembangan intensif dan akan tersedia secara bertahap.
            </span>
          </div>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedFeature(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedFeature(item);
                  }
                }}
                className={`group relative rounded-2xl bg-gradient-to-b from-[#0C1F38]/90 to-[#081528]/95 p-6 border border-slate-800 ${item.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2979FF]/10 cursor-pointer flex flex-col justify-between overflow-hidden`}
              >
                {/* Ambient Top Glow on Hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD166] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div
                  className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${item.gradient} blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                />

                <div className="space-y-4 relative z-10">
                  {/* Top Bar: Icon, Number, & SOON Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#071426] border border-slate-700/80 flex items-center justify-center shadow-inner group-hover:border-[#00E5FF]/40 transition-colors">
                        <Icon className={`w-6 h-6 ${item.accentColor} transition-transform duration-300 group-hover:scale-110`} />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-500 tracking-wider">
                        #{item.number}
                      </span>
                    </div>

                    {/* SOON Badge */}
                    <div className="flex flex-col items-end gap-1">
                      <span className="px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded-md border border-[#FFD166]/50 bg-[#FFD166]/15 text-[#FFD166] shadow-sm shadow-[#FFD166]/10 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-[#FFD166]" />
                        <span>SOON</span>
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        Sedang Dalam Pengembangan
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00E5FF] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 tracking-wide font-mono">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">
                    {item.description}
                  </p>

                  {/* Special Note if Video */}
                  {item.specialNote && (
                    <div className="p-2.5 rounded-xl bg-[#FFD166]/10 border border-[#FFD166]/25 text-[11px] text-[#FFD166] leading-relaxed">
                      <span className="font-bold">Tips Alur: </span>
                      {item.specialNote}
                    </div>
                  )}

                  {/* Planned Capabilities Preview */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Rencana Kemampuan:
                    </div>
                    {item.keyHighlights.map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-[#00E5FF] shrink-0" />
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Card: Info & Preview Prompt */}
                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-white transition-colors relative z-10">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#FFD166]" />
                    <span>Segera Hadir</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#00E5FF] group-hover:translate-x-1 transition-transform">
                    <span>Detail Info</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Information Modal */}
        {selectedFeature && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedFeature(null)}
          >
            <div
              className="bg-[#0B1E38] border border-[#2979FF]/40 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle Ambient glow */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00E5FF] via-[#FFD166] to-[#8B5CF6]" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Tutup detail fitur"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-3 pt-1">
                <div className="w-12 h-12 rounded-xl bg-[#071426] border border-slate-700 flex items-center justify-center shrink-0">
                  <selectedFeature.icon className={`w-6 h-6 ${selectedFeature.accentColor}`} />
                </div>
                <div className="space-y-1 pr-6">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40">
                      SOON · DALAM PENGEMBANGAN
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      FITUR {selectedFeature.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {selectedFeature.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed border-y border-slate-800 py-4">
                <p>{selectedFeature.description}</p>

                {selectedFeature.specialNote && (
                  <div className="p-3 rounded-xl bg-[#FFD166]/10 border border-[#FFD166]/30 text-[#FFD166]">
                    <span className="font-bold block mb-1">Panduan Alur Bertahap:</span>
                    {selectedFeature.specialNote}
                  </div>
                )}

                <div className="space-y-2 pt-2">
                  <span className="font-semibold text-white block">
                    Peta Rencana Fitur yang Sedang Disiapkan:
                  </span>
                  <ul className="space-y-1.5 pl-1">
                    {selectedFeature.keyHighlights.map((hl, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-[#071426] border border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5 font-semibold text-[#00E5FF] mb-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>Status Kesiapan:</span>
                  </div>
                  Fitur ini dirancang khusus untuk modul tingkat lanjut GURITA PRO. Saat ini tim pengembang sedang menguji ketepatan pedagogis agar rumusannya sesuai Kurikulum Merdeka dan kebutuhan nyata guru di kelas.
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <span className="text-[11px] text-slate-400">
                  Akan dirilis secara bertahap
                </span>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#071426] bg-[#00E5FF] hover:bg-[#38EFFF] rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  Mengerti
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
