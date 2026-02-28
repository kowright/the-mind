import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';

interface IconTextProps {
    iconFirst: boolean;
    text: string;
    iconName: string;
}

export function IconText({ iconFirst, text, iconName}: IconTextProps) {

    return (
        <View style={styles.container} >
            {!iconFirst && <Text style={styles.textRight}>{text}</Text>}
            <IconSymbol size={28} name={iconName} color="black" />
            {iconFirst && <Text style={styles.textLeft}>{text}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center' 
    },
    textRight: {
        marginLeft: 4,
    },
    textLeft: {
        marginLeft: 2,
    }
});