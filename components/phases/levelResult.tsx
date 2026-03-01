import { useGame } from '@/hooks/useGame';
import { LevelToRewardIconMapping, levels, RewardType } from "@/shared/types/level";
import { DiscardPileView } from "@/components/models/discardPile";
import { GameOverlayView } from '../models/gameOverlay';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';
import { IconText } from '../models/iconText';

interface LevelResultProps {
    // fake props
}
export function LevelResultView() {
    const { state } = useGame();
    //TODO: show shurikened cards too

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
                    <IconText iconFirst={false} iconName={pastLevelIcon} text='YOU EARNED:' />
                    <IconText iconFirst={false} iconName={nextLevelIcon} text='NEXT LEVEL YOU WILL EARN:' />
                    <IconText iconFirst={false} iconName='chart.bar.fill' text={`YOU ARE NOW ON LEVEL ${state.level.number} out of ${state.winLevel}`} />

                     <DiscardPileView keepStacked={false} />
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
});
