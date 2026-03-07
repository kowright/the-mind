import { useGame } from '@/hooks/useGame';
import { LevelToRewardIconMapping, levels, RewardType } from "@/shared/types/level";
import { DiscardPileView } from "@/components/models/discardPile";
import { GameOverlayView } from '../models/gameOverlay';
import { ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';
import { IconText } from '../models/iconText';
import { GameOverlayHeading } from '../models/gameOverlayHeading';
import { CardView } from '../models/card';
import { overlayStyle, theme } from '../../theme/theme';
import { useResponsiveTheme } from '../../hooks/useResponsiveTheme';

interface LevelResultProps {
    // fake props
}
export function LevelResultView() {
    const { state } = useGame();
    const theme = useResponsiveTheme();

    const pastLevelIndex = state.level.number - 2;
    const nextLevelIndex = state.level.number - 1;

    const pastLevelReward =
        levels[pastLevelIndex]?.reward ?? 'None';
    const pastLevelIcon = LevelToRewardIconMapping[pastLevelReward];

    const nextLevelReward =
        levels[nextLevelIndex]?.reward ?? 'None';
    const nextLevelIcon = LevelToRewardIconMapping[nextLevelReward];

    return (
        <>
            <GameOverlayView>
                <View style={[styles.overlay, styles.overlayContainer]}>
                    <GameOverlayHeading text='LEVEL WIN!' />
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems:'center', marginTop: 8, marginBottom: 16 } }>
                        <IconText iconFirst={false} iconName={pastLevelIcon} text='REWARD:' />
                        <IconText iconFirst={false} iconName={nextLevelIcon} text='NEXT LEVEL REWARD:' />
                        <IconText iconFirst={false} iconName='chart.bar.fill' text={`LEVEL ${state.level.number} out of ${state.winLevel} `} />
                    </View>

                    <DiscardPileView keepStacked={false} />
                    {state.shurikenedCards.length > 0 && <Text>Removed Cards</Text>}
                    {/*<View style={styles.removedCardsContainer}>*/}
                        <ScrollView
                            horizontal
                        >
                        {state.shurikenedCards.map((card, index) => (
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

                    {/*</View>*/}
                </View>
                </GameOverlayView>
        </>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        //backgroundColor: theme.color.gameBackground.backgroundColor,
        //padding: 16,
        //borderRadius: 16,
        display: 'flex',
        //alignItems: 'stretch',
    },
    overlay: overlayStyle(theme),
    removedCardsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 16,
    },
});
