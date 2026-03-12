import { GameContext, GameProvider } from '@/components/models/gameContext';
import { Stack } from 'expo-router';
import GameRouter from '@/components/models/gameRouter';
import React, { useContext } from 'react';
import { ErrorView } from '../components/phases/error';
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


