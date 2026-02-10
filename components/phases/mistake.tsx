import { Card } from "../../types/card";
import { Text, View } from 'react-native';
import { Platform, StyleSheet, Pressable } from 'react-native';

interface MistakeProps {
    countdown: number; 
}

// TODO: show card that made the mistake 

export function MistakeView({ countdown }: MistakeProps) {
    return (
        <View style={styles.overlay} >
            <View style={styles.overlapText}>
                <Text> MISTAKE!</Text>
                <Text>
                    By Player X played incorrectly
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