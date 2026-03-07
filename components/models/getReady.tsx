import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';
import { theme, themeStyles } from '../../theme/theme';

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
        ...themeStyles.body,
        //color: 'white',
        //fontSize: 16,
    },
    getReadyNumberText: {
        ...themeStyles.heading,
        textAlign: 'center',
        //fontSize: 32,
        //fontWeight: 'bold',
        width: '100%',
    //    color: 'white'
    },
    getReadyContainer: {
        ...theme.shadow,
        backgroundColor: theme.color.overlay.alert,
        padding: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});