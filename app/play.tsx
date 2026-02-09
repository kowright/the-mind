// actual card showing view
import { Text, View } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
import { Platform, StyleSheet, Pressable } from 'react-native';
import { CardView } from '@/components/models/card';
import { Level, levels, RewardType } from "@/types/level";


import React, { useEffect, useState } from 'react';

interface PlayViewProps {

}
// TODO all players must agree to start round first
// TODO: make the play screen a component that can be passed the phase to that the agreeToStart and playing phases look the same 

export default function PlayView() {
    console.log("play view rendering");
   
    const { dispatch, state } = useGame();
    const { players } = state;
    const [mistakeCountdown, setMistakeCountdown] = useState(3);


    useEffect(() => {
        if (!state) return;

        if (state.gamePhase === 'transition') {
            console.log('Transition started, waiting 5 seconds...');
            console.log('!!! TRANSITION TO START LEVEL', state.readyToStartPlayers.length);

            if (state.readyToStartPlayers.length > 0) {
                // agreeToStart to playing transition
                console.log('players are ready!! in play tsx')
                setMistakeCountdown(3);

                const interval = setInterval(() => {
                    setMistakeCountdown(prev => prev - 1);
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
            console.log('shuriken game phase')
            dispatch({ type: 'SHURIKEN_CALLED' });

            const timeout = setTimeout(() => {
                dispatch({ type: 'SHURIKEN_OVER' });
            }, 5000);

            return () => clearTimeout(timeout); 
        }

        if (state.gamePhase === 'agreeToStart') {
            console.log('agreeToStart game phase');
            console.log('players to start', state.readyToStartPlayers.length)
        }

        if (state.gamePhase === 'mistake') {
            setMistakeCountdown(3);

            const interval = setInterval(() => {
                setMistakeCountdown(prev => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }

           
   


        
    }, [state.gamePhase]);

    useEffect(() => {
        if (state.gamePhase === 'mistake' && mistakeCountdown === 0) {
            dispatch({ type: 'MISTAKE_OVER' });
        }

        if (state.gamePhase === 'transition' && mistakeCountdown === 0) {
            dispatch({type: 'TRANSITION_TO_PLAYING'})
        }
    }, [mistakeCountdown, state.gamePhase]);


    if (state.lastRemovedCards.length > 0) {
        console.log('last removed card: ', state.lastRemovedCards)
        console.log('game phase', state.gamePhase)
    }


    const pastLevelIndex = state.level.number - 2;
    const nextLevelIndex = state.level.number - 1;

    const pastLevelReward =
        levels[pastLevelIndex]?.reward ?? 'None';

    const nextLevelReward =
        levels[nextLevelIndex]?.reward ?? 'None';

    const showDiscardPile: boolean = state.discardPile ? state.discardPile.length > 0 : false;

    const shurikenDisabled = state.shuriken === 0;

    return (
        <View>
            {state.gamePhase === 'playing' || state.gamePhase === 'mistake' ? (
                <>
                    <Text>PLAY VIEW</Text>
                    <Text>LEVEL: {state.level.number}</Text>
                    <Text>LIVES: {state.lives}</Text>
                    <Text>SHURIKEN: {state.shuriken}</Text>
                    <Text>SHURIKEN CALLED: {state.shurikenCalls.length}/{state.players.length}</Text>

                    {players.map(player => (
                        <View key={player.id} style={styles.playerContainer}>

                         
                                <View style={styles.buttonContainer}>
                                    <Button
                                        onPress={() => dispatch({ type: 'FAKE_PLAY', playerId: player.id })}
                                    >
                                        MAKE PLAYER {player.id} PLAY
                                    </Button>
                                </View>

                                <View>
                                    {player.hand.cards.map(card => (
                                        <View
                                            style={styles.deckContainer}
                                            key={`hand-${player.id}-${card.id}`}
                                          
                                        >
                                            <Text>{card.number}</Text>
                                        </View>
                                    ))}
                            </View>

                            <Pressable
                                disabled={shurikenDisabled}
                                onPress={() =>
                                    dispatch({ type: 'CALL_FOR_SHURIKEN', playerId: player.id })
                                }
                                style={({ pressed }) => [
                                    styles.shurikenButton,
                                    shurikenDisabled && styles.shurikenButtonDisabled,
                                    pressed && !shurikenDisabled && styles.shurikenButtonPressed,
                                ]}
                            >
                                <Text style={styles.shurikenButtonText}>SHURIKEN</Text>
                            </Pressable>


                        </View>
                    ))}

                    {state.gamePhase === 'mistake' ? (
                        <View style={styles.overlay} >
                            <View style={styles.overlapText}>
                            <Text> MISTAKE!</Text>
                            <Text>
                                By Player X played incorrectly
                            </Text>
                                <Text>Get ready...{mistakeCountdown}</Text>
                            </View>
                        </View>
                    ) : (<></>)
                    }

                    <Text>DISCARD PILE</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {showDiscardPile ? (
                        <>
                            {state.discardPile?.map(card => (
                                <View key={`discard-${card.id}`} style={card.mistakenlyPlayed ? styles.discardPileContainerWrong : styles.discardPileContainerRight}>
                                    <Text>{card.number}</Text>
                                </View>
                            )) }
                        </>
                       

                        )
                   
                            : (<Text>NO DISCARD YET</Text>)}
                    </View>
                 
                </>
            ) : state.gamePhase === 'transition' ? (
                <>
                        <Text>TRANSITION</Text>
                        <Text>Like, please wait</Text>
                        <Text>YOU EARNED: {pastLevelReward}</Text>
                        <Text>NEXT LEVEL YOU WILL EARN: {nextLevelReward}</Text>
                        <Text>You will win at level: {state.winLevel}</Text>
                    </>

            ) : state.gamePhase === 'shuriken' ? (
                <>
                    <Text> SHURIKEN CALLED!</Text>
                            <Text>Looks like you all can agree on something!</Text>
                    <Text>Removed cards: </Text>
                    <View>
                        {state.lastRemovedCards.map(card => (
                            <View key={`removed-${card.id}`}>
                                <Text>{card.number}</Text>
                            </View>
                        ))}
                    </View>
                </>
             
             ) : state.gamePhase === 'agreeToStart' ? (
                            <>
                                <Text>AGREE TO START</Text>
                                <Text>LEVEL: {state.level.number}</Text>
                                <Text>LIVES: {state.lives}</Text>
                                <Text>SHURIKEN: {state.shuriken}</Text>
                                <Text>SHURIKEN CALLED: {state.shurikenCalls.length}/{state.players.length}</Text>
                                <Text>WHO IS READY TO START?: {state.readyToStartPlayers.length}/{state.players.length}</Text>

                                {players.map(player => (
                                    <View key={player.id} style={styles.playerContainer}>


                                        <View style={styles.buttonContainer}>
                                            <Button
                                            // should be disabled 
                                                onPress={() => dispatch({ type: 'FAKE_PLAY', playerId: player.id })}
                                            >
                                                MAKE PLAYER {player.id} PLAY
                                            </Button>
                                        </View>

                                        <View>
                                            {player.hand.cards.map(card => (
                                                <View
                                                    style={styles.deckContainer}
                                                    key={`hand-${player.id}-${card.id}`}

                                                >
                                                    <Text>{card.number}</Text>
                                                </View>
                                            ))}
                                        </View>

                                        <Pressable
                                            
                                            onPress={() =>
                                                dispatch({ type: 'READY_TO_START', playerId: player.id })
                                            }
                                            style={({ pressed }) => [
                                                styles.shurikenButton,
                                                shurikenDisabled && styles.shurikenButtonDisabled,
                                                pressed && !shurikenDisabled && styles.shurikenButtonPressed,
                                            ]}
                                        >
                                            <Text style={styles.shurikenButtonText}>READY??</Text>
                                        </Pressable>


                                    </View>
                                ))}
                            </>

            ) : (
            <Text>SOMETHING ELSE, maybe loading or something</Text>
            )

            } 
        </View>
    );
}


const styles = StyleSheet.create({
    buttonContainer: { 
        margin: 8,
    },
    discardPileContainerRight: {
        marginTop: 16,
        backgroundColor: 'green',
        display: 'flex',
        alignItems: 'center',
    }, 
    discardPileContainerWrong: {
        marginTop: 16,
        backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
    }, 
    playerContainer: {
        marginBottom: 16,
        outlineWidth: 2,
        outlineColor: 'blue',
    },
    deckContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    disabledButtonContainer: {
        opacity: 0.4,
    }, 
    shurikenButtonPressed: {
        opacity: 0.8,
    },
    shurikenButton: {
        backgroundColor: '#6c63ff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',
    },
    shurikenButtonDisabled: {
        backgroundColor: '#aaa',
        opacity: 0.5,
    },
    shurikenButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    overlapText: {
        backgroundColor: 'white',
    }
});