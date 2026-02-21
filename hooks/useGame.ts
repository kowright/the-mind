import { useContext } from 'react';
import { GameContext } from '../components/models/gameContext';
import { createLogger } from '../shared/types/logger';

const log = createLogger('USE GAME')
export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        log.error('useGame must be used within a GameProvider')
    }
    return context;
}
