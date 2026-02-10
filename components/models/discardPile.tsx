import { Card } from "../../types/card";
import { Text, View } from 'react-native';
import { Platform, StyleSheet, Pressable } from 'react-native';
import { Button } from '@react-navigation/elements';
import { GameState, initialGameState } from '@/types/gameState';
import { useGame } from '@/hooks/useGame';

interface DiscardPileProps {
    // fake props
} 

export function DiscardPileView({ }: DiscardPileProps) {
    const { state } = useGame();

    const showDiscardPile: boolean = state.discardPile ? state.discardPile.length > 0 : false;

    return (
        <>
            <Text>DISCARD PILE</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {showDiscardPile ? (
                <>
                    {state.discardPile?.map(card => (
                        <View key={`discard-${card.id}`} style={card.mistakenlyPlayed ? styles.discardPileContainerWrong : styles.discardPileContainerRight}>
                            <Text>{card.number}</Text>
                        </View>
                    )) }
                </> )
                   
                : (<Text>NO DISCARD YET</Text>)}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    discardPileContainerRight: {
        marginTop: 16,
        backgroundColor: 'green',
        display: 'flex',
        alignItems: 'center',
    },
    discardPileContainerWrong: {
        marginTop: 16,
        backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
    },
});
