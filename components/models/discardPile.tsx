import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useGame } from '@/hooks/useGame';

interface DiscardPileProps {
} 

export function DiscardPileView() {
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
