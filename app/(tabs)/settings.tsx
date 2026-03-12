import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { Text, View } from 'react-native';
import { theme, themeStyles } from '../../theme/theme';
import React, { ReactNode, useState } from 'react';
import Checkbox from 'expo-checkbox';
import { IconText } from '../../components/models/iconText';
import { useGame } from '../../hooks/useGame';
import { websocketService } from '@/services/websocketService';
import { ClientAction } from '../../shared/types/gameAction';
import { GameSetting } from '../../shared/types/gameSettings';
import { SettingsItem } from '../../components/models/settingsItem';
export default function TabTwoScreen() {
    const { state, playerId } = useGame();

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

            <Text style={[themeStyles.body, {color:'red', textAlign: 'center'}]}>Changes here will make the game significant harder. These are not necessary to set to play a standard game.</Text>

            <ScrollView style={{ marginTop: 24 }}
                contentContainerStyle={{ gap: 24 }}>
                <SettingsItem settingName='Skip skipped cards' settingDescription='Hide cards done in a mistake or by shuriken for a challenge' settingType='skippedCards' />

                <SettingsItem settingName='Card counting' settingDescription='Hide how many cards other people have for a challenge' settingType='cardCounts' />

                <SettingsItem settingName='One mind, one life' settingDescription='Start with 1 life for a challenge' settingType='oneLife' />

                <SettingsItem settingName='Blind' settingDescription='Cannot see card numbers in pile while playing for a challenge' settingType='blind' />

                <Text style={[themeStyles.heading, {marginTop: 24}]}>Upcoming App Update Settings!</Text>

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
});
