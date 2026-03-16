import { Text, View, StyleSheet } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';
import { theme, themeStyles } from '../../theme/theme';
import { SymbolViewProps } from 'expo-symbols';

interface IconTextProps {
    iconFirst: boolean;
    text: string;
    iconName: string;
    altColor?: string;
    altIconSize?: number;
}

const iconColorMapping: IconMapping = {
    'heart.fill': theme.color.gameplayIcon.heart,
    'hare.fill': theme.color.gameplayIcon.rabbit,
    'staroflife.fill': theme.color.gameplayIcon.shuriken,
    'chart.bar.fill': theme.color.gameplayIcon.level,
};

type IconMapping = Partial<Record<SymbolViewProps['name'], string>>;

export function IconText({ iconFirst, text, iconName, altColor, altIconSize}: IconTextProps) {
    const resolvedColor =
        altColor && altColor !== ''
            ? altColor
            : iconColorMapping[iconName] ?? theme.color.gameplayIcon.backgroundColor 
    
    let iconSize = iconFirst ? 36 : 20;
    if (altIconSize) {
        iconSize = altIconSize;
    }

    return (
        <View style={styles.container} >
            {!iconFirst && <Text style={[styles.textRight, { color: altColor || themeStyles.body.color }]}>{text}</Text>}
            <IconSymbol size={iconSize} name={iconName} color={resolvedColor} style={styles.icon} />
            {iconFirst && <Text style={[styles.textLeft, { color: altColor || themeStyles.body.color }]}>{text}</Text>}
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
    },
    textLeft: {
        ...themeStyles.body,
        marginLeft: 4,
    },
    icon: {
        textShadowColor: theme.textShadow.textShadowColor,
        textShadowOffset: { width: 2, height: 1 },
        textShadowRadius: 2,
    },
});