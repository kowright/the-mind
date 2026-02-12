import { createContext, useReducer, ReactNode, useEffect } from 'react';
import { gameReducer } from '@/types/gameReducer';
import { GameAction } from '@/types/gameAction';
import { GameState, initialGameState } from '@/types/gameState';
import { websocketService } from '@/services/websocketService';
import { Platform } from 'react-native';

type GameContextType = {
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
};

const laptopPort: string = 'ws://localhost:3000';
const mobilePort: string = "ws://192.168.2.16:3000";

export const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, initialGameState);
    const url =
        Platform.OS === "web"
            ? "ws://localhost:3000"
;

    useEffect(() => {

        if (!websocketService.isConnected()) {
            websocketService.connect(url, () => {
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

