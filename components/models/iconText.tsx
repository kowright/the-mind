import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';
import { theme } from '../../theme/theme';

interface IconTextProps {
    iconFirst: boolean;
    text: string;
    iconName: string;
    altColor?: string;
}

export function IconText({ iconFirst, text, iconName, altColor}: IconTextProps) {
    // TODO: think if we want icon colors to align with type - shuriken gray, level orange, bunny blue, thumbs up?
    if (altColor === undefined || altColor === '') {
        altColor = theme.color.gameplayIcon.text;
    }
    const iconSize = iconFirst ? 28 : 24;
    return (
        <View style={styles.container} >
            {!iconFirst && <Text style={[styles.textRight, { color: altColor }]}>{text}</Text>}
            <IconSymbol size={iconSize} name={iconName} color={altColor} />
            {iconFirst && <Text style={[styles.textLeft, { color: altColor }]}>{text}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center' 
    },
    textRight: {
        fontSize: 14,
        marginLeft: 4,
        color: theme.color.gameplayIcon.text,
    },
    textLeft: {
        marginLeft: 2,
        color: theme.color.gameplayIcon.text,
    }
});