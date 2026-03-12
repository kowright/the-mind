import { createContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { gameReducer } from '@/shared/types/gameReducer';
import { ServerAction } from '@/shared/types/gameAction';
import { GameState, initialGameState } from '@/shared/types/gameState';
import { websocketService } from '@/services/websocketService';
import Constants from "expo-constants";
import { ServerMessage } from '../../shared/types/serverMessage';
import { createLogger } from '../../shared/types/logger';
import { GameSound, soundService } from "@/services/soundService";
import { SOUND_FILES } from '../../constants/sounds';
import { Audio } from 'expo-av';

export type GameContextType = {
    state: GameState;
    dispatch: React.Dispatch<ServerAction>;
    playerId?: string;    
    socketError: string | null;
};

const log = createLogger('GAME CONTEXT')

export const GameContext = createContext<GameContextType | null>(null); //exposes state and dispatch to any component in the tree

export function GameProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, initialGameState); //manages the whole game stat
    const [clientPlayerId, setPlayerId] = useState<string | undefined>();
    const [socketError, setSocketError] = useState<string | null>(null);

    const wsURL = Constants.expoConfig?.extra?.WS_URL_WEB;
    //useEffect(() => {
    //    (async () => {
    //        await soundService.load();
    //        console.log('sounds loaded from Game Context!');
    //    })();
    //}, []);
 
    useEffect(() => {
        (async () => {
            await soundService.load();

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                staysActiveInBackground: false,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: false,
            });

            // Warm up all sounds so first play works
            for (const soundName of Object.keys(SOUND_FILES) as GameSound[]) {
                const sound = soundService.sounds[soundName];
                if (sound) {
                    console.log('playing sound in game context', soundName)
                    //await sound.playAsync();  // play once
                    await sound.setVolumeAsync(0);
                    await sound.replayAsync();
                    await sound.setVolumeAsync(1);
                }
            }
        })();
    }, []);

    useEffect(() => {

        if (!websocketService.isConnected()) {
            websocketService.connect(
                wsURL,
                () => { },
                //() => setSocketError("WebSocket connection failed. Restart App.")
                () => dispatch({
                    type: 'ERROR', errorMessage: 'Websocket connection failed. Restart App.'
                })
            );
        }

        websocketService.onMessage((message: ServerMessage) => {
            if (message.type === "ASSIGN_PLAYER_ID") {
                setPlayerId(message.playerId);
                return;
            }
            else if (message.type === 'STATE_UPDATE') {
                dispatch(message);
            }
            else {
                log.warn("Unidentified server message")
            }
        });

        return () => {
            websocketService.disconnect();
        };
    }, []);
    
    return (
        <GameContext.Provider value={{ state, dispatch, playerId: clientPlayerId, socketError }}>
            {children}
        </GameContext.Provider>
    );
};