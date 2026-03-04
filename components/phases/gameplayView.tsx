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
import { useResponsiveTheme } from '../../hooks/useResponsiveTheme';

interface GameplayViewProps {
    agreeToStartVersion: boolean;
    discardPileStacked: boolean; // keep the discard pile stacked and not straight
}

export function GameplayView({ agreeToStartVersion = false, discardPileStacked = true, ...props }: GameplayViewProps) {
    const { state, playerId } = useGame();
    const theme = useResponsiveTheme();
    const { players } = state;

    const shurikenDisabled = state.shuriken === 0;
    const clientPlayer = players.find(p => p.id === playerId);
;
    const amReadyToStart = state.readyToStartPlayers.includes(playerId)
    const readyButtonText = amReadyToStart ? 'Undo' : 'READY??';

    const askedForShuriken = state.shurikenCalls.includes(playerId);
    let shurikenButtonText = askedForShuriken ? 'Remove shuriken vote' : 'Vote to use shuriken';

    const thumbsUpNumbers = agreeToStartVersion ? `${state.readyToStartPlayers.length}/${state.players.length}` :
        `${state.shurikenCalls.length}/${state.players.length}`
    const thumbsUpAsked =  agreeToStartVersion ? state.readyToStartPlayers.length > 0 :
        state.shurikenCalls.length > 0


    const enemies = players.filter(p => p.id !== playerId);

    // TODO: make play card and vote shuriken buttons be hierarchily different

    // TODO: make enemy name be more obvious

    return (
        <View style={styles.container} >
            <View style={{
               flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'
            }}>
                <IconText iconFirst={true} iconName='hare.fill' text={state.lives} />
                <IconText iconFirst={true} iconName='staroflife.fill' text={state.shuriken} />
                <IconText iconFirst={true} iconName='chart.bar.fill' text={`${state.level.number}/${state.winLevel}`} />
                <IconText iconFirst={true} iconName='hand.thumbsup' text={thumbsUpNumbers} altColor={thumbsUpAsked ? 'red' : ''} />
            
            </View>

            <View style={styles.gameBoard }>
            {clientPlayer !== undefined ? 

                    <View key={clientPlayer.id} style={styles.playerContainer}>
                    {agreeToStartVersion ?
                            <View style={styles.buttonContainer}>
                  
                            </View>   
                        :
                            <>
                               
                                {enemies[0] && (
                              
                                        <>
                                        {enemies.length > 1 &&
                                            <View style={{marginTop: 8}}>
                                                <Text style={styles.topEnemyText}>{`${enemies[0].name} [${enemies[0].cardCount}]`}</Text>
                                            </View>
                                        }
                                        {enemies.length === 1 &&
                                            <View>
                                                <View
                                                    style={{
                                                        height: 50,
                                                        overflow: 'hidden',
                                                        alignItems: 'center',
                                                        transform: [
                                                            { rotate: '180deg' },
                                                        ],
                                                        
                                                    }}
                                                >
                                                    {/* Keep text normal */}
                                                    <Text style={styles.topEnemyTwoPlayerText}>
                                                        {`${enemies[0].name} [${enemies[0].cardCount}]`}
                                                    </Text>

                                                    {/* Rotate ONLY the hand */}
                                                    <View
                                                        style={{
                                                            transform: [
                                                                //{ rotate: '180deg' },
                                                                //{ translateY: -(theme.size.cardHeight - 50) },
                                                            ],
                                                        }}
                                                    >
                                                        <HandView
                                                            clientPlayer={enemies[0]}
                                                            enemyPlayer
                                                            onPressCard={() => { }}
                                                        />
                                                    </View>
                                                </View>
                                        </View>
                                        }
                                        </>
                                    )}

                                    {enemies[1] && (
                                        <View style={styles.leftEnemy}>
                                        <Text style={styles.horizontalEnemyText}>{`${enemies[1].name} [${enemies[1].cardCount}]`}</Text>
                                        </View>
                                        
                                        )}

                                    {enemies[2] && (
                                        <View style={styles.rightEnemy}>
                                        <Text style={styles.horizontalEnemyText}>{`${enemies[1].name} [${enemies[1].cardCount}]`}</Text>
                                        </View>
                                    )}

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
                                variant='primary'
                                />}
                    
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
                                variant='primary'
                            />
                            :
                            <ButtonView
                                    onPress={() => websocketService.send({ type: "CALL_FOR_SHURIKEN" } as ClientAction)}
                                    text={shurikenButtonText}
                                    circleShape={false}
                                    disabled={shurikenDisabled}
                                    showTooltip={false}
                                    variant='secondary'
                               
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
        //marginBottom: 13,
        //gap: 32,
    },
    twoPlayerView: {
        //flex: 1,
        //justifyContent: 'flex-end',
        alignItems: 'center',
        //height: 50, 
        //overflow: 'hidden',
        //transform: [{ rotate: '180deg' }],
        //gap: 8,
  
    },

    topEnemy: {
       //justifyContent: 'flex-end',
        height: 50,
        overflow: 'hidden',
        alignItems: 'center',
        //transform: [{ rotate: '180deg' }],
    },
    topEnemyText: {
        transform: [{ rotate: '180deg' }],
        color: 'white',
        textAlign: 'center',
    },
    topEnemyTwoPlayerText: {
   
        transform: [{ rotate: '180deg' }],
        color: 'white',
        textAlign: 'center',
    },
    horizontalEnemyText: {
        color: 'white',
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
        marginTop: 24,

    },

    playerArea: { 
        backgroundColor: 'white',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 8,
        marginTop: 36,
        marginBottom: 12,
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
        right: 0,
        top: '25%',
        transform: [{ rotate: '-90deg' }],
    },
    container: {
        flex: 1,
        //backgroundColor: 'blue',
    },
    gameBoard: {
        flex: 1, 
        position: 'relative',
        //backgroundColor: 'orange',
        marginTop: 8,
    }
});