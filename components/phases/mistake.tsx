import { Card } from "../../shared/types/card";
import { Text, View } from 'react-native';
import { Platform, StyleSheet, Pressable } from 'react-native';
import { useGame } from '@/hooks/useGame';

interface MistakeProps {
    countdown: number; 
}

// TODO: show card that made the mistake 

export function MistakeView({ countdown }: MistakeProps) {
    // TODO: show who messed up! 
    const { state } = useGame();
    console.log('state', state)

    console.log('last card', state.lastPlayedCard?.mistakenlyPlayedByPlayerId)
    const mistakenPlayer = state.players.find(p => p.id === state.lastPlayedCard?.mistakenlyPlayedByPlayerId);
    console.log('WHO MADE THE MISTAKE? ', mistakenPlayer?.name )
    return (
        <View style={styles.overlay} >
            <View style={styles.overlapText}>
                <Text> MISTAKE!</Text>
                <Text>
                    By {mistakenPlayer?.name} played wrong by playing {state.lastPlayedCard?.number}
                </Text>
                <Text>
                    Had to remove {state.lastRemovedCards.map(c => <Text key={c.id}>{c.number}</Text>) }
                </Text>

                <Text>Get ready...{countdown}</Text>
            </View>
        </View>
    );
}




const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    overlapText: {
        backgroundColor: 'white',
    },
});