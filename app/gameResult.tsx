import { ScrollView, Text, View } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { isGameWon} from '@/shared/utils/utils';
import { StyleSheet } from 'react-native';
import { Button } from '@react-navigation/elements';
import { websocketService } from '../services/websocketService';
import { DiscardPileView } from '../components/models/discardPile';
import { CardView } from '../components/models/card';
import { theme } from '../theme/theme';
import { useResponsiveTheme } from '../hooks/useResponsiveTheme';
import { ButtonView } from '../components/models/button';

interface GameResultProps {

}

export default function GameResult() {
    const { state } = useGame();
    console.log('gameResult outcome', state.gameOutcome)
    const theme = useResponsiveTheme();
    const wonGame = state.gameOutcome === 'won';

    console.log('gameResult won?: ', wonGame)
    const title = wonGame ? 'YOU WON!' : 'WOW, YOU LOST';
    const levelAchieved = wonGame ? state.winLevel : `${state.level.number} out of ${state.winLevel}`
    const snarkyText = wonGame ? 'YOU ALL REALLY ARE ONE MIND!' : 'YOU DEFINITELY COULD HAVE TRIED HARDER BRUH';

    // TODO: make this look more sad or fun

    return (
        <View style={styles.container}>

            {/* Top Content */}
            <View>
                <Text style={styles.text}>GAME RESULT</Text>
                <Text style={wonGame ? styles.wonContainer : styles.lostContainer}>
                    {title}
                </Text>
                <Text style={styles.text}>LIVES: {state.lives}</Text>
                <Text style={styles.text}>You made it to Level {levelAchieved}</Text>
                <Text style={styles.text}>DISCARD PILE</Text>
                <DiscardPileView keepStacked={false} />
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
                <Text style={styles.text}>{snarkyText}</Text>
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
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    lostContainer: {
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
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
        color: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 16,
        justifyContent: 'space-between', 
    },

    removedSection: {
        marginVertical: 16,
    },

    bottomSection: {
        alignItems: 'center',
        gap: 12,
        marginTop: 'auto',
        paddingBottom: 32,
    },
});