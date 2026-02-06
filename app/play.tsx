// actual card showing view
import { Text, View } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
import { Platform, StyleSheet } from 'react-native';
import { CardView } from '@/components/models/card';
import { Level, levels, RewardType } from "@/types/level";


import { useEffect } from 'react';

interface PlayViewProps {

}
// TODO ADD SHURIKEN BUTTON


export default function PlayView() {
    console.log("play view rendering");
   
    const { dispatch, state } = useGame();
    const { players } = state;

    useEffect(() => {
        if (!state) return;

        if (state.gamePhase === 'transition') {
            console.log('Transition started, waiting 5 seconds...');

            const timeout = setTimeout(() => {
                dispatch({ type: 'LEVEL_START' });
            }, 5000);

            return () => clearTimeout(timeout); // cleanup if component unmounts
        }
    }, [state.gamePhase]);


    const pastLevelIndex = state.level.number - 2;
    const nextLevelIndex = state.level.number - 1;

    const pastLevelReward =
        levels[pastLevelIndex]?.reward ?? 'None';

    const nextLevelReward =
        levels[nextLevelIndex]?.reward ?? 'None';

    const showDiscardPile: boolean = state.discardPile ? state.discardPile.length > 0 : false;

    return (
        <View>
            {state.gamePhase === 'playing' ? (
                <>
                    <Text>PLAY VIEW</Text>
                    <Text>LEVEL: {state.level.number}</Text>
                    <Text>LIVES: {state.lives}</Text>
                    <Text>SHURIKEN: {state.shuriken}</Text>

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

                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => dispatch({ type: 'CALL_FOR_SHURIKEN', playerId: player.id })}
                                >
                                   SHURIKEN
                                </Button>
                            </View>

                        </View>
                    ))}
                    <Text>DISCARD PILE</Text>
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
                 
                </>
            ) : state.gamePhase === 'transition' ? (
                <>
                        <Text>TRANSITION</Text>
                        <Text>Like, please wait</Text>
                        <Text>YOU EARNED: {pastLevelReward}</Text>
                        <Text>NEXT LEVEL YOU WILL EARN: {nextLevelReward}</Text>
                        <Text>You will win at level: {state.winLevel}</Text>
                    </>
            ) : (
                <Text>SOMETHING ELSE</Text>
            )}
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
    }
});
