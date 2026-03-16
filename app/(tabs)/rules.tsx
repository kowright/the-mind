import { Text, View, StyleSheet } from 'react-native';

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
