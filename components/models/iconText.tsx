import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';
import { theme, themeStyles } from '../../theme/theme';
import { SymbolViewProps } from 'expo-symbols';

interface IconTextProps {
    iconFirst: boolean;
    text: string;
    iconName: string;
    altColor?: string;
}

const iconColorMapping: IconMapping = {
    'hare.fill': 'green',
    'staroflife.fill': 'gray',
    'chart.bar.fill': 'pink',
};

type IconMapping = Partial<Record<SymbolViewProps['name'], string>>;

export function IconText({ iconFirst, text, iconName, altColor}: IconTextProps) {
    // TODO: think if we want icon colors to align with type - shuriken gray, level orange, bunny blue, thumbs up?

    // use for all white
    //if (altColor === undefined || altColor === '') {
    //    altColor = theme.color.gameplayIcon.text;
    //}

    // use for colored icons & add to return () 
    const resolvedColor =
        altColor && altColor !== ''
            ? altColor
            : iconColorMapping[iconName] ?? theme.color.gameplayIcon.text 
    
    const iconSize = iconFirst ? 28 : 20;
    return (
        <View style={styles.container} >
            {!iconFirst && <Text style={[styles.textRight, { color: altColor || theme.color.gameplayIcon.text }]}>{text}</Text>}

            <IconSymbol size={iconSize} name={iconName} color={resolvedColor} style={styles.icon} />
            {iconFirst && <Text style={[styles.textLeft, { color: altColor || theme.color.gameplayIcon.text }]}>{text}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center' 
    },
    textRight: {
        ...themeStyles.body,
        //fontSize: 14,
        marginLeft: 4,
        //color: theme.color.gameplayIcon.text,
    },
    textLeft: {
        ...themeStyles.body,
        marginLeft: 4,
        
    },
    icon: {
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 1 },
        textShadowRadius: 2,
    },
});