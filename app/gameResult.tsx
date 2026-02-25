import { Text, View } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { isGameWon} from '@/shared/utils/utils';
import { StyleSheet } from 'react-native';
import { Button } from '@react-navigation/elements';
import { websocketService } from '../services/websocketService';
import { DiscardPileView } from '../components/models/discardPile';

interface GameResultProps {

}

export default function GameResult() {
    const { state } = useGame();

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
            <View>
                <>
                    <DiscardPileView />
                </>
            </View>
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