import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { GameOverlayView } from '../models/gameOverlay';
import { CardView } from '../models/card';
import { overlayStyle, theme, themeStyles } from '../../theme/theme';
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

    // TODO UX: does it go to fast? Maybe reformatting it so it can be understood faster
    // TODO UX: how do make wording shorter
    return (
        <GameOverlayView>
            <View style={[styles.overlay, styles.overlayContainer]}>
                <GameOverlayHeading text='MISTAKE!'/>
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

                </View>}

                <View style={styles.lostLivesContainer}>
                    <IconText iconFirst={false} iconName='hare.fill' text={`Lost ${state.lastRemovedCards.length}`} />
                </View>
                <GetReadyView text='STARTING BACK IN' countdown={countdown} />
            </View>
        </GameOverlayView>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        //backgroundColor: theme.color.overlay.backgroundColor,
        //padding: 16,
        //borderRadius: theme.border.radius.overlay,
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
    },
    overlay: overlayStyle(theme),
    text: {
        ...themeStyles.body,
        //color: theme.color.overlay.color,
    }
});