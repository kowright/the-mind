import { Text, View } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { GameOverlayView } from '../models/gameOverlay';
import { StyleSheet } from 'react-native';

interface ShurikenViewProps {
    countdown: number;
}

export function ShurikenView({ countdown }: ShurikenViewProps) {
    const { state } = useGame();

    return (
        <GameOverlayView>
            <View style={styles.overlapText}>
                <Text> SHURIKEN CALLED!</Text>
                <Text>Looks like you all can agree on something!</Text>
                <Text>Removed cards: </Text>
                <Text>GET READY TO PLAY IN... {countdown}</Text>
                <View>
                    {state.lastRemovedCards.map(card => (
                        <View key={`removed-${card.id}`}>
                            <Text>{card.number}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </GameOverlayView>
    );
}

const styles = StyleSheet.create({
    //overlay: {
    //    position: 'absolute',
    //    top: 0,
    //    left: 0,
    //    right: 0,
    //    bottom: 0,
    //    backgroundColor: 'rgba(0,0,0,0.7)',
    //    justifyContent: 'center',
    //    alignItems: 'center',
    //    zIndex: 999,
    //},
    overlapText: {
        backgroundColor: 'white',
    },
});
