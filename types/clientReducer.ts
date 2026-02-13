/*import { ClientAction } from '@/shared/types/gameAction'
import { GameState } from '@/shared/types/gameState';

function clientReducer(state: GameState, action: ClientAction): GameState {
    switch (action.type) {
        case "STATE_UPDATE":
            console.log("new state!", action.state);
            return {
                ...state,
                ...action.state,
            };

        case "ASSIGN_PLAYER_ID":
            return {
                ...state,
                myPlayerId: action.playerId
            };

        default:
            return state;
    }
}
*/