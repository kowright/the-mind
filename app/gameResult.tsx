// whether win or lose, probably show the same game deck that was last used
// and either a win or lose text
import { Text, View } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { isGameWon} from '@/shared/utils/utils';
import { Platform, StyleSheet, Pressable } from 'react-native';
import { Button } from '@react-navigation/elements';

interface GameResultProps {

}

export default function GameResult() {
    console.log('GAME RESULT')
    const { dispatch, state } = useGame();
    if (state.discardPile) {
        console.log('discard', state.discardPile)
    }
    else {
        console.log('no discard')
    }

    const wonGame = isGameWon(state);
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
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>

                <>
                    {state.discardPile?.map(card => (
                        <View key={`discard-${card.id}`} style={card.mistakenlyPlayed ? styles.discardPileContainerWrong : styles.discardPileContainerRight}>
                            <Text>{card.number}</Text>
                        </View>
                    ))}
                </>



            </View>
            <Text>{snarkyText}</Text>
            <Button onPress={() => dispatch({ type: 'GAME_RESTART' })}>
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