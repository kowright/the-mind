import { GameProvider } from '@/components/models/gameContext';
import 'react-native-reanimated';
import { Stack, Slot } from 'expo-router';
import GameRouter from '@/components/models/gameRouter';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  return (
      <GameProvider>
          <GameRouter/>
          <Stack>
{/*              <Stack.Screen name="gameRoot" />*/}
              <Stack.Screen name="play" />
              <Stack.Screen name="gameResult" />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
      </GameProvider>
   
  );
}


