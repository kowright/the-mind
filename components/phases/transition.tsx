import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { GameOverlayView } from '../models/gameOverlay';

interface TransitionProps {
    countdown: number;
}

export function TransitionView({ countdown }: TransitionProps) {


    //TODO : space out last removed cards numbers
    return (
        <GameOverlayView>
            <View style={styles.overlapText}>
                <Text> GET READY IN </Text>
                <Text>{countdown}</Text>
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
