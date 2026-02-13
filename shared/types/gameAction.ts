import { GamePhase } from "./gamePhase";
import { GameState } from "./gameState";

// events & intent, not how they happen
// all but 1 are for server side

// TODO: group these
export type GameAction =
    // players
    | { type: 'PLAY_CARD'; cardNumber: number, playerId: number; }
    | { type: 'CALL_FOR_SHURIKEN', playerId: number }
    | { type: 'READY_TO_START', playerId: number }
    | { type: 'PLAYER_CONNECTION', playerId: string }
    | { type: 'PLAYER_DISCONNECTION', playerId: string}
    // game
    | { type: 'FAILED_ORDER' } // PROBABLY LOGIC RETURN USER NAME WHO MESSED UP
    | { type: 'SHURIKEN_CALLED' } // probably want something about which cards are leaving
    | { type: 'SHURIKEN_OVER' }
    | { type: 'GAME_WON' }
    | { type: 'GAME_LOST' }
    | { type: 'LEVEL_START' }
    | { type: 'GAME_START' }
    | { type: 'MAKE_FAKE_PLAYERS', playerCount: number; }
    | { type: 'FAKE_PLAY'; playerId: number; }
    | { type: 'TRANSITION', nextAction: GameAction }
    | { type: 'LEVEL_END' }
    | { type: 'GAME_RESTART' }
    | { type: 'TRANSITION_TO_PLAYING' }
    | { type: 'STATE_UPDATE', state: GameState } // ui

    ;
