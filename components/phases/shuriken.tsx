import { Text, View } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { GameOverlayView } from '../models/gameOverlay';
import { StyleSheet } from 'react-native';
import { CardView } from '../models/card';
import { GetReadyView } from '../models/getReady';
import { overlayStyle, theme, themeStyles } from '../../theme/theme';
import { GameOverlayHeading } from '../models/gameOverlayHeading';
import { useEffect } from 'react';
import { soundService } from '../../services/soundService';

interface ShurikenViewProps {
    countdown: number;
}

export function ShurikenView({ countdown }: ShurikenViewProps) {
    const { state } = useGame();

    useEffect(() => {
        if (!state) return;

        soundService.play('shuriken');

    }, []);

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
        ...themeStyles.body,
        textAlign: 'center',
    },
    overlay: overlayStyle(theme),
});
