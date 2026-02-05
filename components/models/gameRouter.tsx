// will always still mounted so when gamePhase changes, this reacts
import { useGame } from '@/hooks/useGame';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Redirect } from 'expo-router';

export default function GameRouter() {
    const { state } = useGame();

    if (!state) return null;

    switch (state.gamePhase) {
        case 'setup':
            return <Redirect href="(tabs)" />;

        case 'playing':
            return <Redirect href="play" />;

        case 'gameOver':
            return <Redirect href="gameResult" />;

        default:
            return null;
    }
}
