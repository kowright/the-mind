import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
import { ClientAction } from "../../shared/types/gameAction";
import { websocketService } from '@/services/websocketService';
import { CardView } from '../models/card';
import { HandView } from '../models/hand';
interface GameplayViewProps {
    agreeToStartVersion: boolean;
}

export function GameplayView({ agreeToStartVersion = false, ...props }: GameplayViewProps) {
    const { state, playerId } = useGame();

    const { players } = state;

    const shurikenDisabled = state.shuriken === 0;
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
                                        websocketService.send({ type: "PLAY" } as ClientAction)
                                    }
                                >
                                PLAY
                                </Button>
                            </View>
                        }



                    {/*<View style={styles.hand}>*/}
                    {/*      {clientPlayer.hand.cards.map((card, index) => (*/}
                      
                    {/*        <CardView key={`hand-${clientPlayer.id}-${card.id}`} card={card} index={index}*/}
                    {/*            total={clientPlayer.hand.cards.length} />))}*/}
                            
                    <HandView clientPlayer={clientPlayer} />

                        {agreeToStartVersion ?
                            <Pressable
                                onPress={() =>
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
    //hand: {
    //    display: 'flex',
    //    flexDirection: 'row',
    //},
    //handContainer: {
    //    display: 'flex',
    //    alignItems: 'center', // could align things flex-end so that top card is always at the end to tap quickly
    //},
});