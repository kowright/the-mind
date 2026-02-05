// actual card showing view
import { Text, View } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
import { Platform, StyleSheet } from 'react-native';
import { CardView } from '@/components/models/card';


interface PlayViewProps {

}


export default function PlayView() {
    console.log("play view rendering");
    const { dispatch, state } = useGame();
    const { players } = state;
    let buttons: JSX.element[] = [];
    let hands: JSX.element[] = [];


    
        for (let player of players) {
            buttons.push(
                <View key={player.id} style={styles.buttonContainer}>
                    <Button
                        onPress={() => dispatch({ type: 'FAKE_PLAY', playerId: player.id })}
                    >
                        MAKE PLAYER {player.id} PLAY
                    </Button>
                </View>
            );
            for (let card of player.hand.cards) {

                hands.push(
                    <View key={player.id} style={styles.cardContainer}>
                        <Text

                        >
                            {card.number}
                        </Text>
                    </View>
                );

            }
        }
    
    return (
        <View>
            <Text> PLAY VIEW </Text>
            {buttons}
            {hands}
        </View>
    );
}


const styles = StyleSheet.create({
    buttonContainer: { 
        margin: 8,
    },
});