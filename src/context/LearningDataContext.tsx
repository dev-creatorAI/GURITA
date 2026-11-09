import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { StructuredLearningData } from '../types/sharedLearningData';

interface LearningDataContextType {
  activeLearningData: StructuredLearningData | null;
  importedForGame: boolean;
  importedForMedia: boolean;
  transferToGameStudio: (data: StructuredLearningData) => void;
  transferToMediaGenerator: (data: StructuredLearningData) => void;
  clearGameStudioData: () => void;
  clearMediaGeneratorData: () => void;
  clearAllLearningData: () => void;
  scrollToSection: (sectionId: string) => void;
}

const LearningDataContext = createContext<LearningDataContextType | undefined>(undefined);

const STORAGE_KEY_DATA = 'gurita_active_learning_data';
const STORAGE_KEY_GAME_FLAG = 'gurita_flag_imported_game';
const STORAGE_KEY_MEDIA_FLAG = 'gurita_flag_imported_media';

export const LearningDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeLearningData, setActiveLearningData] = useState<StructuredLearningData | null>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_DATA);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [importedForGame, setImportedForGame] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_GAME_FLAG) === 'true';
    } catch {
      return false;
    }
  });

  const [importedForMedia, setImportedForMedia] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_MEDIA_FLAG) === 'true';
    } catch {
      return false;
    }
  });

  // Save changes to sessionStorage
  useEffect(() => {
    try {
      if (activeLearningData) {
        sessionStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(activeLearningData));
      } else {
        sessionStorage.removeItem(STORAGE_KEY_DATA);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [activeLearningData]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_GAME_FLAG, importedForGame ? 'true' : 'false');
    } catch {}
  }, [importedForGame]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_MEDIA_FLAG, importedForMedia ? 'true' : 'false');
    } catch {}
  }, [importedForMedia]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Add brief focus highlight pulse
      el.classList.add('ring-2', 'ring-[#00E5FF]', 'ring-offset-4', 'ring-offset-[#071426]');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-[#00E5FF]', 'ring-offset-4', 'ring-offset-[#071426]');
      }, 2500);
    }
  };

  const transferToGameStudio = (data: StructuredLearningData) => {
    setActiveLearningData(data);
    setImportedForGame(true);
    // Smooth scroll to game studio
    setTimeout(() => {
      scrollToSection('game-studio');
    }, 100);
  };

  const transferToMediaGenerator = (data: StructuredLearningData) => {
    setActiveLearningData(data);
    setImportedForMedia(true);
    // Smooth scroll to generator media
    setTimeout(() => {
      scrollToSection('generator-media');
    }, 100);
  };

  const clearGameStudioData = () => {
    setImportedForGame(false);
  };

  const clearMediaGeneratorData = () => {
    setImportedForMedia(false);
  };

  const clearAllLearningData = () => {
    setActiveLearningData(null);
    setImportedForGame(false);
    setImportedForMedia(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY_DATA);
      sessionStorage.removeItem(STORAGE_KEY_GAME_FLAG);
      sessionStorage.removeItem(STORAGE_KEY_MEDIA_FLAG);
    } catch {}
  };

  return (
    <LearningDataContext.Provider
      value={{
        activeLearningData,
        importedForGame,
        importedForMedia,
        transferToGameStudio,
        transferToMediaGenerator,
        clearGameStudioData,
        clearMediaGeneratorData,
        clearAllLearningData,
        scrollToSection
      }}
    >
      {children}
    </LearningDataContext.Provider>
  );
};

export const useLearningData = (): LearningDataContextType => {
  const context = useContext(LearningDataContext);
  if (!context) {
    throw new Error('useLearningData must be used within a LearningDataProvider');
  }
  return context;
};
