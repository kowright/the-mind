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
import { overlayStyle, theme, themeStyles } from '../../theme/theme';
import { useResponsiveTheme } from '../../hooks/useResponsiveTheme';
import { soundService } from '../../services/soundService';
import { useEffect } from 'react';

export function LevelResultView() {
    const { state } = useGame();
    const theme = useResponsiveTheme();


    useEffect(() => {
        if (!state) return;

        soundService.play('win');

    }, []);

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
                    <GameOverlayHeading text={`YOU BEAT LEVEL ${nextLevelIndex}!`} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems:'center', marginTop: 8, marginBottom: 16 } }>
                        <IconText iconFirst={false} iconName={pastLevelIcon} altIconSize={36} text='RECEIVED REWARD:' />
                        <IconText iconFirst={false} iconName={nextLevelIcon} altIconSize={36} text='NEXT LEVEL REWARD:' />

                    <DiscardPileView keepStacked={false} />
                    {state.shurikenedCards.length > 0 && <Text style={themeStyles.body}>Removed Cards:</Text>}
                    {/*<View style={styles.removedCardsContainer}>*/}
                        <ScrollView
                        horizontal
                        persistentScrollbar
                        showsHorizontalScrollIndicator
                        contentContainerStyle={state.shurikenedCards.length > 0 && styles.removedCards }

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
    removedCards: {
        marginVertical: 16,
        paddingHorizontal: 16
    }
});
