// actual card showing view
import { Text, View } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
import { Platform, StyleSheet, Pressable } from 'react-native';
import { CardView } from '@/components/models/card';
import { Level, levels, RewardType } from "@/types/level";
import { MistakeView } from '@/components/phases/mistake';
import { GameplayView } from '@/components/phases/gameplayView'

import React, { useEffect, useState } from 'react';
import { DiscardPileView } from '../components/models/discardPile';
import { TransitionView } from '../components/phases/transition';
import { ShurikenView } from '../components/phases/shuriken';

interface PlayViewProps {

}

export default function PlayView() {
    console.log("play view rendering");
   
    const { dispatch, state } = useGame();
    const [countdown, setCountdown] = useState(3);


    useEffect(() => {
        if (!state) return;

        if (state.gamePhase === 'transition') {

            if (state.readyToStartPlayers.length > 0) {
                // agreeToStart to playing transition
                setCountdown(3);

                const interval = setInterval(() => {
                    setCountdown(prev => prev - 1);
                }, 1000);

                return () => clearInterval(interval);

            }
            else {
                // level to level transition
                const timeout = setTimeout(() => {
                    dispatch({ type: 'LEVEL_START' });
                }, 3000);

                return () => clearTimeout(timeout); // cleanup if component unmounts
            }
        }

        if (state.gamePhase === 'shuriken') {
            dispatch({ type: 'SHURIKEN_CALLED' });

            const timeout = setTimeout(() => {
                dispatch({ type: 'SHURIKEN_OVER' });
            }, 5000);

            return () => clearTimeout(timeout); 
        }

        if (state.gamePhase === 'mistake') {
            setCountdown(3);

            const interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
        
    }, [state.gamePhase, dispatch, state]);

    useEffect(() => {
        if (countdown === 0) {
            dispatch({ type: 'TRANSITION_TO_PLAYING' });
        }
    }, [countdown, state.gamePhase, dispatch]);


    const inAskToStartPhase = state.readyToStartPlayers.length > 0;

    return (
        <View>
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
                                <TransitionView />
                            )}
                    </>

            ) : state.gamePhase === 'shuriken' ? (
                <ShurikenView />
             
            ) : (state.readyToStartPlayers.length > 0 || state.gamePhase === 'agreeToStart') ? (
                <GameplayView agreeToStartVersion={true} />

            ) : (
            <Text>SOMETHING ELSE, maybe loading or something</Text>
            )

            } 
        </View>
    );
}