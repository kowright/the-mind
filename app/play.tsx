// actual card showing view
import { Text, View } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
import { Platform, StyleSheet, Pressable } from 'react-native';
import { CardView } from '@/components/models/card';
import { Level, levels, RewardType } from "@/shared/types/level";
import { MistakeView } from '@/components/phases/mistake';
import { FakeGameplayView } from '@/components/phases/fakeGameplayView';
import { GameplayView } from '@/components/phases/gamePlayView';

import React, { useEffect, useState } from 'react';
import { DiscardPileView } from '../components/models/discardPile';
import { LevelResultView } from '../components/phases/levelResult';
import { ShurikenView } from '../components/phases/shuriken';
import { countdownInterval, mistakeWaitTime, shurikenWaitTime, startLevelWaitTime } from '../shared/utils/utils';

interface PlayViewProps {

}

export default function PlayView() {
    console.log("play view rendering");
    const { state, playerId } = useGame();
    const [countdown, setCountdown] = useState(3);

    const player = state.players.find(p => p.id === playerId);

    // TODO: loading screen

    useEffect(() => {
        if (!state) return;

        if (state.gamePhase === 'transition') { 
            console.log('play screen, in transition phase')
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
        
    }, [state.gamePhase]);


    const inAskToStartPhase = state.readyToStartPlayers.length > 0;

    return (
        <View>
            <Text>{player?.name}</Text>
            {state.gamePhase === 'playing' || state.gamePhase === 'mistake' ? (
                <>
                    <GameplayView agreeToStartVersion={false} />

                    {state.gamePhase === 'mistake' ? (
                        <MistakeView countdown={countdown} />
                        ) : (<></>)
                    }

                        <DiscardPileView />
                 
                </>
            ) : state.gamePhase === 'transition' ? (
                <>
                        <Text>TRANSITION</Text>
                        {inAskToStartPhase ?
                            (<Text>START IN: {countdown}</Text>) :
                            (
                                <LevelResultView />
                            )}
                    </>

            ) : state.gamePhase === 'shuriken' ? (
                        <ShurikenView countdown={countdown} />
             
            ) : (state.readyToStartPlayers.length > 0 || state.gamePhase === 'agreeToStart') ? (
                <GameplayView agreeToStartVersion={true} />

            ) : (
            <Text>SOMETHING ELSE, maybe loading or something</Text>
            )

            } 
        </View>
    );
}