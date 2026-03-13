import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { CardView } from './card';
import { ScrollView } from 'react-native';
import { useResponsiveTheme } from '../../hooks/useResponsiveTheme';
import { useRef } from 'react';
interface DiscardPileProps {
    keepStacked?: boolean;
} 

export function DiscardPileView({keepStacked = true}: DiscardPileProps) {
    const { state } = useGame();

    const theme = useResponsiveTheme();

    const showDiscardPile: boolean = state.discardPile ? state.discardPile.length > 0 : false;

    const isPlayingorMistake: boolean = state.gamePhase === 'playing' || state.gamePhase === 'mistake';

    return (
        <>
  
            <View style={[styles.discardContainer, {height: theme.size.cardHeight * 1.2}]}>
                {isPlayingorMistake && showDiscardPile || keepStacked && showDiscardPile ?
                    (
                        <>
                            {state.discardPile?.map((card, index) => (
                                <CardView card={card} index={index} total={state.discardPile?.length} key={`discard-${card.id}`} discarded={true} rotate={true} hideNumbers={state.gameSettings.blind ? true : false } />
                        )) }
                    </> )
                   
                    : !isPlayingorMistake && showDiscardPile ? 
                        <>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator
                                contentContainerStyle={{ flexGrow: 1,marginTop: 12,paddingHorizontal: 12, overflow: 'visible', justifyContent: 'center' }}

                            >
                                {state.discardPile?.map((card, index) => (
                                    <View
                                        key={card.id}
                                        style={{
                                            marginLeft: index === 0 ? 0 : theme.size.cardWidth,
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
                        index={0}
                        total={-1}
                        hideNumbers={true}
                       
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
    discardContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        overflow: 'visible',
    },
    straightCardsContainer: {
        display: 'flex',
        flexDirection: 'row',
    }
});
