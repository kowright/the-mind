import { Card } from "../../types/card";
import { Text, View } from 'react-native';
import { Platform, StyleSheet, Pressable } from 'react-native';
import { Button } from '@react-navigation/elements';
import { GameState, initialGameState } from '@/types/gameState';
import { useGame } from '@/hooks/useGame';
import { Level, levels, RewardType } from "@/types/level";



interface ShurikenViewProps {
    // fake props
}

export function ShurikenView({ }: ShurikenViewProps) {
    const { state } = useGame();

    return (
        <>
            <Text> SHURIKEN CALLED!</Text>
            <Text>Looks like you all can agree on something!</Text>
            <Text>Removed cards: </Text>
            <View>
                {state.lastRemovedCards.map(card => (
                    <View key={`removed-${card.id}`}>
                        <Text>{card.number}</Text>
                    </View>
                ))}
            </View>
        </>
    );
}