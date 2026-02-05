import { GameState } from '@/types/gameState';
import { GameAction } from '@/types/gameAction';

export function gameReducer(
    state: GameState,
    action: GameAction
): GameState {
    switch (action.type) {
        case 'GAME_START':
            console.log('GAME STARTTO');

            // check players
 
            return {
                ...state,
                gamePhase: 'playing',
            };
           

        case 'LEVEL_START':
            return {
                ...state,
                // 
            };


        default:
            return state;
    }
}
