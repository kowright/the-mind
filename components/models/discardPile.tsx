import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { CardView } from './card';
import { ScrollView } from 'react-native';
import { useResponsiveTheme } from '../../hooks/useResponsiveTheme';
import { theme } from '../../theme/theme';
import { useRef } from 'react';
interface DiscardPileProps {
} 

export function DiscardPileView() {
    const { state } = useGame();
    console.log('discard state', state.gamePhase)

    const scrollRef = useRef<ScrollView>(null);
    const theme = useResponsiveTheme();
    theme.size.cardWidth

    const dynamicStraightCardContainer = [
        {
            gap: theme.size.cardWidth,
        },
        styles.straightCardsContainer,
    ];

    const showDiscardPile: boolean = state.discardPile ? state.discardPile.length > 0 : false;

    const isPlayingorMistake: boolean = state.gamePhase === 'playing' || state.gamePhase === 'mistake';

  // TODO: discard empty is not centered

    // TODO: contentContainerStyle for scrollview needs to go in styles

    return (
        <>
  
            <View style={styles.discardContainer}>
                {isPlayingorMistake && showDiscardPile ?
                    (
                        <>
                            {/* show cards stacked and rotated */ }
                            {state.discardPile?.map((card, index) => (
                                //<View key={`discard-${card.id}`} style={card.mistakenlyPlayed ? styles.discardPileContainerWrong : styles.discardPileContainerRight}>
                                //    <Text>{card.number}</Text>
                                //</View>
                                <CardView card={card} index={index} total={state.discardPile?.length} key={`discard-${card.id}`} discarded={true} rotate={true} />
                        )) }
                    </> )
                   
                    : !isPlayingorMistake && showDiscardPile ? 
                        <>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator
                         
                            >
                                {state.discardPile?.map((card, index) => (
                                    <View
                                        key={card.id}
                                        style={{
                                            marginLeft: index === 0 ? 0 : theme.size.cardWidth, // gap between cards
                                        }}
                                    >
                                        <CardView card={card} index={index} total={state.discardPile?.length} key={`discard-${card.id}`} discarded={true} rotate={false} />
                                    </View>
                                ))}
                            </ScrollView>
                        </>
                    :


                        <CardView
                           
                            card={{
                                id: `discard-placeholder`,
                                number: 0,
                                mistakenlyPlayed: false,
                            }}
                            index={-1}
                            total={-1}
                            hideNumbers={true}
                            onPress={() => console.log('cannot press me')}
                        />
                }
                
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
    discardContainer: {
        flexDirection: 'row',
        justifyContent: 'center' 
    },
    straightCardsContainer: {
        display: 'flex',
        flexDirection: 'row',
    }
});


//<ScrollView horizontal showsHorizontalScrollIndicator={true}>

//    {/* show cards unstacked and straight */}
//    <View style={dynamicStraightCardContainer}>
//        {

//            state.discardPile?.map((card, index) => (
//                //<View key={`discard-${card.id}`} style={card.mistakenlyPlayed ? styles.discardPileContainerWrong : styles.discardPileContainerRight}>
//                //    <Text>{card.number}</Text>
//                //</View>

//                <CardView card={card} index={index} total={state.discardPile?.length} key={`discard-${card.id}`} discarded={true} rotate={false} />

//            ))
//        }
//    </View>
//</ScrollView>