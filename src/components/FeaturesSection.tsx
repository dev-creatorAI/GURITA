import React from 'react';
import { Compass, Terminal, Sparkles, Gamepad2, ArrowRight } from 'lucide-react';

interface FeaturesSectionProps {
  onOpenPromptLab: () => void;
  onOpenGameStudio: () => void;
  onExploreAI: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  onOpenPromptLab,
  onOpenGameStudio,
  onExploreAI
}) => {
  const features = [
    {
      id: 'ai-explorer',
      title: 'AI Explorer',
      subtitle: 'Literasi & Fondasi Pembelajaran',
      description: 'Mengenal cara kerja kecerdasan artifisial, etika pemanfaatan di sekolah, serta mendeteksi miskonsepsi konten secara bijak.',
      highlights: ['Dasar Gen-AI untuk Pendidik', 'Kompas Etika & Privasi Siswa', 'Deteksi Miskonsepsi & Halusinasi'],
      icon: Compass,
      accentColor: 'text-[#00E5FF]',
      borderHover: 'hover:border-[#00E5FF]/60',
      actionLabel: 'Jelajahi AI',
      onClick: onExploreAI
    },
    {
      id: 'prompt-lab',
      title: 'Prompt Lab',
      subtitle: 'Formula Prompting Guru Presisi',
      description: 'Menyusun instruksi prompt terstruktur dengan formula 5-Elemen Gurita untuk menghasilkan modul ajar, rubrik, dan skenario kuis instan.',
      highlights: ['Formula 5P Gurita', 'Generator Modul & Diferensiasi', 'Prompt Vault Siap Pakai'],
      icon: Terminal,
      accentColor: 'text-[#2979FF]',
      borderHover: 'hover:border-[#2979FF]/60',
      actionLabel: 'Buka Prompt Lab',
      onClick: onOpenPromptLab
    },
    {
      id: 'creative-studio',
      title: 'Creative Studio',
      subtitle: 'Pengembangan Ide Media Pembelajaran',
      description: 'Mengembangkan materi visual, narasi cerita interaktif, dan analogi kreatif agar topik sulit dipahami menjadi mudah diserap murid.',
      highlights: ['Storyboard Media Digital', 'Analogi Konsep Rumit', 'Penceritaan Edukatif Menarik'],
      icon: Sparkles,
      accentColor: 'text-[#8B5CF6]',
      borderHover: 'hover:border-[#8B5CF6]/60',
      actionLabel: 'Rancang Media',
      onClick: onOpenPromptLab // routes to creative prompt creation
    },
    {
      id: 'game-studio',
      title: 'Game Studio',
      subtitle: 'Merancang & Menguji Game Edukasi',
      description: 'Membangun kuis interaktif bergradasi tantangan lengkap dengan umpan balik riang, fakta unik, dan playtest langsung di gawai.',
      highlights: ['Editor Soal & Distractor Cerdas', 'Mode Playtest Live 3 Detik', 'Ekspor & Bagikan Kode Game'],
      icon: Gamepad2,
      accentColor: 'text-[#FFD166]',
      borderHover: 'hover:border-[#FFD166]/60',
      actionLabel: 'Uji Game Studio',
      onClick: onOpenGameStudio
    }
  ];

  return (
    <section id="eksplorasi" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00E5FF]">
            <span>Empat Ekosistem Utama</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Fitur Unggulan Platform GURITA
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Empat panggung interaktif yang membawa guru dari tahap literasi konsep hingga siap menghasilkan game kuis edukasi yang memukau.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className={`p-7 rounded-3xl bg-[#0B1B31]/80 border border-[#2979FF]/15 ${feat.borderHover} transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:-translate-y-1`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-[#071426] border border-slate-800 group-hover:scale-110 transition-transform">
                      <Icon className={`w-6 h-6 ${feat.accentColor}`} />
                    </div>
                    <span className="font-mono text-xs text-slate-400 font-semibold">
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-[#FFD166] font-medium mt-0.5">{feat.subtitle}</p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {feat.description}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                    {feat.highlights.map((item) => (
                      <li key={item} className="text-xs text-slate-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]/70 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800/60">
                  <button
                    onClick={feat.onClick}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#0E223D] hover:bg-[#122A4E] border border-slate-700 hover:border-[#00E5FF]/40 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
                  >
                    <span>{feat.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-[#00E5FF]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
