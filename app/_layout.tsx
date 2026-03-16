import { GameProvider } from '@/components/models/gameContext';
import React from 'react';
import { AppContent } from '../components/models/appContent';

export const unstable_settings = {
  anchor: '(tabs)',
};
export default function RootLayout() {

  return (
      <GameProvider>
          <AppContent />
      </GameProvider>
  );
}


