import React from "react";
import { Card } from "../../shared/types/card";
import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';

interface CardViewProps {
    card: Card;
    //onPlay: (card: Card) => void;
    //onSelected: (card: Card) => void;
    //onPress: (card: Card) => void;
}

export function CardView({ card, onPlay }: CardViewProps) {
    return (
        <View style={styles.cardContainer}>
            {/* Top Left */}
            <Text style={[styles.cornerText, styles.topLeft]}>
                {card.number}
            </Text>

            {/* Top Right */}
            <Text style={[styles.cornerText, styles.topRight]}>
                {card.number}
            </Text>

            {/* Center */}
            <View style={styles.centerContainer}>
                <View style={styles.middleCircle}>
                    <Text style={styles.centerText}>
                        {card.number}
                    </Text>
                </View>
            </View>

            {/* Bottom Left */}
            <Text style={[styles.cornerText, styles.bottomLeft]}>
                {card.number}
            </Text>

            {/* Bottom Right */}
            <Text style={[styles.cornerText, styles.bottomRight]}>
                {card.number}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: 200,
        height: 300,
        backgroundColor: 'black',
        borderRadius: 16,
        padding: 12,
        position: 'relative', // important
    },

    cornerText: {
        position: 'absolute',
        color: 'white',
        fontSize: 20,
    },

    topLeft: {
        top: 12,
        left: 12,
    },

    topRight: {
        top: 12,
        right: 12,
    },

    bottomLeft: {
        bottom: 12,
        left: 12,
    },

    bottomRight: {
        bottom: 12,
        right: 12,
    },

    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    centerText: {
        color: 'black',
        fontSize: 72,
        fontWeight: 'bold',
    },

    middleCircle: {
        width: 120,
        height: 150,
        borderRadius: 90,
        backgroundColor: 'white', 
        justifyContent: 'center',
        alignItems: 'center',
    },

});
