import React from "react";
import { Card } from "../../shared/types/card";
import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { useResponsiveTheme } from "../../hooks/useResponsiveTheme";
import { useGame } from "../../hooks/useGame";
import { LinearGradient } from 'expo-linear-gradient';
import { themeStyles } from "../../theme/theme";
interface CardViewProps {
    card: Card;
    //onPlay: (card: Card) => void;
    //onSelected: (card: Card) => void;
    onPress?: () => void;
    index: number;
    total: number;
    discarded?: boolean;
    rotate?: boolean;
    hideNumbers?: boolean;
    mistakenPlayerName?: string;
}

export function CardView({ card, total, index, onPress, mistakenPlayerName, discarded = false, rotate = false, hideNumbers = false }: CardViewProps) {

    const theme = useResponsiveTheme();

    const cardWidth = theme.size.cardWidth;
    const cardHeight = theme.size.cardHeight;
    const isDiscardEmptyPlaceholder = total === -1;

    const backgroundColor = discarded && card.mistakenlyPlayed ? theme.color.card.mistake : theme.color.card.primary;
      
    const { state } = useGame();

    const mistakenPlayer = state.players.find(p => p.id === card.mistakenPlayerId);

    const mistakenName =
        mistakenPlayerName ??
        mistakenPlayer?.name;

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
        !isDiscardEmptyPlaceholder && styles.shadow,
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
         transform: [{ rotate: '180deg' }]
    }]

     const bottomRight= [{
         bottom: theme.spacing.cornerNumberSpacing,
         right: theme.spacing.cornerNumberSpacing,
         transform: [{ rotate: '180deg' }]
    }]

    const cornerFontSize = cardWidth * 0.15;
    const centerFontSize = cardWidth * 0.3;

    const circleWidth = cardWidth * 0.6;
    const circleHeight = cardHeight * 0.5;

    const radius = Math.min(circleWidth, circleHeight) / 2;

    const canPress = !discarded && total - 1 === index && onPress;

    return (
  
        <Pressable
            onPress={canPress ? onPress : undefined}
            disabled={!canPress}
        >
        <View style={dynamicCardContainer}>
            {/* Top Left */}
            <Text style={[styles.cornerText, topLeft, { fontSize: cornerFontSize }]}>
                    {!hideNumbers && card.number}
            </Text>

            {/* Top Right */}
            <Text style={[styles.cornerText, topRight, {fontSize: cornerFontSize}]}>
                    {!hideNumbers && card.number}
            </Text>

            {!isDiscardEmptyPlaceholder && <View style={styles.centerContainer}>
                <View
                    style={[
                        styles.middleCircle,
                        {
                            width: circleWidth,
                            height: circleHeight,
                            borderRadius: circleWidth / 2,
                            overflow: 'hidden',
                        },
                    ]}>

                    <LinearGradient
                        colors={theme.color.card.gradient.blueGradient}
                        locations={[0, 0.4, 0.5, 0.6, 1]}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
                    />

                    <LinearGradient
                        colors={theme.color.card.gradient.orangeGradient}
                        locations={[0, 0.1, 0.5, 0.9, 1]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
                    />

                    <Text style={[
                        styles.centerText,
                        { fontSize: centerFontSize },
                    ]}>
                        {!hideNumbers && card.number}
                    </Text>
                  
                    </View>
                    {card.mistakenlyPlayed && <Text style={[
                        styles.mistakenPlayerText, {fontSize: theme.typography.small }
                    ]}>
                        {mistakenName}
                    </Text>}
            </View>
                }


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
        //boxShadow: '5px 0px 10px 2px #aaa',
  
        //shadowColor: '#aaa',
        ////shadowOffset: { width: 5, height: 5 },
        //shadowOpacity: 0.2,
        //shadowRadius: 1,
        ////elevation: 10, // android
        //overflow: 'visible'
    },
    shadow: {
        //borderRadius: 16,
        //shadowColor: 'red',
        //shadowOffset: { width: 5, height: 5 },
        //shadowOpacity: 0.5,
        //shadowRadius: 1,
        //elevation: 7, // android
        boxShadow: '1px 0px 10px 5px #aaa',

        shadowColor: '#aaa',
        //shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        //elevation: 10, // android
        overflow: 'visible'
    },

    cornerText: {
        position: 'absolute',
        color: 'white',
        //fontSize: 20,
    },
    discardEmpty: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        borderStyle: 'dotted',
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

    mistakenPlayerText: {
        ...themeStyles.small,

        position: 'absolute',
        transform: [{ rotate: '45deg' }],
        backgroundColor: 'black',
        //color: 'white',
        padding: 4,
        //paddingHorizontal: 32,
        zIndex: 20,
    },

    middleCircle: {
        //width: 120,
        //height: 150,
        //borderRadius: 90,
        //backgroundColor: 'white', 
        justifyContent: 'center',
        alignItems: 'center',
    },
});