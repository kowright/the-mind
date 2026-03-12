import { Text, View } from 'react-native';
import { GameOverlayView } from '../models/gameOverlay';
import { StyleSheet } from 'react-native';
import { GameOverlayHeading } from '../models/gameOverlayHeading';
import { overlayStyle, theme, themeStyles } from '../../theme/theme';
import { ButtonView } from '../models/button';
import { websocketService } from '../../services/websocketService';

interface PauseProps {
}

export function PauseView() {
    return (
        <>
            <GameOverlayView>
                <View style={[styles.overlay, styles.overlayContainer]}>
                    <GameOverlayHeading text='GAME PAUSED' />

                    <ButtonView

                        onPress={() =>
                            websocketService.send({ type: 'PAUSE_OVER' })

                        }
                        text="RESUME GAME?"
                    
              
                        circleShape
                        variant='primary'
                    />

                    <Text style={[themeStyles.small]}>A countdown starts on button press</Text>

                </View>
            </GameOverlayView>
        </>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        gap: 16,
        display: 'flex',
        alignItems: 'center',

    },
    overlay: overlayStyle(theme),
    text: {
        ...themeStyles.body,
        //color: theme.color.overlay.color,
    }
});
