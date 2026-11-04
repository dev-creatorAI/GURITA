import React, { useState } from 'react';
import { Compass, Terminal, Sparkles, Gamepad2, ArrowRight, Lightbulb, Cpu, Smile, CheckCircle } from 'lucide-react';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  const featureCards = [
    {
      id: 'ai-explorer',
      title: 'AI Explorer',
      description: 'Mengenal AI dan penerapannya dalam pendidikan.',
      icon: Compass,
      accentColor: 'text-[#00E5FF]',
      borderColor: 'border-[#00E5FF]/30',
      badge: 'Literasi AI',
      actionLabel: 'Mulai Mengenal AI',
      targetSection: 'materi'
    },
    {
      id: 'prompt-lab',
      title: 'Prompt Lab',
      description: 'Menyusun modul ajar siap pakai.',
      icon: Terminal,
      accentColor: 'text-[#2979FF]',
      borderColor: 'border-[#2979FF]/30',
      badge: 'RPM',
      actionLabel: 'Buka Prompt Lab',
      targetSection: 'prompt-lab'
    },
    {
      id: 'generator-media',
      title: 'Generator Media',
      description: 'Merancang poster, infografis, dan LKPD edukatif siap cetak.',
      icon: Sparkles,
      accentColor: 'text-[#8B5CF6]',
      borderColor: 'border-[#8B5CF6]/30',
      badge: 'Poster · Infografis · LKPD',
      actionLabel: 'Buka Generator Media',
      targetSection: 'generator-media'
    },
    {
      id: 'game-studio',
      title: 'Game Studio',
      description: 'Membuat dan menguji game edukasi.',
      icon: Gamepad2,
      accentColor: 'text-[#FFD166]',
      borderColor: 'border-[#FFD166]/30',
      badge: 'Game Builder',
      actionLabel: 'Buka Game Studio',
      targetSection: 'game-studio'
    }
  ];

  const pillars = [
    {
      title: 'Kreativitas Multidimensi',
      tentacleSymbol: 'Tentakel Solutif',
      icon: Lightbulb,
      accentColor: 'text-[#00E5FF]',
      description: 'Seperti gurita yang dapat menggunakan delapan tentakelnya secara independen sekaligus terkoordinasi, guru GURITA mampu merancang aneka ragam media, cerita, dan teka-teki pembelajaran untuk menyapa gaya belajar setiap murid.',
      classroomImpact: 'Menghilangkan kejenuhan belajar dengan variasi pendekatan visual, naratif, dan kuis adaptif.'
    },
    {
      title: 'Adaptif & Cepat Tanggap',
      tentacleSymbol: 'Kelenturan Alami',
      icon: Compass,
      accentColor: 'text-[#2979FF]',
      description: 'Gurita dikenal sebagai makhluk tercerdas di samudra yang mampu mengubah bentuk dan warna sesuai habitatnya. Guru modern tidak gentar oleh disrupsi AI, melainkan gesit memanfaatkannya sebagai mitra pendamping.',
      classroomImpact: 'Guru tidak tertinggal zaman, justru memimpin murid memahami etika dan kegunaan AI secara bijak.'
    },
    {
      title: 'Orkestrasi Ragam Teknologi',
      tentacleSymbol: 'Integrasi Harmonis',
      icon: Cpu,
      accentColor: 'text-[#8B5CF6]',
      description: 'AI bukanlah tujuan, melainkan pengungkit (leverage). GURITA melatih guru menghubungkan Large Language Model dengan gamifikasi, asesmen formatif, dan lembar kerja nyata tanpa perlu keahlian pemrograman teknis yang rumit.',
      classroomImpact: 'Menghemat waktu administratif persiapan mengajar hingga 70%, memberi lebih banyak waktu untuk interaksi murid.'
    },
    {
      title: 'Keriangan yang Bermakna',
      tentacleSymbol: 'Guru Riang, Siswa Senang',
      icon: Smile,
      accentColor: 'text-[#FFD166]',
      description: 'Huruf "R" dalam GURITA menegaskan kata "Riang". Pembelajaran yang efektif lahir dari suasana psikologis yang aman, penuh senyum, dan tidak mencekam. Guru yang riang akan menularkan energi inspiratif pada siswa.',
      classroomImpact: 'Meningkatkan keterlibatan (engagement) dan retensi materi hingga 2x lipat dibanding metode satu arah.'
    }
  ];

  return (
    <section id="tentang" className="py-20 md:py-28 relative">
      <div id="eksplorasi" className="absolute -top-12 left-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00E5FF]">
            <span>Tentang Platform GURITA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Satu Platform, Banyak Kemungkinan!
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            GURITA adalah ruang eksplorasi bagi guru untuk mengenal teknologi AI, mengembangkan kreativitas, dan menciptakan pengalaman belajar yang lebih interaktif.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`p-7 rounded-3xl bg-[#0B1B31]/80 border ${card.borderColor} hover:border-[#00E5FF]/60 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:-translate-y-1`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-[#071426] border border-slate-800 group-hover:scale-110 transition-transform">
                      <Icon className={`w-6 h-6 ${card.accentColor}`} />
                    </div>
                    <span className="font-mono text-xs text-slate-400 font-semibold">
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                      {card.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-400 mt-1 block">
                      {card.badge}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/80">
                  <button
                    onClick={() => onNavigate(card.targetSection)}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#0E223D] hover:bg-[#122A4E] border border-slate-700 hover:border-[#00E5FF]/40 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
                  >
                    <span>{card.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-[#00E5FF]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filosofi Guru Riang (Expandable Sub-Panel) */}
        <div className="pt-8 border-t border-[#2979FF]/15">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-[#0B1B31]/40 border border-slate-800/80 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Filosofi Lambang Si Gurita AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Simbol guru kreatif, adaptif, dan mampu memanfaatkan beragam teknologi dengan riang gembira.
              </p>
            </div>
            <button
              onClick={() => setShowPhilosophy(!showPhilosophy)}
              className="px-4 py-2 text-xs font-semibold text-[#00E5FF] bg-[#0E223D] hover:bg-[#122A4E] border border-[#00E5FF]/30 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              {showPhilosophy ? 'Sembunyikan Filosofi' : 'Lihat 4 Pilar Filosofi'}
            </button>
          </div>

          {showPhilosophy && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fade-in">
              {/* Pillar Selector */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
                {pillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  const isActive = activeTab === idx;
                  return (
                    <button
                      key={pillar.title}
                      onClick={() => setActiveTab(idx)}
                      className={`w-full text-left p-4 rounded-2xl transition-all flex items-start gap-4 cursor-pointer ${
                        isActive
                          ? 'bg-[#0E223D] border border-[#00E5FF]/40 shadow-lg shadow-[#00E5FF]/10 translate-x-1'
                          : 'bg-[#0B1B31]/60 border border-slate-800 hover:border-slate-700 hover:bg-[#0B1B31]'
                      }`}
                    >
                      <div
                        className={`p-2.5 rounded-xl shrink-0 ${
                          isActive ? 'bg-[#00E5FF]/15 text-[#00E5FF]' : 'bg-slate-800/80 text-slate-400'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-slate-300'}`}>
                            {pillar.title}
                          </h4>
                          {isActive && <span className="text-[10px] text-[#00E5FF] font-mono shrink-0">Aktif</span>}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{pillar.tentacleSymbol}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Pillar Detail */}
              <div className="lg:col-span-7 p-7 rounded-3xl bg-[#0E223D] border border-[#2979FF]/20 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00E5FF] uppercase">
                  <span>Pilar 0{activeTab + 1}</span>
                  <span>·</span>
                  <span className="text-slate-400">{pillars[activeTab].tentacleSymbol}</span>
                </div>
                <h4 className="text-xl font-bold text-white">{pillars[activeTab].title}</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{pillars[activeTab].description}</p>
                <div className="p-4 rounded-2xl bg-[#071426] border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#00E5FF]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Dampak Langsung di Kelas</span>
                  </div>
                  <p className="text-xs text-slate-300">{pillars[activeTab].classroomImpact}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
