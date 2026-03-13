import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
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
    },
    getReadyNumberText: {
        ...themeStyles.heading,
        textAlign: 'center',
        width: '100%',
    },
    getReadyContainer: {
        ...theme.shadow,
        backgroundColor: theme.color.overlay.alert,
        padding: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.border.radius.overlay,
    }
});