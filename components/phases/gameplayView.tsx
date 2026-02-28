import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
import { ClientAction } from "../../shared/types/gameAction";
import { websocketService } from '@/services/websocketService';
import { CardView } from '../models/card';
import { HandView } from '../models/hand';
import { ButtonView } from '../models/button';
import { DiscardPileView } from '../models/discardPile';
import { theme } from '../../theme/theme';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { Level, levels, RewardType, LevelToRewardIconMapping } from "@/shared/types/level";
import { IconSymbol } from '../ui/icon-symbol';
import { IconText } from '../models/iconText';
import { LevelProgression } from '../models/levelProgression';

interface GameplayViewProps {
    agreeToStartVersion: boolean;
    discardPileStacked: boolean; // keep the discard pile stacked and not straight
}

export function GameplayView({ agreeToStartVersion = false, discardPileStacked = true, ...props }: GameplayViewProps) {
    const { state, playerId } = useGame();

    const { players } = state;

    console.log('ready to start people', state.readyToStartPlayers)
    const shurikenDisabled = state.shuriken === 0;
    const clientPlayer = players.find(p => p.id === playerId);
;
    const amReadyToStart = state.readyToStartPlayers.includes(playerId)
    const readyButtonText = amReadyToStart ? 'Undo' : 'READY??';

    const askedForShuriken = state.shurikenCalls.includes(playerId);
    const shurikenButtonText = askedForShuriken ? 'Remove shuriken vote' : 'Vote to use shuriken';

    const playerCardCounts = players.map(p => {
        if (p.id !== playerId) {
            return (<Text key={p.id}>{p.name} card count: {p.cardCount}</Text>)     
        }
    })

    const enemies = players.filter(p => p.id !== playerId);

    //TODO: every round the left and right players get more and more into the center?

    return (
        <View style={styles.container} >
            <View style={styles.gameBoard }>
            {clientPlayer !== undefined ? 

                    <View key={clientPlayer.id} style={styles.playerContainer}>
                    {agreeToStartVersion ?
                            <View style={styles.buttonContainer}>
                  
                            </View>   
                        :
                            <>
                              

                                    {/* Top Enemy (if exists) */}
                                    {enemies[0] && (
                                        <View style={styles.topEnemy}>
                                            <Text>{`${enemies[0].name} [${enemies[0].cardCount}]`}</Text>
                                        {enemies.length === 1 && <HandView
                                            clientPlayer={enemies[0]}
                                            enemyPlayer
                                            onPressCard={() => { }}
                                        />}
                                        </View>
                                    )}

                                {enemies[1] && (
                                    <View style={styles.leftEnemy}>
                                        <Text>{`${enemies[1].name} [${enemies[1].cardCount}]`}</Text>
                                    </View>
                                        
                                    )}

                                    {enemies[2] && (
                                        <View style={styles.rightEnemy}>
                                        <Text>{`${enemies[1].name} [${enemies[1].cardCount}]`}</Text>
                                        </View>
                                    )}

                                    {/* Center Area */}
                                    <View style={styles.centerArea}>
                                        <DiscardPileView keepStacked={discardPileStacked} />
                                    </View>
                              

                            </>
                        }
                            

                    <View style={styles.playerArea}>
                        {!agreeToStartVersion &&
                            <ButtonView
                                onPress={() =>
                                    websocketService.send({ type: "PLAY" } as ClientAction)
                                }
                                text="PLAY CARD"
                                circleShape={false}
                                disabled={clientPlayer.hand.cards.length === 0}
                                showTooltip={false}
                            /> }
                           
                                <HandView
                            clientPlayer={clientPlayer}
                            enemyPlayer={false}
                                onPressCard={() =>
                                agreeToStartVersion ? console.log('nah') :
                                websocketService.send({ type: "PLAY" } as ClientAction)
                            } />



                        {agreeToStartVersion ?
                            <ButtonView
                                onPress={() => websocketService.send({ type: "READY_TO_START" } as ClientAction)}
                                text={readyButtonText}
                                circleShape={false}
                                disabled={false}
                                showTooltip={false}
                            />
                            :
                            <ButtonView
                                onPress={() => websocketService.send({ type: "CALL_FOR_SHURIKEN" } as ClientAction)}
                                text={shurikenButtonText}
                                circleShape={false}
                                disabled={shurikenDisabled}
                                showTooltip={false}
                            />
                        }
                        </View>

                    <LevelProgression />


                </View>
                : <Text>UNDEFINED PLAYER</Text>
            }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 8,
    },
    playerContainer: {
        marginBottom: 13,
        gap: 32,
    },
    twoPlayerView: {
        flex: 1,
        justifyContent: 'space-between',
    },

    topEnemy: {
        alignItems: 'center',
        height: 50,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        transform: [{ rotate: '180deg' }],
    },

    middleEnemyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },

    sideEnemy: {
        width: '40%',
        height: 100,
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },

    centerArea: {
        alignItems: 'center',

    },

    playerArea: { 
 
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    leftEnemy: {
        position: 'absolute',
        //left: -150,
        top: '25%',
        transform: [{ rotate: '90deg' }],

        alignItems: 'center',
    },
    rightEnemy: {
        alignItems: 'center',
        position: 'absolute',
        right: -100,
        top: '20%',
        transform: [{ rotate: '-90deg' }],
        height: 200,
    },
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    gameBoard: {
        flex: 1, 
        position: 'relative',
        backgroundColor: 'orange',
        marginTop: 16,
    }
    //deckContainer: {
    //    display: 'flex',
    //    alignItems: 'center',
    //},
    //shurikenButtonPressed: {
    //    opacity: 0.8,
    //},
    //shurikenButton: {
    //    backgroundColor: '#6c63ff',
    //    paddingVertical: 10,
    //    paddingHorizontal: 16,
    //    borderRadius: 6,
    //    alignItems: 'center',
    //},
    //shurikenButtonDisabled: {
    //    backgroundColor: '#aaa',
    //    opacity: 0.5,
    //},
    //shurikenButtonText: {
    //    color: 'white',
    //    fontWeight: 'bold',
    //},
    //hand: {
    //    display: 'flex',
    //    flexDirection: 'row',
    //},
    //handContainer: {
    //    display: 'flex',
    //    alignItems: 'center', // could align things flex-end so that top card is always at the end to tap quickly
    //},
});