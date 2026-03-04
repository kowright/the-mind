import { Text, View } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { GameOverlayView } from '../models/gameOverlay';
import { StyleSheet } from 'react-native';
import { CardView } from '../models/card';
import { GetReadyView } from '../models/getReady';
import { overlayStyle, theme } from '../../theme/theme';
import { GameOverlayHeading } from '../models/gameOverlayHeading';

interface ShurikenViewProps {
    countdown: number;
}

export function ShurikenView({ countdown }: ShurikenViewProps) {
    const { state } = useGame();

    //TODO: make overlay look better

    return (
        <GameOverlayView>
            <View style={[styles.overlay, styles.overlayContainer]}>
                <GameOverlayHeading text='SHURIKEN CALLED!' />
                <Text style={styles.text}>Looks like you all can agree on something!</Text>
                <Text style={styles.text}>Removed cards: </Text>
          
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
    overlayContainer: {
        //backgroundColor: theme.color.overlay.backgroundColor,
        //padding: 16,
        //borderRadius: 16,
        display: 'flex',
        gap: 16,
    },
    removedCardsContainer: {
        flexDirection: 'row',     
        justifyContent: 'center',
        alignItems: 'center',     
        gap: 8,                    
        marginTop: 16,
        marginBottom: 8,
    },
    text: {
        color: theme.color.overlay.color,
    },
    overlay: overlayStyle(theme),
});
