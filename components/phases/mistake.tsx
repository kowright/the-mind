import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { GameOverlayView } from '../models/gameOverlay';
import { CardView } from '../models/card';
import { theme } from '../../theme/theme';
import { useResponsiveTheme } from '../../hooks/useResponsiveTheme';
import { IconText } from '../models/iconText';
import { GetReadyView } from '../models/getReady';
import { GameOverlayHeading } from '../models/gameOverlayHeading';

interface MistakeProps {
    countdown: number;
}
export function MistakeView({ countdown }: MistakeProps) {
    const { state } = useGame();
    const theme = useResponsiveTheme();
    const mistakenPlayer = state.players.find(p => p.id === state.lastPlayedCard?.mistakenPlayerId);

    return (
        <GameOverlayView>
            <View style={styles.overlap}>
                <GameOverlayHeading text='MISTAKE!'/>
                <Text>PLAYED TOO EARLY:</Text>
                <View
                    key={`last-played-card-mistake`}
                    style={{
                        marginLeft: state.lastRemovedCards.length === 0 ? 0 : theme.size.cardWidth,
                    }}
                >
                    <CardView
                        card={state.lastPlayedCard}
                        index={state.lastRemovedCards.length}
                        total={state.lastRemovedCards.length + 1}
                        discarded={true}
                        rotate={false}
                        onPress={() => console.log('I do nothing')}
                    />
                </View>
                <Text>DID NOT PLAY WHEN THEY SHOULD HAVE:</Text>
                <View style={styles.removedCardsContainer}>
              
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
                                total={state.lastRemovedCards.length+1}
                                discarded={true}
                                rotate={false}
                                onPress={() => console.log('I do nothing')}
                            />
                        </View>
                    ))}
            
                </View>

                <View style={styles.lostLivesContainer}>
                    <IconText iconFirst={false} iconName='hare.fill' text={`Lost ${state.lastRemovedCards.length}`} />
                </View>
                <GetReadyView text='STARTING BACK IN' countdown={countdown} />
            </View>
        </GameOverlayView>
    );
}

const styles = StyleSheet.create({
    overlap: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
    },
    removedCardsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    lostLivesContainer: {
        marginVertical: 12,
    }
});