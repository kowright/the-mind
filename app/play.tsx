import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { MistakeView } from '@/components/phases/mistake';
import { GameplayView } from '@/components/phases/gamePlayView';
import React from 'react';
import { TransitionView } from '../components/phases/transition';
import { LevelResultView } from '../components/phases/levelResult';
import { ShurikenView } from '../components/phases/shuriken';
import { mistakeWaitTime, shurikenWaitTime, startLevelWaitTime } from '../shared/utils/utils';
import { ErrorView } from '../components/phases/error';
import { GameOverlayView } from '../components/models/gameOverlay';
import { theme, themeStyles } from '../theme/theme';
import { useCountdown } from '../hooks/useCountdown';
import { PauseView } from '../components/phases/pause';

export default function PlayView() {
    const { state, playerId } = useGame();
    console.log('state paused', state.paused)
    const player = state.players.find(p => p.id === playerId);

    const countdown = useCountdown({
        start:
            (state.gamePhase === "startLevel" && state.readyToStartPlayers.length > 0
                ? startLevelWaitTime
                : state.gamePhase === "shuriken"
                    ? shurikenWaitTime
                    : state.gamePhase === "mistake"
                        ? mistakeWaitTime
                        : 0),

    });

    const inAskToStartPhase = state.readyToStartPlayers.length > 0;

    return (

        <View style={styles.container}>
            <Text style={styles.nameText}>{player?.name || 'Unnamed Player'}</Text>

            <GameplayView agreeToStartVersion={state.gamePhase === 'agreeToStart'} discardPileStacked={true} />
            
            {state.gamePhase === 'mistake' && (
                <MistakeView countdown={countdown} />
            )}

            {state.gamePhase === 'startLevel' && inAskToStartPhase && (
                <TransitionView countdown={countdown} />
            )}

            {state.gamePhase === 'shuriken' && (
                <ShurikenView countdown={countdown} />
            )}

            {state.gamePhase === 'error' && (
                <ErrorView errorMessage={state.errorMessage} />
            )}

            {state.gamePhase === 'levelComplete' && !inAskToStartPhase && (
                <GameOverlayView>
                    <LevelResultView />
                </GameOverlayView>
            )}

            {state.gamePhase === 'pause' && state.paused && (
                <PauseView />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: theme.color.gameBackground.backgroundColor,
    },
    nameText: {
       ...themeStyles.small,
        backgroundColor: theme.color.brand.primary,
        textAlign: 'center'
    },
});