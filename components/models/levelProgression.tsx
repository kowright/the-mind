import { Text, View, StyleSheet } from 'react-native';
import { LevelToRewardIconMapping, levels } from '../../shared/types/level';
import { IconText } from './iconText';
import { themeStyles } from '../../theme/theme';

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
                <Text style={styles.text}>Rewards at Levels:</Text>
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
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        ...themeStyles.small,
    }
});