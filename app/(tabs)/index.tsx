import { Image } from 'expo-image';
import { Link, router } from 'expo-router';
import { Text, View, TextInput } from 'react-native';
import { TabView } from '@/components/tab-view';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
import { websocketService } from '@/services/websocketService';
import { createContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { ClientAction } from '../../shared/types/gameAction';
import { hasValidPlayerCount } from '@/shared/utils/utils';
import { Platform, StyleSheet, Pressable } from 'react-native';


export default function HomeScreen() {
    const { dispatch, state } = useGame();  
    console.log('index.tsc rendering gamePhase: ', state.gamePhase)
    const [text, setText] = useState('');
    const [enteredName, setEnteredName] = useState(false);
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        if (state.gamePhase === 'agreeToStart') {
            router.replace('/play');
        }
    }, [state.gamePhase]);

    const isValidPlayerCount = hasValidPlayerCount(state.players);

    const playerNames = state.players
        .map(p => p.name)
        .filter(Boolean)
        .join(', ');


    return (
        <TabView>
            <Text style={styles.gameTitle}> THE MIND </Text>
            <Image
                style={styles.image}
                source="https://www.tampavet.com/wp-content/uploads/2018/02/young-rabbit-1.jpg"
            />
            <View style={{ alignItems: 'center' }}>
                <Pressable onHoverIn={() => setVisible(v => !v)}
                    onHoverOut={() => setVisible(v => !v)}
                    style={isValidPlayerCount ? styles.button : styles.disabled}
                    onPress={() => startGame()}
                >
                    <Text>EVERYONE READY?</Text>
                </Pressable>

                {visible && !isValidPlayerCount && (
                    <View style={styles.tooltip}>
                        <Text style={{ color: 'white' }}>
                            You need 2 - 4 players to start.
                        </Text>
                    </View>
                )}
            </View>


            <Button onPress={() => startFakeGame()}>
                MAKE FAKE GAME
            </Button>
            {enteredName ? <Text>Hi {text}!</Text> :
                <>
                <TextInput
                    style={styles.input}
                   
                    value={text}
                        placeholder="Enter your name"
                        onChangeText={setText}
               
                />
                    <Button onPress={() => { setEnteredName(true); websocketService.send({ type: "PLAYER_NAME_CHANGE", name: text } as ClientAction) }}>
                    Submit your name
                </Button>
                </>
            }

            <Text>There {state.players.length > 1 ? 'are' : 'is'} {state.players.length} {state.players.length > 1 ? 'players!' : 'player!'}</Text>
            <Text>We got {playerNames}</Text>
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
    }, 
    disabled: {
        backgroundColor: '#aaa',
        opacity: 0.5,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#6c63ff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',

    }, 
    tooltip: {
        position: 'absolute',
        bottom: 50,
        backgroundColor: 'black',
        padding: 8,
        borderRadius: 6,
    }
});
function startFakeGame() {
    websocketService.send({ type: 'MAKE_FAKE_PLAYERS', playerCount: 3 });
    websocketService.send({ type: 'GAME_START'});
}

function startGame() {
    websocketService.send({ type: 'GAME_START' });
}

