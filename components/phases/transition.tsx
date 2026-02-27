import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { GameOverlayView } from '../models/gameOverlay';

interface TransitionProps {
    countdown: number;
}

export function TransitionView({ countdown }: TransitionProps) {
    return (
        <GameOverlayView>
            <View style={styles.overlap}>
                <Text> GET READY IN </Text>
                <Text>{countdown}</Text>
            </View>
        </GameOverlayView>
    );
}

const styles = StyleSheet.create({
    overlap: {
        backgroundColor: 'white',
        padding: 32,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center'
    },
});
