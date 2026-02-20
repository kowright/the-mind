import { Card } from "../../shared/types/card";
import { Text, View } from 'react-native';
import { Platform, StyleSheet, Pressable } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
import { ClientAction } from "../../shared/types/gameAction";
import { websocketService } from '@/services/websocketService';
interface GameplayViewProps {
    agreeToStartVersion: boolean;
}
// show how many cards others have

export function GameplayView({ agreeToStartVersion = false, ...props }: GameplayViewProps) {
    const { dispatch, state, playerId } = useGame();
    console.log('gameplay view agreetostart?: ', agreeToStartVersion);
    console.log('gameplay view phase', state.gamePhase )
    const { players } = state;

    const shurikenDisabled = state.shuriken === 0;
    console.log('player id', playerId)

    const clientPlayer = players.find(p => p.id === playerId);
    const playerCardCounts = players.map(p => {
        if (p.id !== playerId) {
            return (<Text key={p.id}>{p.name} card count: {p.cardCount}</Text>)     
        }
    })

    return (
        <>
            <Text>GAMEPLAY VIEW {agreeToStartVersion ? 'AGREE TO START' : ''}</Text>
            <Text>LEVEL: {state.level.number}</Text>
            <Text>LIVES: {state.lives}</Text>
            <Text>SHURIKEN: {state.shuriken}</Text>
            {playerCardCounts}

            {agreeToStartVersion ? <Text>WHO IS READY TO START?: {state.readyToStartPlayers.length}/{state.players.length}</Text>
                : <Text>SHURIKEN CALLED: {state.shurikenCalls.length}/{state.players.length}</Text>}

            {clientPlayer !== undefined ? 
               
                <View key={clientPlayer.id} style={styles.playerContainer}>

                        {agreeToStartVersion ?
                            <View style={styles.buttonContainer}>
                            <Text>{clientPlayer.name}</Text>
                            </View>
                            :
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() =>
                                        //dispatch({ type: 'FAKE_PLAY', playerId: player.id })
                                        websocketService.send({ type: "FAKE_PLAY" } as ClientAction)

                                    }
                                >
                                PLAY
                                </Button>
                            </View>
                        }



                        <View>
                        {clientPlayer.hand.cards.map(card => (
                                <View
                                    style={styles.deckContainer}
                                key={`hand-${clientPlayer.id}-${card.id}`}

                                >
                                    <Text>{card.number}</Text>
                                </View>
                            ))}
                        </View>

                        {agreeToStartVersion ?
                            <Pressable
                                onPress={() =>
                                    //dispatch({ type: 'READY_TO_START', playerId: player.id })
                                    websocketService.send({ type: "READY_TO_START" } as ClientAction)
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
                                    //    dispatch({ type: 'CALL_FOR_SHURIKEN', playerId: player.id })
                                    websocketService.send({ type: "CALL_FOR_SHURIKEN" } as ClientAction)

                                }
                                style={({ pressed }) => [
                                    styles.shurikenButton,
                                    shurikenDisabled && styles.shurikenButtonDisabled,
                                    pressed && !shurikenDisabled && styles.shurikenButtonPressed,
                                ]}
                            >
                                <Text style={styles.shurikenButtonText}>VOTE TO USE SHURIKEN</Text>
                            </Pressable>
                        }

                </View>
                    : <Text>UNDEFINED PLAYER</Text>
      
            }

            { /*
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
                                    onPress={() =>
                                        //dispatch({ type: 'FAKE_PLAY', playerId: player.id })
                                        websocketService.send({ type: "FAKE_PLAY" } as ClientAction)

                                    }
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
                                    //dispatch({ type: 'READY_TO_START', playerId: player.id })
                                    websocketService.send({ type: "READY_TO_START" } as ClientAction)
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
                                    //    dispatch({ type: 'CALL_FOR_SHURIKEN', playerId: player.id })
                                    websocketService.send({ type: "CALL_FOR_SHURIKEN" } as ClientAction)

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
            */}
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