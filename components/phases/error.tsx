import { Text, View } from 'react-native';
import { GameOverlayView } from '../models/gameOverlay';
import { StyleSheet } from 'react-native';
import { GameOverlayHeading } from '../models/gameOverlayHeading';
import { overlayStyle, theme } from '../../theme/theme';

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
                    {/*<Text style={styles.text}>Going to restart game now.</Text>*/}
                </View>
            </GameOverlayView>
        </>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        //backgroundColor: theme.color.overlay.backgroundColor,
        //padding: 16,
        //borderRadius: 16,
        display: 'flex',
        alignItems: 'stretch',
    },
    overlay: overlayStyle(theme),
    text: {
        color: theme.color.overlay.color,
    }
});
