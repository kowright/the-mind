// actual card showing view
import { Text, View } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
import { Platform, StyleSheet } from 'react-native';
import { CardView } from '@/components/models/card';

import { useEffect } from 'react';

interface PlayViewProps {

}


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


    console.log('discard pile: ', state.discardPile);
    return (
        <View>
            {state.gamePhase === 'playing' ? (
                <>
                    <Text>PLAY VIEW</Text>
                    <Text>LEVEL: {state.level.number}</Text>
                    <Text>LIVES: {state.lives}</Text>
                    <Text>SHURIKEN: {state.shuriken}</Text>

                    {players.map(player => (
                        <View key={player.id}>

                         
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
                                            key={`${player.id}-${card.number}`}
                                   
                                        >
                                            <Text>{card.number}</Text>
                                        </View>
                                    ))}
                                </View>

                </View>
                    ))}
                </>
            ) : state.gamePhase === 'transition' ? (
                <Text>TRANSITION</Text>
            ) : (
                <Text>SOMETHING ELSE</Text>
            )}
        </View>
    );

 /*   return (
        <View>
            <Text> PLAY VIEW </Text>
            <Text> LEVEL: {state.level.number} </Text>
            <Text> LIVES: {state.lives} </Text>
            <Text> SHURIKEN: {state.shuriken} </Text>
            {players.map(player => (
                <View key={player.id} style={styles.playerSection}>

                    {*//* Player action button *//*}
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => dispatch({ type: 'FAKE_PLAY', playerId: player.id })}
                        >
                            MAKE PLAYER {player.id} PLAY
                        </Button>
                    </View>

                    {*//* Player hand *//*}
                    <View style={styles.handContainer}>
                        {player.hand.cards.map(card => (
                            <View
                                key={`${player.id}-${card.number}`}
                                style={styles.card}
                            >
                                <Text>{card.number}</Text>
                            </View>
                        ))}
                    </View>

                </View>
            ))}
        </View>
    );*/
}


const styles = StyleSheet.create({
    buttonContainer: { 
        margin: 8,
    },
});
