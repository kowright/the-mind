import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { Text, View } from 'react-native';
import { theme, themeStyles } from '../../theme/theme';
import { ReactNode } from 'react';

interface SettingItemProps {
    settingName: string;
    settingDescription: string;
    checked?: boolean;
}

export function SettingsItem({ settingDescription, settingName, checked = false }: SettingItemProps) {
    return (
       <View>
            <Text style={themeStyles.body}>{settingName}</Text>
            <Text style={themeStyles.small}>{settingDescription}</Text>
       </View>
    );
}

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

            <View style={{gap: 16}}>
                <SettingsItem settingName='Skip skipped cards' settingDescription='Hide cards done in a mistake or by shuriken for a challenge' />

                <SettingsItem settingName='Card counting' settingDescription='Hide how many cards other people have for a challenge' />

                <SettingsItem settingName='One mind, one life' settingDescription='Start with 1 life' />

                <SettingsItem settingName='Blind' settingDescription='Cannot see card numbers while playing' />

                <Text style={themeStyles.heading}>Next updates settings!</Text>

                <SettingsItem settingName='Extreme' settingDescription='Have 2 decks and 2 piles; one pile needs to be ordered ascending, the other descending' />

                <SettingsItem settingName='Silent chat' settingDescription='Let other players know what you are thinking if they cannot see you. Add PASS and WAIT options next to player names' />

            </View>
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
    },
    title: {
        ...themeStyles.title,
        textAlign: 'center',
    },
});
