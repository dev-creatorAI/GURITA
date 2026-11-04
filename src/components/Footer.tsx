import React from 'react';
import { Heart, Instagram, ExternalLink, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-[#2979FF]/15 bg-[#040C17] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Platform Info (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#2979FF] via-[#00E5FF] to-[#8B5CF6] p-0.5 shadow-md">
                <div className="w-full h-full bg-[#071426] rounded-[10px] flex items-center justify-center font-extrabold text-white text-sm">
                  G
                </div>
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block">
                  GURITA
                </span>
                <span className="text-xs text-[#00E5FF] font-medium block">
                  Guru Riang dengan Teknologi AI
                </span>
              </div>
            </div>

            <p className="text-[#FFD166] text-xs font-semibold tracking-wide pt-1">
              "Guru Kreatif, Teknologi Adaptif, Siswa Inspiratif."
            </p>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Platform eksplorasi teknologi AI interaktif bagi guru dan pendidik di semua jenjang untuk belajar, berkreasi, dan menciptakan media serta game edukasi bermakna.
            </p>
          </div>

          {/* Navigasi Utama (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              Tautan Navigasi
            </h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              <button
                onClick={() => scrollTo('beranda')}
                className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left text-xs text-slate-400 hover:underline"
              >
                Beranda
              </button>
              <button
                onClick={() => scrollTo('tentang')}
                className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left text-xs text-slate-400 hover:underline"
              >
                Tentang GURITA
              </button>
              <button
                onClick={() => scrollTo('eksplorasi')}
                className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left text-xs text-slate-400 hover:underline"
              >
                Eksplorasi AI
              </button>
              <button
                onClick={() => scrollTo('materi')}
                className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left text-xs text-slate-400 hover:underline"
              >
                Materi Workshop
              </button>
              <button
                onClick={() => scrollTo('prompt-lab')}
                className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left text-xs text-slate-400 hover:underline"
              >
                Prompt Lab
              </button>
              <button
                onClick={() => scrollTo('game-studio')}
                className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left text-xs text-slate-400 hover:underline"
              >
                Game Studio
              </button>
              <button
                onClick={() => scrollTo('generator-media')}
                className="hover:text-[#00E5FF] transition-colors cursor-pointer text-left text-xs text-slate-400 hover:underline"
              >
                Generator Media ChatGPT
              </button>
            </div>
          </div>

          {/* Terhubung Bersama GURITA - Media Sosial Resmi (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              Terhubung Bersama GURITA
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ikuti inspirasi pembelajaran, tutorial prompt, dan inovasi teknologi AI edukasi melalui kanal resmi:
            </p>

            <div className="pt-2 flex flex-col gap-2.5">
              {/* TikTok Link */}
              <a
                href="https://www.tiktok.com/@de_vita30?_r=1&_t=ZS-9AtZ7jwAgA2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kunjungi akun TikTok resmi GURITA"
                className="p-2.5 rounded-xl bg-[#0E223D] hover:bg-[#122A4E] border border-slate-800 hover:border-[#00E5FF]/40 text-slate-200 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#071426] flex items-center justify-center text-white p-1">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#00E5FF]">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.3 6.3 0 0 0 1.86-4.46V8.78a8.18 8.18 0 0 0 4.91 1.63V6.96a4.84 4.84 0 0 1-1-.27z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white block group-hover:text-[#00E5FF] transition-colors">
                      TikTok
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">@de_vita30</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00E5FF] transition-colors" />
              </a>

              {/* Instagram Link */}
              <a
                href="https://www.instagram.com/flowersfirsya?dlrf=MWc5YnJrdndud3o0bw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kunjungi akun Instagram resmi GURITA"
                className="p-2.5 rounded-xl bg-[#0E223D] hover:bg-[#122A4E] border border-slate-800 hover:border-[#8B5CF6]/40 text-slate-200 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#071426] flex items-center justify-center text-white p-1">
                    <Instagram className="w-4 h-4 text-[#C084FC]" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white block group-hover:text-[#C084FC] transition-colors">
                      Instagram
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">@flowersfirsya</span>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#C084FC] transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© 2026 GURITA — Guru Riang dengan Teknologi AI. Hak Cipta Dilindungi.</p>
          <p className="font-mono text-[11px] text-slate-400">Developed by. Devita Anjilia,S.Pd &amp; Syamsiyah,S.Kom</p>
        </div>
      </div>
    </footer>
  );
};
