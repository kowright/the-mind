import { GameState } from '@/types/gameState';
import { GameAction } from '@/types/gameAction';
import { hasValidPlayerCount, makeFakePlayers } from '@/utils/utils';
import { determineLives, determineWinLevel } from '@/types/gameState';

export function gameReducer(
    state: GameState,
    action: GameAction
): GameState {
    switch (action.type) {
        case 'GAME_START':
            console.log('GAME STARTTO', state);

            const playerCount = state.players.length;
            if (!hasValidPlayerCount(state.players)) {
                console.error("Player Count is invalid:", playerCount);
                return state;
            }
           
            const lives = determineLives(playerCount);
            const winLevel = determineWinLevel(playerCount);

            console.log('state lives', state.lives);
 
            return {
                ...state,
                gamePhase: 'playing',
                lives,
                winLevel
            };

        case 'MAKE_FAKE_PLAYERS':
            console.log('MAKE FAKE PLAYERS');
            const players = makeFakePlayers(state, action.playerCount);
            console.log('players made: ', players)
            return {
                ...state,
                players
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
