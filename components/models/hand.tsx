import React from "react";
import { Card } from "../../shared/types/card";
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Player } from "../../shared/types/player";
import { CardView } from "./card";
import { ScrollView } from 'react-native';

interface HandProps {
    clientPlayer: Player;
}

export function HandView({clientPlayer}: HandProps) {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>

        <View style={styles.handContainer}>
            <View style={styles.hand}>

                {[...clientPlayer.hand.cards]
                    .sort((a, b) => b.number - a.number)
                    .map((card, index, sortedCards) => (
                        <CardView
                            key={`hand-${clientPlayer.id}-${card.id}`}
                            card={card}
                            index={index}
                            total={sortedCards.length}
                        />
                    ))}
            </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    hand: {
        display: 'flex',
        flexDirection: 'row',
    },
    handContainer: {
        display: 'flex',
        alignItems: 'center', // could align things flex-end so that top card is always at the end to tap quickly - USERTEST
    },
});