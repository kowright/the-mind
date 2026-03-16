import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { GameOverlayView } from '../models/gameOverlay';
import { CardView } from '../models/card';
import { overlayStyle, theme, themeStyles } from '../../theme/theme';
import { useResponsiveTheme } from '../../hooks/useResponsiveTheme';
import { GetReadyView } from '../models/getReady';
import { GameOverlayHeading } from '../models/gameOverlayHeading';
import { useEffect } from 'react';
import { soundService } from '../../services/soundService';

interface MistakeProps {
    countdown: number;
}
export function MistakeView({ countdown }: MistakeProps) {
    const { state } = useGame();
    const theme = useResponsiveTheme();

    useEffect(() => {
        if (!state) return;

        soundService.play('mistake');

    }, []);

    return (
        <GameOverlayView>
            <View style={[styles.overlay, styles.overlayContainer]}>
                
                <GameOverlayHeading text={`LOST ${state.lastRemovedCards.length} ${state.lastRemovedCards.length === 1 ? 'LIFE': 'LIVES'}!`} />
                <Text style={styles.text}>PLAYED TOO EARLY:</Text>
                <View
                    key={`last-played-card-mistake`}
                    style={{ marginVertical: 12,
                        marginLeft: state.lastRemovedCards.length === 0 ? 0 : theme.size.cardWidth,
                    }}
                >
                    <CardView
                        card={state.lastPlayedCard}
                        index={state.lastRemovedCards.length}
                        total={state.lastRemovedCards.length + 1}
                        discarded={true}
                        rotate={false}
                   
                    />
                </View>
                {!state.gameSettings.skippedCards && <Text style={styles.text}>DID NOT PLAY WHEN THEY SHOULD HAVE:</Text>}
                {!state.gameSettings.skippedCards && <View style={styles.removedCardsContainer}>
                    <ScrollView
                        horizontal
                        persistentScrollbar
                        showsHorizontalScrollIndicator
                        contentContainerStyle={styles.scrollViewContent}
                    >
                    {state.lastRemovedCards.map((card, index) => (
                        <View
                            key={card.id}
                            style={{
                                marginLeft: index === 0 ? 0 : theme.size.cardWidth,
                          
                            }}
                        >
                            <CardView
                                card={card}
                                index={index}
                                total={state.lastRemovedCards.length + 1}
                                discarded={true}
                                rotate={false}
                            />
                        </View>
                    ))}
                    </ScrollView>
                </View>}
                <View style={styles.countdown}> 
                    <GetReadyView text='STARTING BACK IN' countdown={countdown} />
                </View>
            </View>
        </GameOverlayView>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    removedCardsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,

    },
    overlay: overlayStyle(theme),
    text: {
        ...themeStyles.body,
        textAlign: 'center'
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingVertical: 12,
        paddingHorizontal: 12,
        overflow: 'visible',
        justifyContent: 'center'
    },
    countdown: {
        marginTop: 16,
    }
});