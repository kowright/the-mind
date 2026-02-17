import { GamePhase } from "./gamePhase";
import { GameState } from "./gameState";

// events & intent, not how they happen
// all but 1 are for ui -> server
// add requiredId so it can be used on client and server

// TODO: group these
/*export type GameAction =
    // players
    | { type: 'PLAY_CARD'; cardNumber: number, playerId: string; }
    | { type: 'CALL_FOR_SHURIKEN', playerId: string }
    | { type: 'READY_TO_START', playerId: string }
    | { type: 'PLAYER_CONNECTION', playerId: string, requiresId: true }
    | { type: 'PLAYER_DISCONNECTION', playerId: string }
    | { type: 'PLAYER_NAME_CHANGE'; name: string; playerId: string; requiresId: true }
    | { type: 'ASSIGN_PLAYER_ID', playerId: string, requiresId: true }
    // game
    | { type: 'FAILED_ORDER' } // PROBABLY LOGIC RETURN USER NAME WHO MESSED UP
    | { type: 'SHURIKEN_CALLED' } // probably want something about which cards are leaving
    | { type: 'SHURIKEN_OVER' }
    | { type: 'GAME_WON' }
    | { type: 'GAME_LOST' }
    | { type: 'LEVEL_START' }
    | { type: 'GAME_START' }
    | { type: 'MAKE_FAKE_PLAYERS', playerCount: number; }
    | { type: 'FAKE_PLAY'; playerId: string; }
    | { type: 'TRANSITION', nextAction: GameAction }
    | { type: 'LEVEL_END' }
    | { type: 'GAME_RESTART' }
    | { type: 'TRANSITION_TO_PLAYING' }
    | { type: 'STATE_UPDATE', state: GameState } // server -> ui client only ever gets this 

    ;*/

const gameActionSchema = {
    PLAYER_NAME_CHANGE: { requiresPlayerId: true },
    PLAYER_CONNECTION: { requiresPlayerId: false },
    PLAYER_DISCONNECTION: { requiresPlayerId: true },
    ASSIGN_PLAYER_ID: { requiresPlayerId: false },
} as const;

export type GameActionType = keyof typeof gameActionSchema;
export interface ActionPayloads {
    PLAYER_NAME_CHANGE: { name: string };
    PLAYER_CONNECTION: {};
    PLAYER_DISCONNECTION: {};
    ASSIGN_PLAYER_ID: {};
}
export type ClientAction = {
    [K in GameActionType]: { type: K } & ActionPayloads[K]
}[GameActionType];


export type ServerAction = {
    [K in GameActionType]: // ex. K is PLAYER_NAME_CHANGE
    typeof gameActionSchema[K]['requiresPlayerId'] extends true
    ? { type: K } & ActionPayloads[K] & { playerId: string }
    : { type: K } & ActionPayloads[K]
}[GameActionType];

export function enrichAction(action: ClientAction, playerId: string): ServerAction | null {
    if (!action || typeof action.type !== "string") {
        console.warn("Invalid action:", action);
        return null;
    }

    const schema = gameActionSchema[action.type as GameActionType];
    if (!schema) {
        console.warn("Unknown action type:", action.type);
        return null;
    }

    if (schema.requiresPlayerId) {
        return { ...action, playerId } as ServerAction;
    }

    return action as ServerAction;
}
