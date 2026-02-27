import { useGame } from '@/hooks/useGame';
import { levels } from "@/shared/types/level";
import { DiscardPileView } from "@/components/models/discardPile";
import { GameOverlayView } from '../models/gameOverlay';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

interface LevelResultProps {
    // fake props
}
export function LevelResultView() {
    const { state } = useGame();
    //TODO: show shurikened cards too

    // TODO: show user's hands too
    const pastLevelIndex = state.level.number - 2;
    const nextLevelIndex = state.level.number - 1;

    const pastLevelReward =
        levels[pastLevelIndex]?.reward ?? 'None';

    const nextLevelReward =
        levels[nextLevelIndex]?.reward ?? 'None';


    return (
        <>
            <GameOverlayView>
                <View style={styles.overlap}>
            <Text>YOU EARNED: {pastLevelReward}</Text>
            <Text>NEXT LEVEL YOU WILL EARN: {nextLevelReward}</Text>
            <Text>You will win at level: {state.winLevel}</Text>
            <Text>YOU ARE NOW ON LEVEL {state.level.number}</Text>
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
        alignItems: 'center',
    },
});
