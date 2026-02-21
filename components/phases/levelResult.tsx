import { Text } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { levels } from "@/shared/types/level";
import { DiscardPileView } from "@/components/models/discardPile";

interface LevelResultProps {
    // fake props
}
export function LevelResultView() {
    const { state } = useGame();

    const pastLevelIndex = state.level.number - 2;
    const nextLevelIndex = state.level.number - 1;

    const pastLevelReward =
        levels[pastLevelIndex]?.reward ?? 'None';

    const nextLevelReward =
        levels[nextLevelIndex]?.reward ?? 'None';

    return (
        <>
            <Text>YOU EARNED: {pastLevelReward}</Text>
            <Text>NEXT LEVEL YOU WILL EARN: {nextLevelReward}</Text>
            <Text>You will win at level: {state.winLevel}</Text>
            <Text>YOU ARE NOW ON LEVEL {state.level.number}</Text>
            <DiscardPileView />
        </>
    );
}