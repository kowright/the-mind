import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme, themeStyles } from '../../theme/theme';
import { SettingsItem } from '../../components/models/settingsItem';
export default function TabTwoScreen() {

    return (
        <View
            style={styles.screen}
        >
            <Text style={styles.gameTitle}>
                THE MIND
            </Text>
            <Text style={styles.title}>
                SETTINGS
            </Text>

            <Text style={styles.settingWarning}>Changes here will make the game significant harder. These are not necessary to set to play a standard game.</Text>

            <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollViewContentStyle}>
                <SettingsItem settingName='Skip skipped cards' settingDescription='Hide cards done in a mistake or by shuriken for a challenge' settingType='skippedCards' />

                <SettingsItem settingName='Card counting' settingDescription='Hide how many cards other people have for a challenge' settingType='cardCounts' />

                <SettingsItem settingName='One mind, one life' settingDescription='Start with 1 life for a challenge' settingType='oneLife' />

                <SettingsItem settingName='Blind' settingDescription='Cannot see card numbers in pile while playing for a challenge' settingType='blind' />

                <Text style={styles.futureHeading}>Upcoming App Update Settings!</Text>

                <SettingsItem settingName='Extreme' settingDescription='Have 2 decks and 2 piles; one pile needs to be ordered ascending, the other descending' />

                <SettingsItem settingName='Silent chat' settingDescription='Let other players know what you are thinking if they cannot see you physically. Add PASS and WAIT options next to player names' />

                <SettingsItem settingName='No rewards' settingDescription='There are no rewards when you beat levels- what you have at the start of the game is all you have' />

                <SettingsItem settingName='Timed levels' settingDescription='Beat in each level in a specified amount of time' />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        backgroundColor: theme.color.gameBackground.backgroundColor,
    },
    gameTitle: {
        ...themeStyles.gameTitle,
        textAlign: 'center',
        paddingTop: 24,
    },
    title: {
        ...themeStyles.title,
        textAlign: 'center',
        paddingBottom: 16,
    },
    settingWarning: {
        ...themeStyles.body,
        color: theme.color.settingWarning,
        textAlign: 'center',
    },
    scrollViewStyle: {
        marginTop: 24 
    },
    scrollViewContentStyle: {
        gap: 24 
    },
    futureHeading: {
        ...themeStyles.heading,
        marginTop: 24,
    }
});
