import { Text, View, StyleSheet } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { ClientAction } from "../../shared/types/gameAction";
import { websocketService } from '@/services/websocketService';
import { HandView } from '../models/hand';
import { ButtonView } from '../models/button';
import { DiscardPileView } from '../models/discardPile';
import { theme, themeStyles } from '../../theme/theme';
import { IconText } from '../models/iconText';
import { LevelProgression } from '../models/levelProgression';
import { useResponsiveTheme } from '../../hooks/useResponsiveTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { soundService } from '../../services/soundService';
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

    const thumbsUpNumbers = agreeToStartVersion ? `${state.readyToStartPlayers.length}/${state.players.length}` :
        `${state.shurikenCalls.length}/${state.players.length}`
    const thumbsUpAsked =  agreeToStartVersion ? state.readyToStartPlayers.length > 0 :
        state.shurikenCalls.length > 0

    const enemies = players.filter(p => p.id !== playerId);

    //TODO UX: is subtext for shuriken noticable? 

    return (
        <LinearGradient 
            colors={theme.color.gameBackground.gradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1 }}
        >
            <View style={styles.container} >
                <View style={{
                   flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 4,
                }}>
                    <IconText iconFirst={true} iconName='heart.fill' text={state.lives} />
                    <IconText iconFirst={true} iconName='staroflife.fill' text={state.shuriken} />
                    <IconText iconFirst={true} iconName='chart.bar.fill' text={`L${state.level.number}/${state.winLevel}`} />
                </View>

                <View style={styles.gameBoard }>
                    {clientPlayer !== undefined ? 
                        <View key={clientPlayer.id}>
                            {!agreeToStartVersion &&
                                <>
                                    {enemies[0] && (
                                        <>
                                            {enemies.length > 1 &&
                                                <View style={{marginTop: '5%'}}>
                                                    <Text style={styles.topEnemyText}>{`${enemies[0].name} `}
                                                            {!state.gameSettings.cardCounts && <Text style={styles.cardCount}>{`[${enemies[0].cardCount} card${enemies[0].cardCount === 1 ? '' : 's'}]`}</Text>}
                                                        </Text>
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
                                                        <Text style={styles.topEnemyTwoPlayerText}>{`${enemies[0].name} `}
                                                            {!state.gameSettings.cardCounts &&
                                                            <Text style={styles.cardCount}>{`[${enemies[0].cardCount} card${enemies[0].cardCount === 1 ? '' : 's'}]`}</Text>}
                                                        </Text>

                                                        <View>
                                                            <HandView
                                                                clientPlayer={enemies[0]}
                                                                enemyPlayer
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                            }
                                        </>
                                    )}

                                    {enemies[1] && (
                                        <View style={styles.leftEnemy}>
                                            <Text style={styles.horizontalEnemyText}>
                                                {enemies[1].name}{' '}
                                                {!state.gameSettings.cardCounts && <Text style={styles.cardCount}>{`[${enemies[1].cardCount} card${enemies[1].cardCount === 1 ? '' : 's'}]`}</Text>}
                                            </Text>
                                        </View>
                                    )}

                                    {enemies[2] && (
                                        <View style={styles.rightEnemy}>
                                            <Text style={styles.horizontalEnemyText}>
                                                {enemies[2].name}{' '}
                                                {!state.gameSettings.cardCounts && <Text style={styles.cardCount}>{`[${enemies[2].cardCount} card${enemies[2].cardCount === 1 ? '' : 's'}]`}</Text>}
                                            </Text>
                                        </View>
                                    )}  

                                    <View style={styles.centerArea}>
                                        <DiscardPileView keepStacked={discardPileStacked} />
                                    </View>
                                </>
                            }
                            

                            <View style={styles.playerArea}>
                                {!agreeToStartVersion ?
                                    <>
                                        <ButtonView
                                            onPress={() => {
                                                websocketService.send({ type: "PLAY" } as ClientAction);
                                                soundService.play('click');
                                            }}
                                            text="PLAY CARD"
                                            circleShape={false}
                                            disabled={clientPlayer.hand.cards.length === 0}
                                            showTooltip={false}
                                            variant='primary'
                                        />
                                        <View
                                            style={{
                                                height: theme.size.cardHeight *1.2,
                                                width: '100%',
                                                overflow: 'visible',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <HandView
                                                clientPlayer={clientPlayer}
                                                enemyPlayer={false}
                                                    onPressCard={() =>
                                                        agreeToStartVersion ? console.log('nah') :
                                                            websocketService.send({ type: "PLAY" } as ClientAction)}
                                            />
                                        </View>
                                    </>
                                    :
                                    <View
                                        style={{
                                            height: theme.size.cardHeight * 1.2,
                                            width: '100%',
                                            overflow: 'visible',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <HandView
                                            clientPlayer={clientPlayer}
                                            enemyPlayer={false}
                                        />
                                    </View>
                                }
                        
                                {agreeToStartVersion ?
                                    <>
                                        <Text style={themeStyles.small}>{`${thumbsUpNumbers} are ready to start Level ${state.level.number}`}</Text>
                                        <ButtonView
                                        onPress={() => websocketService.send({ type: "READY_TO_START" } as ClientAction)}
                                        text={readyButtonText}
                                        circleShape={false}
                                        disabled={false}
                                            showTooltip={false}
                                        variant='primary'
                                                />
                                            </>
                                    :
                                    <>
                                        <View style={{flexDirection: 'row', gap: 16} }>
                                            <ButtonView
                                                    onPress={() => websocketService.send({ type: "CALL_FOR_SHURIKEN" } as ClientAction)}
                                                    text=''
                                                    circleShape={false}
                                                    disabled={shurikenDisabled}
                                                    showTooltip={false}
                                                    variant='secondary'
                                                    iconName='staroflife.fill'
                                                    iconColor={askedForShuriken ? 'orange' : 'white'}
                               
                                            />
                                            <ButtonView
                                                onPress={() => websocketService.send({ type: "PAUSE" } as ClientAction)}
                                                text=''
                                                circleShape={false}
                                                iconName='pause.fill'
                                                showTooltip={false}
                                                variant='secondary'
                                                    iconColor='white'
                                                />
                                        </View>

                                        {thumbsUpAsked ? <Text style={[themeStyles.small ]}>{`Shuriken votes: ${thumbsUpNumbers}`}</Text> : <Text> </Text>}
                                   </>
                                }
                            </View>

                            {agreeToStartVersion && <LevelProgression />}
                        </View>
                        :
                        <Text style={themeStyles.body}>LOADING...</Text>
                    }
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 8,
    },
    twoPlayerView: {
        alignItems: 'center',
    },
    topEnemy: {
        height: 50,
        overflow: 'hidden',
        alignItems: 'center',
    },
    topEnemyText: {
        color: 'white',
        textAlign: 'center',
    },
    topEnemyTwoPlayerText: {
        ...themeStyles.body,
        transform: [{ rotate: '180deg' }],
        color: theme.color.text.cardCount,
        paddingTop: 8,
    },
    horizontalEnemyText: {
        color: 'white',
    },
    cardCount: {
        ...themeStyles.small,
        fontWeight: 'bold'
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
        marginTop: 30,

    },
    playerArea: { 
        alignItems: 'center',
        gap: 8,
        paddingVertical: 8,
        marginBottom: 12,
    },
    leftEnemy: {
        position: 'absolute',
        left: '5%',
        top: '25%',
        transform: [{ rotate: '90deg' }],

        alignItems: 'center',
    },
    rightEnemy: {
        alignItems: 'center',
        position: 'absolute',
        right: '5%',
        top: '25%',
        transform: [{ rotate: '-90deg' }],
    },
    container: {
        flex: 1,
    },
    gameBoard: {
        flex: 1, 
        position: 'relative',
    }
});