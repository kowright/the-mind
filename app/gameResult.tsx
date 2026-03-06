import { ScrollView, Text, View } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { isGameWon} from '@/shared/utils/utils';
import { StyleSheet } from 'react-native';
import { Button } from '@react-navigation/elements';
import { websocketService } from '../services/websocketService';
import { DiscardPileView } from '../components/models/discardPile';
import { CardView } from '../components/models/card';
import { theme, themeStyles } from '../theme/theme';
import { useResponsiveTheme } from '../hooks/useResponsiveTheme';
import { ButtonView } from '../components/models/button';
import { IconText } from '../components/models/iconText';

interface GameResultProps {

}

export default function GameResult() {
    const { state } = useGame();
    const theme = useResponsiveTheme();
    const wonGame = state.gameOutcome === 'won';

    const title = wonGame ? 'YOU WON!' : 'WOW, YOU LOST';
    const levelAchieved = wonGame ? state.winLevel : `${state.level.number} out of ${state.winLevel}`
    const snarkyText = wonGame ? 'YOU ALL REALLY ARE ONE MIND!' : 'YOU DEFINITELY COULD HAVE TRIED HARDER BRUH';

    // TODO: make this look more sad or fun

    return (
        <View style={styles.container}>
            <View style={{gap: 32}}>
                <Text style={wonGame ? styles.wonContainer : styles.lostContainer}>
                    {title}
                </Text>

                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'black'
                }}>
                    <IconText iconFirst={true} iconName='hare.fill' text={state.lives} />
                    <IconText iconFirst={true} iconName='staroflife.fill' text={state.shuriken} />
                    <IconText iconFirst={true} iconName='chart.bar.fill' text={`${levelAchieved}`} />
               
                </View>
                <View
                    style={{
                        //height: theme.size.cardHeight * 1.2,
                        //width: '100%',
                        //overflow: 'visible',
  
                        //justifyContent: 'center',


                    }}
                >
                    <DiscardPileView keepStacked={false} />
                </View>
                <View style={{flexDirection: 'column', alignItems: 'center', gap: 4} }>
                {!wonGame && state.players.map(p => {
                    return (
                        <Text style={styles.text} key={`${p.id}-card-count`}>
                            {`${p.name}'s end card count: ${p.cardCount}`}
                        </Text>
                    )
                })}
                </View>
            </View>

            {/* Scroll Section */}
            {state.shurikenedCards.length > 0 && (
                <View style={styles.removedSection}>
                    <Text style={styles.text}>Removed Cards</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {state.shurikenedCards.map((card, index) => (
                            <View
                                key={card.id}
                                style={{
                                    marginLeft: index === 0 ? 0 : theme.size.cardWidth,
                                }}
                            >
                                <CardView
                                    card={card}
                                    index={index}
                                    total={state.lastRemovedCards.length + 1}
                                    discarded
                                    rotate={false}
                                    onPress={() => { }}
                                />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            )}

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <Text style={themeStyles.small}>{snarkyText}</Text>
                <ButtonView
                    text="NEW GAME?"
                    onPress={() => websocketService.send({ type: 'GAME_RESTART' })}
                    variant="primary"
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    wonContainer: {
        ...themeStyles.heading,
        backgroundColor: 'green',
        //color: 'white',
        textAlign: 'center',
        //fontWeight: 'bold',
    },
    lostContainer: {
        ...themeStyles.heading,
        backgroundColor: 'red',
        textAlign: 'center',

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
    text: {
        ...themeStyles.body
        //color: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: theme.color.gameBackground.backgroundColor,
        //padding: 16,
       
    },

    removedSection: {
        marginVertical: 16,
    },

    bottomSection: {
        alignItems: 'center',
        gap: 12,
        marginTop: 'auto',
        paddingBottom: 44,
    },
});