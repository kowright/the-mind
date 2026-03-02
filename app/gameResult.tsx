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
    return (
        <View >
            <Text> GAME RESULT </Text>
            <Text style={wonGame ? styles.wonContainer : styles.lostContainer}>{title}</Text>
            <Text>LIVES: {state.lives}</Text>
            <Text>You made it to Level {levelAchieved}</Text>
            <Text>DISCARD PILE</Text>
            <View>
                <>
                    <DiscardPileView keepStacked={false} />
                </>
            </View>
            {state.shurikenedCards.length > 0 && <Text>Removed Cards</Text>}
    
            <ScrollView
                horizontal
            >
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
                            discarded={true}
                            rotate={false}
                            onPress={() => console.log('I do nothing')}
                        />
                    </View>
                ))}
            </ScrollView>
            <Text>{snarkyText}</Text>
            <Button onPress={() => websocketService.send({ type: 'GAME_RESTART' })}>
                NEW GAME?
            </Button>

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
});