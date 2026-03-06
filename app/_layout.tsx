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
   // const game = useContext(GameContext);

    //if (game?.socketError) {
    //    console.log('Root Layout Socket Error')
    //    return <ErrorView />;
    //}
  return (
      //<GameProvider>
      //    {game?.socketError && <ErrorView />}
      //    <GameRouter/>
      //    <Stack>
      //        <Stack.Screen name="play" />
      //        <Stack.Screen name="gameResult" />
      //        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      //    {/*    <Stack.Screen name="modal" options={{ presentation: 'modal' }} />*/}
      //    </Stack>
      //</GameProvider>
      <GameProvider>
          <AppContent />
      </GameProvider>
  );
}


