import { Text, View } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { GameOverlayView } from '../models/gameOverlay';
import { StyleSheet } from 'react-native';
import { CardView } from '../models/card';
import { GetReadyView } from '../models/getReady';

interface ShurikenViewProps {
    countdown: number;
}

export function ShurikenView({ countdown }: ShurikenViewProps) {
    const { state } = useGame();

    //TODO: make overlay look better
    //TODO: give overlays a unified title

    return (
        <GameOverlayView>
            <View style={styles.overlap}>
                <Text> SHURIKEN CALLED!</Text>
                <Text>Looks like you all can agree on something!</Text>
                <Text>Removed cards: </Text>
          
                <View style={styles.removedCardsContainer}>
                    {state.lastRemovedCards.map((card, index) => (
                        <CardView
                            card={card}
                            index={index}
                            total={state.lastRemovedCards.length}
                            key={`removed-${card.id}`}
                            discarded={true}
                            rotate={true} // assuming it doesn't matter where shuriken cards came from 
                            onPress={() => console.log('I do nothing')}
                        />
                    ))}
                </View>
                <GetReadyView text='STARTING AGAIN IN' countdown={countdown} />

            </View>

        </GameOverlayView>
    );
}

const styles = StyleSheet.create({
    overlap: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        display: 'flex',
        gap: 16,
    },
    removedCardsContainer: {
        flexDirection: 'row',     
        justifyContent: 'center',
        alignItems: 'center',     
        gap: 8,                    
        marginTop: 16,
    },
});
