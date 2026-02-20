import { createContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { gameReducer } from '@/shared/types/gameReducer';
import { GameAction, ServerAction } from '@/shared/types/gameAction';
import { GameState, initialGameState } from '@/shared/types/gameState';
import { websocketService } from '@/services/websocketService';
import { Platform } from 'react-native';
import Constants from "expo-constants";
import { ServerMessage } from '../../shared/types/serverMessage';

type GameContextType = {
    state: GameState;
    dispatch: React.Dispatch<ServerAction>; // this might not even be used
    playerId?: string;    
};

export const GameContext = createContext<GameContextType | null>(null); //exposes state and dispatch to any component in the tree

export function GameProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, initialGameState); //manages the whole game stat
    const [clientPlayerId, setPlayerId] = useState<string | undefined>();


    const wsURL = Constants.expoConfig?.extra?.WS_URL_WEB;

    useEffect(() => {

        if (!websocketService.isConnected()) {
            websocketService.connect(wsURL, () => {
            });
        }

        websocketService.onMessage((message: ServerMessage) => {
            console.log("MESSAGE FROM SERVER from Game Provider:", message);
            if (message.type === "ASSIGN_PLAYER_ID") {
                setPlayerId(message.playerId);
                return;
            }
            else if (message.type === 'STATE_UPDATE') {
                dispatch(message);
            }
            else {
                console.warn('unidentified server message')
            }
        });

        return () => {
            websocketService.disconnect();
        };
    }, []);
    
    return (
        <GameContext.Provider value={{ state, dispatch, playerId: clientPlayerId }}>
            {children}
        </GameContext.Provider>
    );
};