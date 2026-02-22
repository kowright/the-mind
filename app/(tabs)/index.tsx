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
import { useResponsiveTheme } from '../../hooks/useResponsiveTheme';


export default function HomeScreen() {
    const theme = useResponsiveTheme();
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

    //return (
    //    <TabView>
    //        <View style={styles.container}>
    //            <Text style={styles.gameTitle}> THE MIND </Text>
    //            <Image
    //                style={styles.image}
    //                source="https://www.tampavet.com/wp-content/uploads/2018/02/young-rabbit-1.jpg"
    //            />
    //            <ButtonView
    //                onPress={startGame}
    //                text='EVERYONE READY?'
    //                disabled={!isValidPlayerCount}
    //                showTooltip={!isValidPlayerCount}
    //                tooltipText='You need 2-4 players to start'
    //                circleShape={true}
    //            />

    //            {enteredName ? <Text>Hi {text}!</Text> :
    //                <>
    //                <TextInput
    //                    style={styles.input}

    //                    value={text}
    //                        placeholder="Enter your name"
    //                        onChangeText={setText}

    //                    />

    //                        <ButtonView text='Give yourself a name!'
    //                            onPress={() => { setEnteredName(true); websocketService.send({ type: "PLAYER_NAME_CHANGE", name: text } as ClientAction) }}
    //                        />

    //                </>
    //            }
    //        </View>
    //        <Text>There {state.players.length > 1 ? 'are' : 'is'} {state.players.length} {state.players.length > 1 ? 'players!' : 'player!'}</Text>
    //        <Text>We got {playerNames}</Text>
    //    </TabView>
    //);

    return (
        <TabView>
            <View style={styles.screen}>
                <View style={styles.content}>
                    <Text style={styles.gameTitle}>THE MIND</Text>
{/*
                    <Image
                        style={styles.image}
                        source={{ uri: 'https://www.tampavet.com/wp-content/uploads/2018/02/young-rabbit-1.jpg' }}
                    />*/}

                    <ButtonView
                        onPress={startGame}
                        text="EVERYONE READY?"
                        disabled={!isValidPlayerCount}
                        showTooltip={!isValidPlayerCount}
                        tooltipText="You need 2-4 players to start"
                        circleShape
                    />

                    {!enteredName ? (
                        <>
                            <TextInput
                                style={styles.input}
                                value={text}
                                placeholder="Enter your name"
                                onChangeText={setText}
                            />

                            <ButtonView
                                text="Give yourself a name!"
                                onPress={() => {
                                    setEnteredName(true);
                                    websocketService.send({
                                        type: "PLAYER_NAME_CHANGE",
                                        name: text,
                                    } as ClientAction);
                                }}
                            />
                        </>
                    ) : (
                        <Text>Hi {text}!</Text>
                    )}

                    <Text style={styles.meta}>
                        There {state.players.length > 1 ? 'are' : 'is'} {state.players.length}{' '}
                        {state.players.length > 1 ? 'players!' : 'player!'}
                    </Text>

                    <Text style={styles.meta}>
                        We got {playerNames}
                    </Text>
                </View>
            </View>
        </TabView>
    );

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        // THIS is the magic for desktop
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
        gap: 20,
    },

    gameTitle: {
        fontSize: theme.typography.title,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    image: {
        width: '100%',
        maxWidth: 225,
        height: 125,
        borderRadius: 12,
        resizeMode: 'cover',
    },

    input: {
        width: '100%',
        maxWidth: 400,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
    },

    meta: {
        textAlign: 'center',
    },
});

function startFakeGame() {
    websocketService.send({ type: 'MAKE_FAKE_PLAYERS', playerCount: 3 });
    websocketService.send({ type: 'GAME_START'});
}

function startGame() {
    websocketService.send({ type: 'GAME_START' });
}

