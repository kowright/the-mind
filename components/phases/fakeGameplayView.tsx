import { Card } from "../../shared/types/card";
import { Text, View } from 'react-native';
import { Platform, StyleSheet, Pressable } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';

interface FakeGameplayViewProps {
    agreeToStartVersion: boolean;
}
   

export function FakeGameplayView({agreeToStartVersion = false, ...props }: FakeGameplayViewProps) {
    const { dispatch, state } = useGame();
    console.log('gameplay view agreetostart?: ', agreeToStartVersion);
    const { players } = state;

    const shurikenDisabled = state.shuriken === 0;

    return (
        <>
            <Text>GAMEPLAY VIEW {agreeToStartVersion ? 'AGREE TO START' : ''}</Text>
            <Text>LEVEL: {state.level.number}</Text>
            <Text>LIVES: {state.lives}</Text>
            <Text>SHURIKEN: {state.shuriken}</Text>
            {agreeToStartVersion ? <Text>WHO IS READY TO START?: {state.readyToStartPlayers.length}/{state.players.length}</Text>
                : <Text>SHURIKEN CALLED: {state.shurikenCalls.length}/{state.players.length}</Text>}

            {
                players.map(player => (
                    <View key={player.id} style={styles.playerContainer}>

                        {agreeToStartVersion ? 
                            <View style={styles.buttonContainer}>
                                <Text>{player.name}</Text>
                            </View>
                            : 
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => dispatch({ type: 'FAKE_PLAY', playerId: player.id })}
                                >
                                    MAKE PLAYER {player.id} PLAY
                                </Button>
                            </View>
                        }

                    

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

                        {agreeToStartVersion ?
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
                            :
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
                        }

                    </View>
                ))
            }
        </>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 8,
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
});