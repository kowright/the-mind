import { createContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { gameReducer } from '@/shared/types/gameReducer';
import { GameAction, ServerAction } from '@/shared/types/gameAction';
import { GameState, initialGameState } from '@/shared/types/gameState';
import { websocketService } from '@/services/websocketService';
import { Platform } from 'react-native';
import Constants from "expo-constants";

/*const wsUrl = Constants.expoConfig?.extra?.WS_URL;
*/
type GameContextType = {
    state: GameState;
    dispatch: React.Dispatch<ServerAction>; // this might not even be used
/*    clientPlayerId?: string;
    setMyPlayerId: (id: string) => void;*/
    
};

export const GameContext = createContext<GameContextType | null>(null); //exposes state and dispatch to any component in the tree

export function GameProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, initialGameState); //manages the whole game stat
    //const [clientPlayerId, setPlayerId] = useState<string | undefined>();
    console.log('platform', Platform.OS)
/*    const url =
        Platform.OS === "web"
            ? "ws://localhost:3000"
            : wsUrl;*/


    const wsURL = Constants.expoConfig?.extra?.WS_URL_WEB;
    console.log('wsURL', wsURL)
/*            console.log('url', url)
*/    useEffect(() => {

        if (!websocketService.isConnected()) {
            websocketService.connect(wsURL, () => {
                //websocketService.send({ type: "PLAYER_CONNECTION" });
            });
        }

        websocketService.onMessage((message) => {
            console.log("MESSAGE FROM SERVER from Game Provider:", message);
            //if (message.type === "ASSIGN_PLAYER_ID") {
            //    console.log('Got player id: ', message.playerId)
            //    setPlayerId(message.playerId);
            //    return;
            //}

            dispatch(message); 
        });


        return () => {
            websocketService.disconnect();
        };
    }, []);
    
    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

