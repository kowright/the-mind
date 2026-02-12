import { createContext, useReducer, ReactNode, useEffect } from 'react';
import { gameReducer } from '@/types/gameReducer';
import { GameAction } from '@/types/gameAction';
import { GameState, initialGameState } from '@/types/gameState';
import { websocketService } from '@/services/websocketService';
import { Platform } from 'react-native';
import Constants from "expo-constants";

/*const wsUrl = Constants.expoConfig?.extra?.WS_URL;
*/
type GameContextType = {
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
};

export const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, initialGameState);
    console.log('platform', Platform.OS)
/*    const url =
        Platform.OS === "web"
            ? "ws://localhost:3000"
            : wsUrl;*/


    console.log('emv', Constants.expoConfig?.extra?.WS_URL_WEB)
    const wsURL = Constants.expoConfig?.extra?.WS_URL_WEB;
    console.log('wsURL', wsURL)
/*            console.log('url', url)
*/    useEffect(() => {

        if (!websocketService.isConnected()) {
            websocketService.connect(wsURL, () => {
                websocketService.send({ type: "PLAYER_CONNECTION" });
            });
        }

        websocketService.onMessage((message) => {
            console.log("MESSAGE FROM SERVER:", message);

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

