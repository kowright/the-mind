import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useGame } from '@/hooks/useGame';
import { theme } from '../../theme/theme';
interface GameOverlayHeadingProps {
    text: string;
}

export function GameOverlayHeading({ text }: GameOverlayHeadingProps) {
    return (
        <Text style={[theme.typography.heading, styles.heading]}>{text}</Text>
    );
}

const styles = StyleSheet.create({
    heading: {
        //fontSize: theme.typography.headings.fontSize,
        //fontWeight: theme.typography.headings.fontWeight,
        paddingHorizontal: 16,
        textAlign: 'center',
        //color: theme.typography.headings.color,
    }
});
