import React, { useRef } from "react";
import { Card } from "../../shared/types/card";
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Player } from "../../shared/types/player";
import { CardView } from "./card";
import { ScrollView } from 'react-native';

interface HandProps {
    clientPlayer: Player;
    onPressCard: () => void;
    enemyPlayer: boolean;
}

export function HandView({ clientPlayer, onPressCard, enemyPlayer }: HandProps) {

    const scrollRef = useRef<ScrollView>(null);
    console.log('client player', clientPlayer)

    // TODO fix enemy hand onPress
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={true}
            ref={scrollRef}

            onContentSizeChange={() => 
               
                    scrollRef.current?.scrollToEnd({ animated: false })
                
            }
        >

            {enemyPlayer ? 

                <View style={styles.handContainer}>
                    <View style={styles.hand}>

                        {clientPlayer.cardCount !== 0 ? Array.from({ length: clientPlayer.cardCount }).map((_, index, arr) => (
                            <CardView
                                key={`enemy-${clientPlayer.id}-${index}`}
                                card={{
                                    id: `enemy-${index}`,
                                    number: 0,
                                    mistakenlyPlayed: false,
                                }}
                                index={index}
                                total={arr.length}
                                hideNumbers={true}
                                onPress={() => console.log('cannot press me') }
                            />
                        ))
                            :
                            <Text>{clientPlayer.name} has no more cards</Text>
                        }
                    </View>
                </View>
                :
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
                                    onPress={onPressCard}
                                    hideNumbers={enemyPlayer}
                                />
                            ))}
                    </View>
                </View>
            }


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