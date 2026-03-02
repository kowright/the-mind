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
import { theme } from '../../theme/theme';
import { useResponsiveTheme } from '../../hooks/useResponsiveTheme';

interface LevelResultProps {
    // fake props
}
export function LevelResultView() {
    const { state } = useGame();
    const theme = useResponsiveTheme();

    //TODO: make you earned, next earn, lives into a trio row block? 

    const pastLevelIndex = state.level.number - 2;
    const nextLevelIndex = state.level.number - 1;

    const pastLevelReward =
        levels[pastLevelIndex]?.reward ?? 'None';
    const pastLevelIcon = LevelToRewardIconMapping[pastLevelReward];

    const nextLevelReward =
        levels[nextLevelIndex]?.reward ?? 'None';
    const nextLevelIcon = LevelToRewardIconMapping[nextLevelReward];


    const levelProgression = levels.map(level => {
        if (level.reward !== 'None') {
            const icon = LevelToRewardIconMapping[level.reward];
            console.log('reward', icon)
            return (
                <View key={`level-${level.number}-progression`} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'yellow' }} >
                    <Text style={{ marginLeft: 4 }}>Level {level.number}:</Text>
                    <IconSymbol size={28} name={icon} color="black" />
                </View>
            )
        }
    })

    return (
        <>
            <GameOverlayView>
                <View style={styles.overlap}>
                    <GameOverlayHeading text='LEVEL WIN!' />

                    <IconText iconFirst={false} iconName={pastLevelIcon} text='YOU EARNED:' />
                    <IconText iconFirst={false} iconName={nextLevelIcon} text='NEXT LEVEL YOU WILL EARN:' />
                    <IconText iconFirst={false} iconName='chart.bar.fill' text={`YOU ARE NOW ON LEVEL ${state.level.number} out of ${state.winLevel}`} />
                    <Text>Discard Pile</Text>
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
                                    onPress={() => console.log('I do nothing')}
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
    overlap: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        display: 'flex',
        //alignItems: 'stretch',
    },
    removedCardsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 16,
    },
});
