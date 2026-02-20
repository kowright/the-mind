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
import { TransitionView } from '../components/phases/transition';
import { ShurikenView } from '../components/phases/shuriken';

interface PlayViewProps {

}

export default function PlayView() {
    console.log("play view rendering");
    const { dispatch, state } = useGame();
    const [countdown, setCountdown] = useState(3);

    console.log('game phase', state.gamePhase)

    useEffect(() => {
        if (!state) return;

        if (state.gamePhase === 'transition') { 
            console.log('play screen, in transition phase')
            if (state.readyToStartPlayers.length > 0) {
                // agreeToStart to playing transition to show countdown
                
                setCountdown(3); // TODO: make var for this for server and client 

                const interval = setInterval(() => {
                    setCountdown(prev => prev - 1);
                }, 1000);

                return () => clearInterval(interval);

            }
            //else {
            //    // level to level transition
            //    console.log('play screen, ready to start is less than 0 so level start')
            //    const timeout = setTimeout(() => {
            //        dispatch({ type: 'LEVEL_START' });
            //    }, 3000);

            //    return () => clearTimeout(timeout); // cleanup if component unmounts
            //}
        }

        if (state.gamePhase === 'shuriken') {
            setCountdown(5);

            const interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }


        if (state.gamePhase === 'mistake') {
            setCountdown(5);

            const interval = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
        
    }, [state.gamePhase]);

    //useEffect(() => {
    //    if (countdown === 0) {
    //        dispatch({ type: 'TRANSITION_TO_PLAYING' }); // TODO CHANGE
    //    }
    //}, [countdown, state.gamePhase, dispatch]);


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