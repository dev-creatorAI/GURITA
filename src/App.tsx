/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { MateriSection } from './components/MateriSection';
import { PromptLabSection } from './components/PromptLabSection';
import { GameStudioSection } from './components/GameStudioSection';
import { MediaGeneratorSection } from './components/MediaGeneratorSection';
import { GuritaProSection } from './components/GuritaProSection';
import { ClosingCtaSection } from './components/ClosingCtaSection';
import { Footer } from './components/Footer';
import { LearningDataProvider } from './context/LearningDataContext';

export default function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LearningDataProvider>
      <div className="min-h-screen bg-[#071426] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#2979FF]/40 selection:text-[#00E5FF]">
      {/* Top Navigation Bar */}
      <Navbar onNavigateToStudio={() => scrollTo('game-studio')} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <Hero
          onStartExploration={() => scrollTo('tentang')}
          onTryGame={() => scrollTo('game-studio')}
        />

        {/* 1. SECTION TENTANG GURITA */}
        <AboutSection onNavigate={(sectionId) => scrollTo(sectionId)} />

        {/* 2. SECTION MATERI: Slide Presentasi Interaktif */}
        <MateriSection />

        {/* 3. PROMPT LAB: GENERATOR MODUL AJAR KURIKULUM MENDALAM */}
        <PromptLabSection />

        {/* 4. GAME STUDIO: GENERATOR PROMPT GAME GEMINI CANVAS & PLAYTEST */}
        <GameStudioSection />

        {/* 5. GENERATOR MEDIA PEMBELAJARAN (Prompt Desain AI Siap Pakai untuk ChatGPT) */}
        <MediaGeneratorSection />

        {/* 6. GURITA PRO: SUITE FITUR LANJUTAN MASA DEPAN (SOON) */}
        <GuritaProSection />

        {/* 7. SECTION PENUTUP */}
        <ClosingCtaSection onStartExploration={() => scrollTo('tentang')} />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
    </LearningDataProvider>
  );
}
