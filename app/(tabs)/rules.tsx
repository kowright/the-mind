import { Text, View, StyleSheet } from 'react-native';

export default function TabThreeScreen() {

    // TODO: what are the rules? 

    // put level progression in here
    // explain what each icon means
    // explain how game works- could possibly copy it from somewhere

    // game can only have 2-4 players
    // can click play card or click literal first card to play it 
    //can vote for shuriken and ready to start and undo your vote if you're not ready

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
