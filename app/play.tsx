import { Text, View } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { MistakeView } from '@/components/phases/mistake';
import { GameplayView } from '@/components/phases/gamePlayView';
import React, { useEffect, useState } from 'react';
import { TransitionView } from '../components/phases/transition';
import { LevelResultView } from '../components/phases/levelResult';
import { ShurikenView } from '../components/phases/shuriken';
import { countdownInterval, mistakeWaitTime, shurikenWaitTime, startLevelWaitTime } from '../shared/utils/utils';
import { ErrorView } from '../components/phases/error';

interface PlayViewProps {

}

export default function PlayView() {
    const { state, playerId } = useGame();
    const [countdown, setCountdown] = useState(3);

    const player = state.players.find(p => p.id === playerId);

    useEffect(() => {
        if (!state) return;

        if (state.gamePhase === 'transition') { 
            if (state.readyToStartPlayers.length > 0) {
                // agreeToStart to playing transition to show countdown
                
                setCountdown(startLevelWaitTime);

                const interval = setInterval(() => {
                    setCountdown(prev => prev - 1);
                }, countdownInterval);

                return () => clearInterval(interval);

            }
        }

        if (state.gamePhase === 'shuriken') {
            setCountdown(shurikenWaitTime);

            const interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, countdownInterval);

            return () => clearInterval(interval);
        }


        if (state.gamePhase === 'mistake') {
            setCountdown(mistakeWaitTime);

            const interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, countdownInterval);

            return () => clearInterval(interval);
        }
        
    }, [state.gamePhase, state.readyToStartPlayers.length]);


    const inAskToStartPhase = state.readyToStartPlayers.length > 0;

    return (

        <View style={{ flex: 1 }}>
            <Text>{player?.name}</Text>

          

            {state.gamePhase === 'playing' || state.gamePhase === 'agreeToStart' || state.gamePhase === 'mistake' || state.gamePhase === 'shuriken' || state.gamePhase === 'error' ? (
                <GameplayView agreeToStartVersion={state.gamePhase === 'agreeToStart'} />
            ) : state.gamePhase === 'transition' && !inAskToStartPhase ? (
                <LevelResultView />
            ) : null}
   
          

            {state.gamePhase === 'mistake' && (
                <MistakeView countdown={countdown} />
            )}

            {state.gamePhase === 'transition' && inAskToStartPhase && (
                <TransitionView countdown={countdown} />
            )}

            {state.gamePhase === 'shuriken' && (
                <ShurikenView countdown={countdown} />
            )}

            {state.gamePhase === 'error' && (
                <ErrorView />
            )}

            {state.gamePhase === 'transition' && inAskToStartPhase && (
                
                <Text>HI</Text>
           
            )}
        </View>
    );

}