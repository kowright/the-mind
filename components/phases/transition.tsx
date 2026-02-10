import { Card } from "../../types/card";
import { Text, View } from 'react-native';
import { Platform, StyleSheet, Pressable } from 'react-native';
import { Button } from '@react-navigation/elements';
import { GameState, initialGameState } from '@/types/gameState';
import { useGame } from '@/hooks/useGame';
import { Level, levels, RewardType } from "@/types/level";
import { DiscardPileView } from "@/components/models/discardPile";


interface TransitionViewProps {
    // fake props
}

export function TransitionView({ }: TransitionViewProps) {
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
            <DiscardPileView />
        </>
    );
}