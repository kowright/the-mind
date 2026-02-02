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


export default function TabThreeScreen() {
    return (
        <View style={styles.background}>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
                THE MIND
            </Text>
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
                RULES
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: 36,
    }
});
