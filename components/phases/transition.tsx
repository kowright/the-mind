import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { GameOverlayView } from '../models/gameOverlay';
import { GetReadyView } from '../models/getReady';
import { overlayStyle, theme } from '../../theme/theme';

interface TransitionProps {
    countdown: number;
}

export function TransitionView({ countdown }: TransitionProps) {
    return (
        <GameOverlayView>
            <View style={[styles.overlay, styles.overlayContainer]}>
                <GetReadyView text='GET READY IN' countdown={countdown} />
            </View>
        </GameOverlayView>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    overlay: overlayStyle(theme),
});
