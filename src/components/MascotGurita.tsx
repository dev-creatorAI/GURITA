import React, { useState } from 'react';
import { Sparkles, Lightbulb, Gamepad2, BookOpen, Heart } from 'lucide-react';

interface MascotGuritaProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSpeechBubble?: boolean;
  interactive?: boolean;
  customImageUrl?: string;
}

export const MascotGurita: React.FC<MascotGuritaProps> = ({
  size = 'md',
  showSpeechBubble = false,
  interactive = true,
  customImageUrl
}) => {
  const [mood, setMood] = useState<'ceria' | 'mengajar' | 'ide'>('ceria');
  const [isWinking, setIsWinking] = useState(false);

  const handleMascotClick = () => {
    if (!interactive) return;
    setIsWinking(true);
    setTimeout(() => setIsWinking(false), 800);
    const nextMood = mood === 'ceria' ? 'mengajar' : mood === 'mengajar' ? 'ide' : 'ceria';
    setMood(nextMood);
  };

  const speechMessages = {
    ceria: 'Halo Guru Hebat! Siap berpetualang dengan AI hari ini? ✨',
    mengajar: 'Guru adaptif mengubah rasa ingin tahu siswa jadi prestasi! 🎓',
    ide: 'Wah, dapat ide game edukasi seru! Yuk langsung kita uji! 💡'
  };

  // If a custom image is provided by user or generator
  if (customImageUrl) {
    return (
      <div className="relative inline-block group">
        <img
          src={customImageUrl}
          alt="Maskot Gurita AI 3D"
          referrerPolicy="no-referrer"
          className="rounded-2xl object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      </div>
    );
  }

  // Dimensions based on size
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-64 h-64',
    hero: 'w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96'
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Speech Bubble */}
      {showSpeechBubble && (
        <div
          role="status"
          aria-live="polite"
          className="mb-4 max-w-xs px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#0E223D] to-[#122A4E] border border-[#00E5FF]/30 shadow-lg shadow-[#00E5FF]/10 text-xs sm:text-sm text-[#F8FAFC] flex items-center gap-2.5 animate-bounce-subtle"
        >
          <div className="w-2 h-2 rounded-full bg-[#00E5FF] shrink-0 animate-ping" />
          <p className="font-medium text-slate-200">
            {speechMessages[mood]}
          </p>
          <span className="text-xs text-[#00E5FF] shrink-0 font-mono font-semibold">GURITA AI</span>
        </div>
      )}

      {/* Interactive Mascot Stage */}
      <div
        onClick={handleMascotClick}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={(e) => {
          if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleMascotClick();
          }
        }}
        aria-label="Maskot Gurita AI interaktif. Klik untuk melihat ekspresi dan pesan edukasi."
        className={`relative ${sizeMap[size]} flex items-center justify-center ${
          interactive ? 'cursor-pointer transform hover:scale-105 transition-all duration-300' : ''
        }`}
        title={interactive ? 'Klik Si Gurita untuk melihat respon & ekspresi unik!' : 'Maskot Gurita AI'}
      >
        {/* Soft Ambient Neon Glow Behind Mascot */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2979FF]/20 via-[#00E5FF]/20 to-[#8B5CF6]/30 blur-2xl -z-10 animate-pulse" />

        {/* Floating Props Orbiting Si Gurita */}
        {size === 'hero' && (
          <>
            {/* Prop 1: Digital Book Hologram */}
            <div className="absolute -top-3 -left-4 sm:left-0 p-2.5 rounded-xl bg-[#0B1B31]/90 border border-[#00E5FF]/40 shadow-lg backdrop-blur-md animate-float">
              <div className="flex items-center gap-1.5 text-xs text-[#00E5FF] font-medium">
                <BookOpen className="w-4 h-4 text-[#00E5FF]" />
                <span className="hidden sm:inline">Buku Digital</span>
              </div>
            </div>

            {/* Prop 2: Game Edukasi Die / Controller */}
            <div className="absolute top-1/4 -right-6 sm:-right-2 p-2.5 rounded-xl bg-[#0B1B31]/90 border border-[#FFD166]/40 shadow-lg backdrop-blur-md animate-float-delayed">
              <div className="flex items-center gap-1.5 text-xs text-[#FFD166] font-medium">
                <Gamepad2 className="w-4 h-4 text-[#FFD166]" />
                <span className="hidden sm:inline">Game Edukasi</span>
              </div>
            </div>

            {/* Prop 3: AI Sparkle / Inovasi */}
            <div className="absolute -bottom-2 -left-3 sm:left-4 p-2 rounded-xl bg-[#0B1B31]/90 border border-[#8B5CF6]/40 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-xs text-[#8B5CF6] font-medium">
                <Sparkles className="w-4 h-4 text-[#C084FC]" />
                <span className="hidden sm:inline">AI Adaptif</span>
              </div>
            </div>

            {/* Prop 4: Lightbulb Idea */}
            <div className="absolute -bottom-4 right-2 sm:right-6 p-2 rounded-xl bg-[#0B1B31]/90 border border-[#2979FF]/40 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-xs text-[#2979FF] font-medium">
                <Lightbulb className="w-4 h-4 text-[#FFD166]" />
                <span className="hidden sm:inline">Inspirasi Guru</span>
              </div>
            </div>
          </>
        )}

        {/* Master SVG Mascot Render (3D Spherical & Tactile Shading) */}
        <svg
          viewBox="0 0 320 320"
          className="w-full h-full drop-shadow-[0_15px_35px_rgba(41,121,255,0.35)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Primary Head 3D Gradient */}
            <radialGradient id="guritaHeadGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="35%" stopColor="#2979FF" />
              <stop offset="75%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </radialGradient>

            {/* Secondary Tentacle Gradient */}
            <linearGradient id="guritaTentacleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="50%" stopColor="#2979FF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>

            {/* Gold Cap / Accents */}
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF3BF" />
              <stop offset="50%" stopColor="#FFD166" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>

            {/* Smart Glasses Glass Tint */}
            <linearGradient id="glassLensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#2979FF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
            </linearGradient>

            {/* Cheek blush */}
            <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF6B8B" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF6B8B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* BACK TENTACLES (Giving 3D Depth) */}
          <g opacity="0.85">
            {/* Left Back Tentacle */}
            <path
              d="M75 185 C40 180 20 230 45 260 C65 280 100 250 85 220"
              stroke="url(#guritaTentacleGrad)"
              strokeWidth="20"
              strokeLinecap="round"
            />
            {/* Right Back Tentacle */}
            <path
              d="M245 185 C280 180 300 230 275 260 C255 280 220 250 235 220"
              stroke="url(#guritaTentacleGrad)"
              strokeWidth="20"
              strokeLinecap="round"
            />
          </g>

          {/* MAIN HEAD (Dome Shape with 3D Depth) */}
          <path
            d="M60 160 C60 70 110 35 160 35 C210 35 260 70 260 160 C260 205 235 225 160 225 C85 225 60 205 60 160 Z"
            fill="url(#guritaHeadGrad)"
          />

          {/* Highlight Specular Glow on Head */}
          <ellipse
            cx="125"
            cy="75"
            rx="45"
            ry="25"
            transform="rotate(-20 125 75)"
            fill="#FFFFFF"
            opacity="0.25"
          />

          {/* FRONT TENTACLES (Playful, Waving) */}
          <g>
            {/* Tentacle Left-1 (Holding Stylus) */}
            <path
              d="M85 205 C55 220 35 240 50 275 C60 295 95 290 105 260 C110 240 95 220 90 205"
              fill="url(#guritaTentacleGrad)"
            />
            {/* Suction Cups on Left */}
            <circle cx="45" cy="255" r="5" fill="#00E5FF" opacity="0.8" />
            <circle cx="65" cy="280" r="5.5" fill="#00E5FF" opacity="0.8" />
            <circle cx="95" cy="275" r="5" fill="#00E5FF" opacity="0.8" />

            {/* Tentacle Center-Left */}
            <path
              d="M125 220 C110 250 115 285 135 295 C150 300 160 275 145 250 C140 240 135 230 130 220"
              fill="url(#guritaTentacleGrad)"
            />
            <circle cx="125" cy="270" r="4.5" fill="#00E5FF" opacity="0.8" />
            <circle cx="145" cy="285" r="4.5" fill="#00E5FF" opacity="0.8" />

            {/* Tentacle Center-Right */}
            <path
              d="M195 220 C210 250 205 285 185 295 C170 300 160 275 175 250 C180 240 185 230 190 220"
              fill="url(#guritaTentacleGrad)"
            />
            <circle cx="195" cy="270" r="4.5" fill="#00E5FF" opacity="0.8" />
            <circle cx="175" cy="285" r="4.5" fill="#00E5FF" opacity="0.8" />

            {/* Tentacle Right-1 (Holding Hologram Die) */}
            <path
              d="M235 205 C265 220 285 240 270 275 C260 295 225 290 215 260 C210 240 225 220 230 205"
              fill="url(#guritaTentacleGrad)"
            />
            {/* Suction Cups on Right */}
            <circle cx="275" cy="255" r="5" fill="#00E5FF" opacity="0.8" />
            <circle cx="255" cy="280" r="5.5" fill="#00E5FF" opacity="0.8" />
            <circle cx="225" cy="275" r="5" fill="#00E5FF" opacity="0.8" />
          </g>

          {/* CUTE CHEEKS (Blush) */}
          <ellipse cx="98" cy="165" rx="14" ry="8" fill="url(#blushGrad)" />
          <ellipse cx="222" cy="165" rx="14" ry="8" fill="url(#blushGrad)" />

          {/* SMART FUTURISTIC GLASSES */}
          <g>
            {/* Glasses Frame Bridge */}
            <path
              d="M142 140 C154 136 166 136 178 140"
              stroke="#00E5FF"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Left Lens Frame */}
            <rect
              x="90"
              y="120"
              width="54"
              height="40"
              rx="14"
              fill="url(#glassLensGrad)"
              stroke="#00E5FF"
              strokeWidth="3.5"
            />
            {/* Right Lens Frame */}
            <rect
              x="176"
              y="120"
              width="54"
              height="40"
              rx="14"
              fill="url(#glassLensGrad)"
              stroke="#00E5FF"
              strokeWidth="3.5"
            />

            {/* Lens Reflection Glare */}
            <path
              d="M96 126 L124 126"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M182 126 L210 126"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>

          {/* EYES (Expressive, Animated) */}
          <g>
            {/* Left Eye */}
            {isWinking ? (
              <path
                d="M104 142 Q117 150 130 142"
                stroke="#F8FAFC"
                strokeWidth="4"
                strokeLinecap="round"
              />
            ) : (
              <g>
                <circle cx="117" cy="140" r="11" fill="#071426" />
                <circle cx="120" cy="137" r="4.5" fill="#FFFFFF" />
                <circle cx="114" cy="143" r="2" fill="#00E5FF" />
              </g>
            )}

            {/* Right Eye */}
            <g>
              <circle cx="203" cy="140" r="11" fill="#071426" />
              <circle cx="206" cy="137" r="4.5" fill="#FFFFFF" />
              <circle cx="200" cy="143" r="2" fill="#00E5FF" />
            </g>
          </g>

          {/* MOUTH / SMILE */}
          {mood === 'ceria' && (
            <path
              d="M148 172 Q160 186 172 172"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}
          {mood === 'mengajar' && (
            <path
              d="M146 174 Q160 182 174 174"
              stroke="#FFD166"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}
          {mood === 'ide' && (
            <ellipse cx="160" cy="176" rx="7" ry="9" fill="#071426" stroke="#00E5FF" strokeWidth="2.5" />
          )}

          {/* TEACHER GRADUATION CAP / BERET WITH GOLDEN TASSEL */}
          <g>
            {/* Cap Diamond */}
            <polygon
              points="160,18 220,38 160,56 100,38"
              fill="#0B1B31"
              stroke="#2979FF"
              strokeWidth="2.5"
            />
            {/* Cap Rim */}
            <path
              d="M125 45 C125 58 195 58 195 45"
              fill="#081424"
              stroke="#8B5CF6"
              strokeWidth="2"
            />
            {/* Golden Button & Tassel */}
            <circle cx="160" cy="38" r="4.5" fill="url(#goldGrad)" />
            <path
              d="M160 38 Q185 45 190 68"
              stroke="url(#goldGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="190" cy="70" r="3.5" fill="url(#goldGrad)" />
          </g>

          {/* AI CIRCUIT EMBLEM ON FOREHEAD */}
          <g opacity="0.6">
            <circle cx="160" cy="98" r="5" fill="#00E5FF" />
            <line x1="160" y1="93" x2="160" y2="85" stroke="#00E5FF" strokeWidth="1.5" />
            <line x1="155" y1="98" x2="147" y2="98" stroke="#00E5FF" strokeWidth="1.5" />
            <line x1="165" y1="98" x2="173" y2="98" stroke="#00E5FF" strokeWidth="1.5" />
          </g>
        </svg>

        {/* Small Interaction Badge */}
        {interactive && (
          <div className="absolute -bottom-1 px-2.5 py-0.5 rounded-full bg-[#0E223D]/90 border border-[#2979FF]/40 text-[10px] text-cyan-300 font-mono tracking-wide shadow-sm flex items-center gap-1">
            <Heart className="w-2.5 h-2.5 text-[#FFD166] animate-pulse" />
            <span>Klik Saya</span>
          </div>
        )}
      </div>
    </div>
  );
};
