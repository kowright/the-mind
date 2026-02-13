import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { Text, View, TextInput } from 'react-native';
import { TabView } from '@/components/tab-view';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
import { GameAction } from '@/types/gameAction';
import { websocketService } from '@/services/websocketService';
import { createContext, useReducer, ReactNode, useEffect, useState } from 'react';


export default function HomeScreen() {
    const { dispatch, state } = useGame();  
    console.log('index.tsc rendering gamePhase: ', state.gamePhase)
    const [text, setText] = useState('');
    const [enteredName, setEnteredName] = useState(false);
/*    const players = selectPlayers(state);*/
  

    const handleTextChange = (newText: string) => {
        setText(newText);
    };

    useEffect(() => {
        websocketService.send({ type: "PLAYER_NAME_CHANGE", playerId: '', name: text, requiresId: true});
    }, [enteredName]);

    
  return (
      <TabView>
          <Text style={styles.gameTitle}> THE MIND </Text>
          <Image
            style={styles.image}
            source="https://www.tampavet.com/wp-content/uploads/2018/02/young-rabbit-1.jpg"
          />
          <Button onPress={() => startGame(dispatch)}>
            EVERYONE HERE?
          </Button>
          <Button onPress={() => startFakeGame(dispatch)}>
              MAKE FAKE GAME
          </Button>
     {/*     // hide input on name */}
          {enteredName ? <Text>Hi {text}!</Text> :
             <>
                <TextInput
                    style={styles.input}
                   
                    value={text}
                      placeholder="Enter your name"
                      onChangeText={setText}
                      onBlur={() =>
                          websocketService.send({ type: "PLAYER_NAME_CHANGE", name: text })
                      }
                />
                <Button onPress={() => setEnteredName(true)}>
                    Submit
                </Button>
              </>
          }

          <Text> There are {state.players.length} players: we got {state.players.map(p => <Text key={p.id}>{p.name ? p.name : '' }</Text>)}</Text>

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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    }
});
function startFakeGame(dispatch: React.Dispatch<GameAction>) {
  /*  dispatch({ type: 'MAKE_FAKE_PLAYERS', playerCount: 3 });
    dispatch({ type: 'GAME_START' });
    dispatch({ type: 'LEVEL_START' });*/
    websocketService.send({ type: 'MAKE_FAKE_GAME', playerCount: 3 });
    router.replace('/play');
}

function startGame(dispatch: React.Dispatch<GameAction>) {
    /*dispatch({ type: 'GAME_START' });
    dispatch({ type: 'LEVEL_START' });*/
    websocketService.send({ type: 'GAME_START'});
    router.replace('/play');
}

