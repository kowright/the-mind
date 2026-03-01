import { Text, View } from 'react-native';
import { GameOverlayView } from '../models/gameOverlay';
import { StyleSheet } from 'react-native';
import { GameOverlayHeading } from '../models/gameOverlayHeading';

interface ErrorProps {
}

export function ErrorView() {
    return (
        <>
            <GameOverlayView>
                <View style={styles.overlap}>
                    <GameOverlayHeading text='ERROR!' />

                    <Text>You do not have enough players.</Text>
                    <Text>Going to restart game now.</Text>
                </View>
            </GameOverlayView>
        </>
    );
}

const styles = StyleSheet.create({
    overlap: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'stretch',
    },
});
