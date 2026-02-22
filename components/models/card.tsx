import React from "react";
import { Card } from "../../shared/types/card";
import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { useResponsiveTheme } from "../../hooks/useResponsiveTheme";

interface CardViewProps {
    card: Card;
    //onPlay: (card: Card) => void;
    //onSelected: (card: Card) => void;
    //onPress: (card: Card) => void;
}

export function CardView({ card, onPlay }: CardViewProps) {
    const theme = useResponsiveTheme();
    console.log('card height', theme.size.cardHeight)
    const dynamicCardContainerSize = {
        height: theme.size.cardHeight,
        width: theme.size.cardWidth,
    }

    const dynamicCardContainer = [
        dynamicCardContainerSize, 
        styles.cardContainer
    ]

    const cardWidth = theme.size.cardWidth;
    const cardHeight = theme.size.cardHeight;

    const cornerFontSize = cardWidth * 0.12;
    const centerFontSize = cardWidth * 0.35;

    const circleWidth = cardWidth * 0.6;
    const circleHeight = cardHeight * 0.5;


    return (
        <View style={dynamicCardContainer}>
            {/* Top Left */}
            <Text style={[styles.cornerText, styles.topLeft, { fontSize: cornerFontSize }]}>
                {card.number}
            </Text>

            {/* Top Right */}
            <Text style={[styles.cornerText, styles.topRight, {fontSize: cornerFontSize}]}>
                {card.number}
            </Text>

            {/* Center */}
            <View style={styles.centerContainer}>
                <View
                    style={[
                        styles.middleCircle,
                        {
                            width: circleWidth,
                            height: circleHeight,
                            borderRadius: circleWidth / 2,
                        },
                    ]}>
                    <Text style={[
                        styles.centerText,
                        { fontSize: centerFontSize },
                    ]}>
                        {card.number}
                    </Text>
                </View>
            </View>

            {/* Bottom Left */}
            <Text style={[styles.cornerText, styles.bottomLeft, { fontSize: cornerFontSize }]}>
                {card.number}
            </Text>

            {/* Bottom Right */}
            <Text style={[styles.cornerText, styles.bottomRight, { fontSize: cornerFontSize }]}>
                {card.number}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'black',
        borderRadius: 16,
        padding: 12,
        position: 'relative', // important
    },

    cornerText: {
        position: 'absolute',
        color: 'white',
        //fontSize: 20,
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
        //fontSize: 72,
        fontWeight: 'bold',
    },

    middleCircle: {
        //width: 120,
        //height: 150,
        //borderRadius: 90,
        backgroundColor: 'white', 
        justifyContent: 'center',
        alignItems: 'center',
    },

});