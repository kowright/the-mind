import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Text, View, TextInput } from 'react-native';
import { TabView } from '@/components/tab-view';
import { useGame } from '@/hooks/useGame';
import { websocketService } from '@/services/websocketService';
import { useEffect, useState } from 'react';
import { ClientAction } from '../../shared/types/gameAction';
import { hasValidPlayerCount } from '@/shared/utils/utils';
import { StyleSheet, Pressable } from 'react-native';
import { theme } from '../../theme/theme';
import { ButtonView } from '../../components/models/button';


export default function HomeScreen() {
    const { state } = useGame();  
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
    console.log('validplayercount', isValidPlayerCount)

    return (
        <TabView>
            <View style={styles.container}>
                <Text style={styles.gameTitle}> THE MIND </Text>
                <Image
                    style={styles.image}
                    source="https://www.tampavet.com/wp-content/uploads/2018/02/young-rabbit-1.jpg"
                />
                <ButtonView 
                    onPress={startGame}
                    text='EVERYONE READY?'
                    disabled={!isValidPlayerCount}
                    showTooltip={!isValidPlayerCount}
                    tooltipText='You need 2-4 players to start'
                    circleShape={true}
                />

                {enteredName ? <Text>Hi {text}!</Text> :
                    <>
                    <TextInput
                        style={styles.input}
                   
                        value={text}
                            placeholder="Enter your name"
                            onChangeText={setText}
               
                        />

                            <ButtonView text='Give yourself a name!'
                                onPress={() => { setEnteredName(true); websocketService.send({ type: "PLAYER_NAME_CHANGE", name: text } as ClientAction) }}
                            />
       
                    </>
                }
            </View>
            <Text>There {state.players.length > 1 ? 'are' : 'is'} {state.players.length} {state.players.length > 1 ? 'players!' : 'player!'}</Text>
            <Text>We got {playerNames}</Text>
        </TabView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 16,
    },
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
        width: 300,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 12,
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
        backgroundColor: theme.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',
        color: theme.colors.textPrimary,
        maxWidth: '50%',
    }, 
    buttonHovered: {
        backgroundColor: theme.colors.hover,
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

