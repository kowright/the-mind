import { createContext, useReducer, ReactNode } from 'react';
import { gameReducer } from '@/types/gameReducer';
import { GameAction } from '@/types/gameAction';
import { GameState, initialGameState } from '@/types/gameState';

type GameContextType = {
    state: GameState;
    dispatch: React.Dispatch<GameAction>;
};

export const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
        const [state, dispatch] = useReducer(gameReducer, initialGameState);
    
    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

