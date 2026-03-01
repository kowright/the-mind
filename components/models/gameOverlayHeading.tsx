import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { theme } from '../../theme/theme';
interface GameOverlayHeadingProps {
    text: string;
}

export function GameOverlayHeading({ text }: GameOverlayHeadingProps) {
    return (
        <Text style={styles.heading}>{text}</Text>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: theme.typography.heading,
        fontWeight: 'semibold',
        paddingHorizontal: 16,
        textAlign: 'center',
    }
});
