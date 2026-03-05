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
import { IconSymbol } from '../../components/ui/icon-symbol';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GetReadyView } from '../../components/models/getReady';



export default function HomeScreen() {
    const theme = useResponsiveTheme();
    const { state, playerId } = useGame();

    const [text, setText] = useState('');
    const [enteredName, setEnteredName] = useState(false);
    const [visible, setVisible] = useState(false);

    const allPlayersHaveNames : boolean = state.players.every(
        player => player.name && player.name.trim().length > 0
    );

    const clientPlayer = state.players.find(p => p.id === playerId);


    const nameInputFieldText = clientPlayer?.name === '' ||
        text !== '' ?
        'Enter your name' : 'Can rename yourself or keep previous name';
    //TODO: give warning that you are not connected to websocket

    //TODO: Make name stuff look better
  
    useEffect(() => {
        if (state.gamePhase === 'agreeToStart') {
            router.replace('/play');
        }
    }, [state.gamePhase]);

    const isValidPlayerCount = hasValidPlayerCount(state.players);
    let startButtonText = '';
    if (!isValidPlayerCount) {
        startButtonText = "You need 2-4 players to start";
    } else if (!allPlayersHaveNames) {
        startButtonText = "All players must enter a name to start";
    }

    const playerNames = state.players
        .map(p => p.name)
        .filter(Boolean)
        .join(', ');

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
                        disabled={!isValidPlayerCount || !allPlayersHaveNames}
                        showTooltip={!isValidPlayerCount || !allPlayersHaveNames}
                        tooltipText={startButtonText}
                        circleShape
                        variant='primary'
                    />

                    {(!enteredName && clientPlayer?.name !== '') && <Text style={styles.metaTitle}>Hi {clientPlayer?.name}!</Text>}

                    
                    {!enteredName ? (
                        <>
                            <TextInput
                                style={styles.input}
                                value={text}
                                placeholder={nameInputFieldText}
                                placeholderTextColor={theme.color.nameInput.text}
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
                                variant='secondary'
                            />
                        </>
                    ) : (

                       <Text style={styles.metaTitle}>Hi {text}!</Text>
                    )}


                    <Text style={styles.meta}>
                        There {state.players.length > 1 ? 'are' : 'is'} {state.players.length}{' '}
                        {state.players.length > 1 ? 'players!' : 'player!'}
                    </Text>

                    <Text style={styles.meta}>
                        {`We got ${playerNames}${!allPlayersHaveNames ? '...' : '!'} `}
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
        backgroundColor: theme.color.gameBackground.backgroundColor,
    },

    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 800,
        alignSelf: 'center',
        width: '100%',
        gap: 20,
    },

    gameTitle: {
        fontSize: theme.typography.title.fontSize,
        color: 'white',
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
        borderWidth: 2,
        borderColor: theme.color.nameInput.borderColor,
        borderRadius: 8,
        paddingHorizontal: 10,
        color: theme.color.nameInput.text,
    },

    meta: {
        textAlign: 'center',
        color: 'white',
        fontSize: theme.typography.body.fontSize,
    },
    metaTitle: {
        color: theme.typography.title.color,
        fontSize: theme.typography.title.fontSize,
   
    }
});

function startGame() {
    websocketService.send({ type: 'GAME_START' });
}

