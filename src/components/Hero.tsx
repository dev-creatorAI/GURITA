import React from 'react';
import { ArrowRight, Play, Sparkles, BookOpen, Clock, Users, Award } from 'lucide-react';
import { MascotGurita } from './MascotGurita';

interface HeroProps {
  onStartExploration: () => void;
  onTryGame: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartExploration, onTryGame }) => {
  return (
    <section id="beranda" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-[#2979FF]/15 via-[#00E5FF]/10 to-[#8B5CF6]/15 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline / Subtitle Pill-free Header */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm font-semibold tracking-wide text-[#00E5FF]">
              <Sparkles className="w-4 h-4 text-[#FFD166]" />
              <span>GURU KREATIF · TEKNOLOGI ADAPTIF · SISWA INSPIRATIF</span>
            </div>

            {/* Brand Title Lockup */}
            <div>
              <div className="inline-block">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00E5FF]">
                    GURITA
                  </span>
                </h1>
                <p className="mt-2 text-base sm:text-lg font-semibold text-[#FFD166] tracking-wide">
                  Guru Riang dengan Teknologi AI
                </p>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-100 tracking-tight leading-snug text-balance">
              Jelajahi AI, Ciptakan Inovasi, Hidupkan Pembelajaran!
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Platform eksplorasi AI bagi guru untuk mengubah ide kreatif menjadi pengalaman belajar yang interaktif, menyenangkan, dan inspiratif.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onStartExploration}
                className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#2979FF] to-[#00E5FF] rounded-xl hover:shadow-lg hover:shadow-[#2979FF]/30 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <span>Mulai Eksplorasi</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onTryGame}
                className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-200 bg-[#0E223D]/80 border border-[#2979FF]/30 rounded-xl hover:bg-[#122A4E] hover:border-[#00E5FF]/50 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#FFD166] fill-[#FFD166]" />
                <span>Coba Game Edukasi</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Octopus Mascot with Educational Orbit (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <MascotGurita size="hero" showSpeechBubble={true} interactive={true} />
          </div>
        </div>
      </div>
    </section>
  );
};
