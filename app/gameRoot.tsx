import { Stack } from 'expo-router';
import { useGame } from '@/hooks/useGame';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function GameRoot() {

    const { state } = useGame();
    console.log('gameRoot rendering')

/*    return (
        <Stack>
            {state.gamePhase === 'setup' && <Stack.Screen name="(tabs)" />}
            {state.gamePhase === 'playing' && <Stack.Screen name="play" />}
            {state.gamePhase === 'gameOver' && <Stack.Screen name="result" />}
        </Stack>
    );*/



        const router = useRouter();
    useEffect(() => {
        if (!state) return;

        // Delay navigation until after mounting
        const timeout = setTimeout(() => {
            switch (state.gamePhase) {
                case 'setup':
                    router.replace('(tabs)');
                    break;
                case 'playing':
                    router.replace('play');
                    break;
                case 'gameOver':
                    router.replace('gameResult');
                    break;
            }
        }, 0);

        return () => clearTimeout(timeout);
    }, [state?.gamePhase]); // ensure mounting happens after the first render with 

    return null;
    }



