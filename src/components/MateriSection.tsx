import React, { useState, useEffect, useRef } from 'react';
import { PRESENTATION_DECKS, PresentationDeck, SlideItem } from '../data/slideData';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Compass,
  Terminal,
  Clock,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Layers,
  ArrowLeft
} from 'lucide-react';

export const MateriSection: React.FC = () => {
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  // Touch swipe support variables
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  const activeDeck = PRESENTATION_DECKS.find((d) => d.id === activeDeckId) || null;
  const currentSlide: SlideItem | null =
    activeDeck && activeDeck.slides[currentSlideIndex] ? activeDeck.slides[currentSlideIndex] : null;

  const handleOpenDeck = (deckId: string, startIndex = 0) => {
    setActiveDeckId(deckId);
    setCurrentSlideIndex(startIndex);
  };

  const handleBackToDecks = () => {
    setActiveDeckId(null);
    setCurrentSlideIndex(0);
  };

  const handlePrevSlide = () => {
    if (!activeDeck) return;
    setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextSlide = () => {
    if (!activeDeck) return;
    setCurrentSlideIndex((prev) => Math.min(activeDeck.slides.length - 1, prev + 1));
  };

  const handleJumpToSlide = (index: number) => {
    if (!activeDeck) return;
    if (index >= 0 && index < activeDeck.slides.length) {
      setCurrentSlideIndex(index);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!activeDeck) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.min(activeDeck.slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else {
          handleBackToDecks();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDeck]);

  // Fullscreen change listener
  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!slideContainerRef.current) return;
    if (!document.fullscreenElement) {
      slideContainerRef.current.requestFullscreen().catch((err) => {
        console.warn('Gagal masuk mode layar penuh:', err);
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Touch Swipe Handlers (safe horizontal vs vertical check)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!activeDeck) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - touchStartX.current;
    const deltaY = endY - touchStartY.current;

    // Check if horizontal movement is dominant and > 45px
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        // swipe left -> next slide
        handleNextSlide();
      } else {
        // swipe right -> prev slide
        handlePrevSlide();
      }
    }
  };

  // Helper for accent badge styling
  const getAccentTheme = (accent: string) => {
    switch (accent) {
      case 'yellow':
        return {
          border: 'border-[#FFD166]/40',
          bgBadge: 'bg-[#FFD166]/15 text-[#FFD166] border-[#FFD166]/30',
          glow: 'shadow-[#FFD166]/10',
          text: 'text-[#FFD166]',
          cardBorder: 'border-[#FFD166]/30'
        };
      case 'purple':
        return {
          border: 'border-[#8B5CF6]/40',
          bgBadge: 'bg-[#8B5CF6]/15 text-[#C084FC] border-[#8B5CF6]/30',
          glow: 'shadow-[#8B5CF6]/10',
          text: 'text-[#C084FC]',
          cardBorder: 'border-[#8B5CF6]/30'
        };
      case 'blue':
        return {
          border: 'border-[#2979FF]/40',
          bgBadge: 'bg-[#2979FF]/15 text-[#60A5FA] border-[#2979FF]/30',
          glow: 'shadow-[#2979FF]/10',
          text: 'text-[#60A5FA]',
          cardBorder: 'border-[#2979FF]/30'
        };
      case 'cyan':
      default:
        return {
          border: 'border-[#00E5FF]/40',
          bgBadge: 'bg-[#00E5FF]/15 text-[#00E5FF] border-[#00E5FF]/30',
          glow: 'shadow-[#00E5FF]/10',
          text: 'text-[#00E5FF]',
          cardBorder: 'border-[#00E5FF]/30'
        };
    }
  };

  return (
    <section id="materi" className="py-20 md:py-28 relative bg-[#06101F]/80 border-y border-[#2979FF]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00E5FF]">
            <BookOpen className="w-4 h-4 text-[#FFD166]" />
            <span>Presentasi Pembelajaran Interaktif Guru & Pendidik Semua Jenjang</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Materi
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Materi berbasis slide interaktif dengan bahasa yang ringkas, mudah dipahami, bebas paragraf panjang, dan dilengkapi contoh nyata penerapan di kelas.
          </p>
        </div>

        {/* MODE 1: DECK SELECTION (When no deck is active) */}
        {!activeDeck && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
            {PRESENTATION_DECKS.map((deck) => {
              const theme = getAccentTheme(deck.accent);
              const isFirst = deck.id === 'materi-1';

              return (
                <div
                  key={deck.id}
                  className={`p-8 rounded-3xl bg-[#0B1B31] border ${theme.border} hover:border-[#00E5FF]/60 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative shadow-xl`}
                >
                  <div className="space-y-6">
                    {/* Badge Strip */}
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${theme.bgBadge}`}>
                        {isFirst ? 'Presentasi 01' : 'Presentasi 02'}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <Clock className="w-3.5 h-3.5 text-[#FFD166]" />
                        <span>{deck.estimatedTime}</span>
                        <span>·</span>
                        <span>{deck.totalSlides} Slide</span>
                      </div>
                    </div>

                    {/* Title & Icon */}
                    <div className="space-y-2">
                      <div className="p-3.5 rounded-2xl bg-[#071426] border border-slate-800 w-fit group-hover:scale-105 transition-transform">
                        {isFirst ? (
                          <Compass className="w-7 h-7 text-[#00E5FF]" />
                        ) : (
                          <Terminal className="w-7 h-7 text-[#FFD166]" />
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-[#00E5FF] transition-colors leading-snug">
                        {deck.title}
                      </h3>
                      <p className={`text-xs font-semibold ${theme.text}`}>{deck.subtitle}</p>
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {deck.description}
                    </p>

                    {/* Key Topics Preview */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                        Cakupan Bahasan Slide:
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                        {deck.slides.slice(1, 7).map((slide) => (
                          <div key={slide.id} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                            <span className="truncate">{slide.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Button: Buka Presentasi */}
                  <div className="pt-8">
                    <button
                      onClick={() => handleOpenDeck(deck.id, 0)}
                      className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#2979FF] to-[#00E5FF] text-white font-bold text-sm hover:shadow-lg hover:shadow-[#2979FF]/30 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer group/btn"
                    >
                      <Sparkles className="w-4 h-4 text-[#FFD166]" />
                      <span>Buka Presentasi Slide ({deck.totalSlides} Slide)</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MODE 2: INTERACTIVE SLIDE DECK PLAYER */}
        {activeDeck && currentSlide && (
          <div
            ref={slideContainerRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className={`w-full rounded-3xl bg-[#071426] border border-[#2979FF]/30 shadow-2xl overflow-hidden transition-all duration-300 flex flex-col ${
              isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : 'relative min-h-[580px]'
            }`}
          >
            {/* Top Toolbar */}
            <div className="px-6 py-4 bg-[#0A182B]/90 border-b border-[#2979FF]/20 flex flex-wrap items-center justify-between gap-4 select-none">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToDecks}
                  className="px-3 py-1.5 rounded-xl bg-[#071426] hover:bg-[#122A4E] border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Kembali ke Materi</span>
                </button>

                <div className="hidden sm:block h-4 w-px bg-slate-700" />

                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white truncate max-w-xs md:max-w-md">
                    {activeDeck.title}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">·</span>
                  <span className="text-xs text-[#FFD166] font-mono">
                    Slide {currentSlideIndex + 1} dari {activeDeck.slides.length}
                  </span>
                </div>
              </div>

              {/* Controls on the right */}
              <div className="flex items-center gap-2 ml-auto">
                {/* Slide Quick Select dropdown */}
                <select
                  value={currentSlideIndex}
                  onChange={(e) => handleJumpToSlide(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded-xl bg-[#071426] border border-slate-700 text-xs text-slate-300 focus:outline-none focus:border-[#00E5FF]"
                >
                  {activeDeck.slides.map((s, idx) => (
                    <option key={s.id} value={idx}>
                      Slide {idx + 1}: {s.title.slice(0, 32)}...
                    </option>
                  ))}
                </select>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  title={isFullscreen ? 'Keluar Layar Penuh' : 'Mode Layar Penuh'}
                  className="p-2 rounded-xl bg-[#071426] hover:bg-[#122A4E] border border-slate-700 text-slate-300 hover:text-[#00E5FF] transition-colors cursor-pointer"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Slide Body Canvas (16:9 like presentation viewport) */}
            <div className="flex-1 p-6 sm:p-10 md:p-12 flex flex-col justify-between relative overflow-y-auto">
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#2979FF]/10 via-[#00E5FF]/5 to-transparent blur-3xl pointer-events-none -z-0" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#8B5CF6]/10 to-transparent blur-3xl pointer-events-none -z-0" />

              <div className="relative z-10 space-y-6 max-w-5xl mx-auto w-full">
                {/* Slide Category & Key Idea Tag */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#0E223D] border border-[#00E5FF]/30 text-[#00E5FF]">
                      {currentSlide.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      #{String(currentSlide.slideNumber).padStart(2, '0')}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 italic hidden md:inline">
                    Gunakan tombol panah keyboard ← → untuk navigasi
                  </span>
                </div>

                {/* Slide Title */}
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    {currentSlide.title}
                  </h3>
                  {currentSlide.subtitle && (
                    <p className="text-sm sm:text-lg text-[#FFD166] font-medium font-mono">
                      {currentSlide.subtitle}
                    </p>
                  )}
                </div>

                {/* Key Idea Callout Box */}
                {currentSlide.keyIdea && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#0B1B31]/90 border-l-4 border-l-[#00E5FF] border border-[#2979FF]/20 shadow-md">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[11px] font-mono uppercase font-bold text-[#00E5FF] block tracking-wider">
                          Gagasan Utama:
                        </span>
                        <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed mt-0.5">
                          {currentSlide.keyIdea}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* SLIDE CONTENT VARIATION: BULLET POINTS */}
                {currentSlide.points && (
                  <div className="space-y-3 pt-2">
                    {currentSlide.points.map((pt, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#0B1B31]/70 border border-slate-800 hover:border-[#2979FF]/40 transition-colors flex items-start gap-3.5"
                      >
                        <div className="w-6 h-6 rounded-lg bg-[#2979FF]/20 border border-[#2979FF]/40 text-[#00E5FF] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                          {pt}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* SLIDE CONTENT VARIATION: VISUAL CARDS GRID */}
                {currentSlide.cards && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {currentSlide.cards.map((card, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-[#0B1B31] border border-[#2979FF]/25 hover:border-[#00E5FF]/60 hover:shadow-lg transition-all space-y-2 flex flex-col justify-between"
                      >
                        <div>
                          {card.tag && (
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#071426] text-[#00E5FF] border border-slate-800 inline-block mb-2">
                              {card.tag}
                            </span>
                          )}
                          <h4 className="text-base font-bold text-white">{card.title}</h4>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-1">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SLIDE CONTENT VARIATION: DIAGRAM ALUR */}
                {currentSlide.diagram && (
                  <div className="pt-2 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {currentSlide.diagram.steps.map((st, idx) => (
                        <div
                          key={idx}
                          className={`p-5 rounded-2xl border transition-all relative ${
                            st.isHuman
                              ? 'bg-[#0E223D] border-[#FFD166]/60 shadow-lg shadow-[#FFD166]/10'
                              : 'bg-[#0B1B31] border-[#2979FF]/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                                st.isHuman
                                  ? 'bg-[#FFD166]/20 text-[#FFD166] border border-[#FFD166]/40'
                                  : 'bg-[#2979FF]/20 text-[#00E5FF] border border-[#2979FF]/40'
                              }`}
                            >
                              Tahap {st.number}
                            </span>
                            {st.isHuman && (
                              <span className="text-[10px] font-mono text-[#FFD166] uppercase font-bold">
                                Penentu Akhir
                              </span>
                            )}
                          </div>
                          <h4 className="text-base font-bold text-white mb-1">{st.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">{st.desc}</p>
                        </div>
                      ))}
                    </div>

                    {currentSlide.diagram.note && (
                      <p className="text-xs text-slate-400 italic text-center pt-2">
                        {currentSlide.diagram.note}
                      </p>
                    )}
                  </div>
                )}

                {/* SLIDE CONTENT VARIATION: SIDE-BY-SIDE COMPARISON */}
                {currentSlide.comparison && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Left Box */}
                    <div className="p-6 rounded-2xl bg-[#0B1B31] border border-emerald-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>{currentSlide.comparison.titleLeft}</span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                        {currentSlide.comparison.itemsLeft.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Box */}
                    <div className="p-6 rounded-2xl bg-[#0B1B31] border border-amber-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{currentSlide.comparison.titleRight}</span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                        {currentSlide.comparison.itemsRight.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* SLIDE CONTENT VARIATION: CLOSING QUOTE */}
                {currentSlide.quote && (
                  <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0E223D] via-[#0B1B31] to-[#071426] border border-[#00E5FF]/40 text-center space-y-5 my-4 shadow-2xl">
                    <p className="text-lg sm:text-2xl text-white font-medium italic leading-relaxed max-w-3xl mx-auto">
                      "{currentSlide.quote.text}"
                    </p>
                    <div className="pt-2">
                      <span className="text-xs sm:text-sm font-mono font-bold text-[#FFD166] tracking-wider uppercase block">
                        — {currentSlide.quote.author}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Nav Controller inside Slide Viewport */}
              <div className="relative z-10 pt-8 mt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Progress Indicators (Dots) */}
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
                  {activeDeck.slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleJumpToSlide(idx)}
                      aria-label={`Pindah ke slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === currentSlideIndex
                          ? 'w-7 bg-[#00E5FF]'
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>

                {/* Arrows & Counter */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrevSlide}
                    disabled={currentSlideIndex === 0}
                    className="p-2.5 rounded-xl bg-[#0E223D] hover:bg-[#122A4E] disabled:opacity-40 disabled:cursor-not-allowed border border-slate-700 text-white transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#00E5FF]" />
                    <span className="hidden sm:inline">Sebelumnya</span>
                  </button>

                  <div className="px-3 py-1 rounded-xl bg-[#071426] border border-slate-800 font-mono text-xs font-bold text-[#FFD166]">
                    {currentSlideIndex + 1} / {activeDeck.slides.length}
                  </div>

                  <button
                    onClick={handleNextSlide}
                    disabled={currentSlideIndex === activeDeck.slides.length - 1}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-[#2979FF] to-[#00E5FF] hover:shadow-lg hover:shadow-[#2979FF]/30 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold"
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
