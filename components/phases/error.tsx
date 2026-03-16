import { Text, View, StyleSheet } from 'react-native';
import { GameOverlayView } from '../models/gameOverlay';
import { GameOverlayHeading } from '../models/gameOverlayHeading';
import { overlayStyle, theme, themeStyles } from '../../theme/theme';

interface ErrorProps {
    errorMessage?: string;
}

export function ErrorView({ errorMessage = 'You do not have enough players'}: ErrorProps) {
    return (
        <>
            <GameOverlayView>
                <View style={[styles.overlay, styles.overlayContainer]}>
                    <GameOverlayHeading text='ERROR!' />
                    <Text style={styles.text}>{errorMessage}</Text>
                </View>
            </GameOverlayView>
        </>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        display: 'flex',
        alignItems: 'stretch',
    },
    overlay: overlayStyle(theme),
    text: {
        ...themeStyles.body,
    }
});
