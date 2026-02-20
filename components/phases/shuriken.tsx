import { Card } from "../../shared/types/card";
import { Text, View } from 'react-native';
import { Platform, StyleSheet, Pressable } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
import { Level, levels, RewardType } from "@/shared/types/level";



interface ShurikenViewProps {
    countdown: number;
}

export function ShurikenView({ countdown }: ShurikenViewProps) {
    const { state } = useGame();

    return (
        <>
            <Text> SHURIKEN CALLED!</Text>
            <Text>Looks like you all can agree on something!</Text>
            <Text>Removed cards: </Text>
            <Text>GET READY TO PLAY IN... {countdown}</Text>
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