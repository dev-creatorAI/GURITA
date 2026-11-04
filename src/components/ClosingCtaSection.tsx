import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MascotGurita } from './MascotGurita';

interface ClosingCtaSectionProps {
  onStartExploration: () => void;
}

export const ClosingCtaSection: React.FC<ClosingCtaSectionProps> = ({ onStartExploration }) => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#2979FF]/15 via-[#00E5FF]/10 to-[#8B5CF6]/15 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 md:p-16 rounded-3xl bg-gradient-to-b from-[#0E223D] via-[#0B1B31] to-[#071426] border border-[#2979FF]/30 shadow-2xl relative overflow-hidden text-center space-y-8">
          {/* Subtle decorative glowing ring */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00E5FF]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#8B5CF6]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Mini mascot icon with celebration badge */}
          <div className="flex justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 relative">
              <MascotGurita size="sm" showSpeechBubble={false} interactive={true} />
            </div>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {/* Tagline / Headline */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-snug text-balance">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00E5FF]">
                Guru Kreatif,
              </span>{' '}
              <span className="text-[#FFD166]">Teknologi Adaptif,</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6]">
                Siswa Inspiratif.
              </span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              Mulai langkah kecil hari ini untuk menghadirkan pengalaman belajar yang lebih bermakna.
            </p>
          </div>

          {/* Action Button: Mulai Eksplorasi */}
          <div className="flex justify-center pt-2">
            <button
              onClick={onStartExploration}
              className="px-8 py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#2979FF] via-[#00E5FF] to-[#2979FF] rounded-2xl hover:shadow-2xl hover:shadow-[#2979FF]/30 active:scale-95 transition-all flex items-center gap-3 cursor-pointer group"
            >
              <Sparkles className="w-5 h-5 text-[#FFD166]" />
              <span>Mulai Eksplorasi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
