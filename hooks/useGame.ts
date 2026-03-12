import { useContext } from 'react';
import { GameContext, GameContextType } from '../components/models/gameContext';
import { createLogger } from '../shared/types/logger';

const log = createLogger('USE GAME')
export function useGame(): GameContextType  {
    const context = useContext(GameContext);
    if (!context) {
        log.error('useGame must be used within a GameProvider')
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
}
