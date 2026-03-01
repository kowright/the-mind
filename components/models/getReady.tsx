import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';

interface GetReadyViewProps {
    countdown: number;
    text: string;
}

export function GetReadyView({ countdown, text }: GetReadyViewProps) {

    return (
        <View style={styles.getReadyContainer}>
            <Text style={styles.getReadyPrimaryText}>{text}</Text>
            <Text style={styles.getReadyNumberText}>{countdown}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    getReadyPrimaryText: {
        color: 'white',
        fontSize: 16,
    },
    getReadyNumberText: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        width: '100%',
        color: 'white'
    },
    getReadyContainer: {
        backgroundColor: 'red',
        padding: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});