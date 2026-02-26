import { Text, View } from 'react-native';
import { StyleSheet, Pressable } from 'react-native';
import { Button } from '@react-navigation/elements';
import { useGame } from '@/hooks/useGame';
import { ClientAction } from "../../shared/types/gameAction";
import { websocketService } from '@/services/websocketService';
import { CardView } from '../models/card';
import { HandView } from '../models/hand';
import { ButtonView } from '../models/button';
interface GameplayViewProps {
    agreeToStartVersion: boolean;
}

export function GameplayView({ agreeToStartVersion = false, ...props }: GameplayViewProps) {
    const { state, playerId } = useGame();

    const { players } = state;

    console.log('ready to start people', state.readyToStartPlayers)
    const shurikenDisabled = state.shuriken === 0;
    const clientPlayer = players.find(p => p.id === playerId);
;
    const amReadyToStart = state.readyToStartPlayers.includes(playerId)
    const readyButtonText = amReadyToStart ? 'Undo' : 'READY??';

    const askedForShuriken = state.shurikenCalls.includes(playerId);
    const shurikenButtonText = askedForShuriken ? 'Remove shuriken vote' : 'Vote to use shuriken';

    const playerCardCounts = players.map(p => {
        if (p.id !== playerId) {
            return (<Text key={p.id}>{p.name} card count: {p.cardCount}</Text>)     
        }
    })

    // TODO: put space between READY?? and handView, can't see scroll on mobile && between handview and vote to use shuriken
    return (
        <>
            <Text>GAMEPLAY VIEW {agreeToStartVersion ? 'AGREE TO START' : ''}</Text>
            <Text>LEVEL: {state.level.number}</Text>
            <Text>LIVES: {state.lives}</Text>
            <Text>SHURIKEN: {state.shuriken}</Text>
            {playerCardCounts}

            {agreeToStartVersion ? <Text>WHO IS READY TO START?: {state.readyToStartPlayers.length}/{state.players.length}</Text>
                : <Text>SHURIKEN CALLED: {state.shurikenCalls.length}/{state.players.length}</Text>}

            {clientPlayer !== undefined ? 
               
                <View key={clientPlayer.id} style={styles.playerContainer}>
                
                 
      
                    {agreeToStartVersion ?
                           
                            <View style={styles.buttonContainer}>
                                <Text>{clientPlayer.name}</Text>
                            </View>
       
                        :
                        <>
                            {state.players.map(player =>
                                player.id !== playerId ? (
                                    <HandView
                                        key={`player-${player.id}-hand`}
                                        clientPlayer={player}
                                        onPressCard={() => console.log('You cannot make me')}
                                        enemyPlayer={true}
                                    />
                                ) : null
                            )}

                            <ButtonView
                                onPress={() => websocketService.send({ type: "PLAY" } as ClientAction)}
                                text='PLAY CARD'
                                circleShape={false}
                                disabled={clientPlayer.hand.cards.length === 0}
                                showTooltip={false}
                            />
                            </>
                        }
                            
                    <HandView clientPlayer={clientPlayer} enemyPlayer={false}  onPressCard={() =>
                            websocketService.send({ type: "PLAY" } as ClientAction)
                        }
                    />

                    {agreeToStartVersion ?
                        <ButtonView
                            onPress={() => websocketService.send({ type: "READY_TO_START" } as ClientAction)}
                            text={readyButtonText}
                            circleShape={false}
                            disabled={false}
                            showTooltip={false}
                            />
                        :
                        <ButtonView
                            onPress={() => websocketService.send({ type: "CALL_FOR_SHURIKEN" } as ClientAction)}
                            text={shurikenButtonText}
                            circleShape={false}
                            disabled={shurikenDisabled}
                            showTooltip={false}
                        />
                    }

                </View>
                : <Text>UNDEFINED PLAYER</Text>
            }
        </>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 8,
    },
    playerContainer: {
        marginBottom: 16,
 
    },
    //deckContainer: {
    //    display: 'flex',
    //    alignItems: 'center',
    //},
    //shurikenButtonPressed: {
    //    opacity: 0.8,
    //},
    //shurikenButton: {
    //    backgroundColor: '#6c63ff',
    //    paddingVertical: 10,
    //    paddingHorizontal: 16,
    //    borderRadius: 6,
    //    alignItems: 'center',
    //},
    //shurikenButtonDisabled: {
    //    backgroundColor: '#aaa',
    //    opacity: 0.5,
    //},
    //shurikenButtonText: {
    //    color: 'white',
    //    fontWeight: 'bold',
    //},
    //hand: {
    //    display: 'flex',
    //    flexDirection: 'row',
    //},
    //handContainer: {
    //    display: 'flex',
    //    alignItems: 'center', // could align things flex-end so that top card is always at the end to tap quickly
    //},
});