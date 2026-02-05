import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { TabView } from '@/components/tab-view';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
 
export default function HomeScreen() {
    const { dispatch, state } = useGame();  
    console.log('index.tsc rendering gamePhase: ', state.gamePhase )
    
  return (
      <TabView>
          <Text style={styles.gameTitle}> THE MIND </Text>
          <Image
            style={styles.image}
            source="https://www.tampavet.com/wp-content/uploads/2018/02/young-rabbit-1.jpg"
          />
          <Button onPress={() => dispatch({ type: 'GAME_START' })}>
            EVERYONE HERE?
          </Button>
          <Button onPress={() => dispatch({ type: 'MAKE_FAKE_PLAYERS', playerCount: 3 })}>
              MAKE FAKERS
          </Button>

      </TabView>
  );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: 36,
    },
    gameTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 16,
    },
    image: {
        flex: 1,
        width: '100%',
        height: 10,
        resizeMode: 'cover',
        transform: [{ scale: 0.50 }],
    },
});
