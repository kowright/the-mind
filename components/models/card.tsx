import React from "react";
import { Card } from "../../shared/types/card";
import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { useResponsiveTheme } from "../../hooks/useResponsiveTheme";

interface CardViewProps {
    card: Card;
    //onPlay: (card: Card) => void;
    //onSelected: (card: Card) => void;
    onPress: () => void;
    index: number;
    total: number;
    discarded?: boolean;
    rotate?: boolean;
    hideNumbers?: boolean;
}

export function CardView({ card, total, index, onPress, discarded = false, rotate = false, hideNumbers = false }: CardViewProps) {
    console.log('total', total)
    console.log('index', index)
    const theme = useResponsiveTheme();
    console.log('card height', theme.spacing.cornerNumberSpacing)


    const cardWidth = theme.size.cardWidth;
    const cardHeight = theme.size.cardHeight;
    console.log('card', card)
    const isDiscardEmptyPlaceholder = index === -1;

        const backgroundColor = discarded && card.mistakenlyPlayed ? 'red' : 'black';
      
    // TODO: bottom numbers should be reversed 180

    // TODO: who made mistake on mistaken cards on transition

    const overlapAmount = !discarded ? cardWidth * 0.65 : 0;
    const marginLeft = !discarded ? (index === 0 ? 0 : -overlapAmount) : (index === 0 ? 0 : -cardWidth);

    const degrees = discarded && rotate ? index * 30 : 0;
    const degreeString = degrees + 'deg';
    const transform = [{ rotate: degreeString }]
 
    const dynamicCardContainer = [
        {
            height: cardHeight,
            width: cardWidth,
            marginLeft,
            zIndex: index,
            transform: discarded ? transform : undefined,
            backgroundColor,
        },

        isDiscardEmptyPlaceholder ? styles.discardEmpty : '',
        styles.cardContainer,
    ];

    const topLeft= [ {
        top: theme.spacing.cornerNumberSpacing,
        left: theme.spacing.cornerNumberSpacing,
    }]

     const topRight= [{
         top: theme.spacing.cornerNumberSpacing,
         right: theme.spacing.cornerNumberSpacing,
    }]

     const bottomLeft= [{
         bottom: theme.spacing.cornerNumberSpacing,
         left: theme.spacing.cornerNumberSpacing,
    }]

     const bottomRight= [{
         bottom: theme.spacing.cornerNumberSpacing,
         right: theme.spacing.cornerNumberSpacing,
    }]


    const cornerFontSize = cardWidth * 0.15;
    const centerFontSize = cardWidth * 0.3;

    const circleWidth = cardWidth * 0.6;
    const circleHeight = cardHeight * 0.5;


    return (
        <Pressable
            onPress={() =>!discarded && total - 1 === index ? onPress() : ''} >
        <View style={dynamicCardContainer}>
            {/* Top Left */}
            <Text style={[styles.cornerText, topLeft, { fontSize: cornerFontSize }]}>
                    {!hideNumbers && card.number}
            </Text>

            {/* Top Right */}
            <Text style={[styles.cornerText, topRight, {fontSize: cornerFontSize}]}>
                    {!hideNumbers && card.number}
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
                            {!hideNumbers && card.number}
                    </Text>
                </View>
            </View>

            {/* Bottom Left */}
            <Text style={[styles.cornerText, bottomLeft, { fontSize: cornerFontSize }]}>
                    {!hideNumbers && card.number}
            </Text>

            {/* Bottom Right */}
            <Text style={[styles.cornerText, bottomRight, { fontSize: cornerFontSize }]}>
                    {!hideNumbers && card.number}
            </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        //backgroundColor: 'black',
        borderRadius: 16,
        padding: 12,
        position: 'relative',
        boxShadow: '5px 0px 30px 2px #888888',
    },

    cornerText: {
        position: 'absolute',
        color: 'white',
        //fontSize: 20,
    },
    discardEmpty: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'dotted',
    },

    //topLeft: {
    //    top: 12,
    //    left: 12,
    //},

    //topRight: {
    //    top: 12,
    //    right: 12,
    //},

    //bottomLeft: {
    //    bottom: 12,
    //    left: 12,
    //},

    //bottomRight: {
    //    bottom: 12,
    //    right: 12,
    //},

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