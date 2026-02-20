import { Card } from "../../shared/types/card";
import { Text, View } from 'react-native';
import { Platform, StyleSheet, Pressable } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
import { Level, levels, RewardType } from "@/shared/types/level";
import { DiscardPileView } from "@/components/models/discardPile";
import { useEffect } from "react";


interface ErrorProps {
    // fake props
}
export function ErrorView({ }: ErrorProps) {
    const { state } = useGame();

    useEffect(() => {
        console.log("ERROR VIEW MOUNTED");
    }, []);

    console.log('error view')
    return (
        <>
            <Text>You do not have enough players.</Text>
            <Text>Going to restart game now.</Text>
        </>
    );
}