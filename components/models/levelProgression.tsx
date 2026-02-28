import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from '../ui/icon-symbol';
import { LevelToRewardIconMapping, levels } from '../../shared/types/level';
import { IconText } from './iconText';

interface LevelProgressionProps {

}

export function LevelProgression() {

    const levelProgression = levels
        .filter(level => level.reward !== 'None')
        .map(level => {
            const icon = LevelToRewardIconMapping[level.reward];
            const levelText = `L${level.number}: `;

            return (
                <IconText
                    key={`level-${level.number}-progression`}
                    iconFirst={false}
                    iconName={icon}
                    text={levelText}
                />
            );
        });
    return (
        <View>
            <View style={styles.textContainer}>
                <Text>Rewards at Levels:</Text>
            </View>
            <View style={styles.levelProgressContainer}>
                {levelProgression}
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    levelProgressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'yellow'
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
    }
});