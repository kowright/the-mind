import { GamePhase } from "./gamePhase";
import { GameState } from "./gameState";

// events & intent, not how they happen

const gameActionSchema = {
    PLAYER_NAME_CHANGE: { requiresPlayerId: true },
    PLAYER_CONNECTION: { requiresPlayerId: true },
    PLAYER_DISCONNECTION: { requiresPlayerId: true },
    ASSIGN_PLAYER_ID: { requiresPlayerId: false },
    PLAY_CARD: { requiresPlayerId: true },
    STATE_UPDATE: { requiresPlayerId: false },
    CALL_FOR_SHURIKEN: { requiresPlayerId: true },
    READY_TO_START: { requiresPlayerId: true },
    FAILED_ORDER: { requiresPlayerId: false },
    SHURIKEN_CALLED: { requiresPlayerId: false },
    SHURIKEN_OVER: { requiresPlayerId: false },
    GAME_START: { requiresPlayerId: false},
    GAME_WON: { requiresPlayerId: false },
    GAME_LOST: { requiresPlayerId: false },
    LEVEL_START: { requiresPlayerId: false },
    LEVEL_END: { requiresPlayerId: false },
    MAKE_FAKE_PLAYERS: { requiresPlayerId: false },
    FAKE_PLAY: { requiresPlayerId: true },
    TRANSITION: { requiresPlayerId: false },
    GAME_RESTART: { requiresPlayerId: false },  
    TRANSITION_TO_PLAYING: { requiresPlayerId: false },
} as const;

export type GameActionType = keyof typeof gameActionSchema;
export interface ActionPayloads {
    PLAYER_NAME_CHANGE: { name: string };
    PLAYER_CONNECTION: {};
    PLAYER_DISCONNECTION: {};
    ASSIGN_PLAYER_ID: {};
    STATE_UPDATE: { state: GameState };
    PLAY_CARD: { cardNumber: number };
    CALL_FOR_SHURIKEN: {};
    READY_TO_START: {};
    FAILED_ORDER: {};
    SHURIKEN_CALLED: {};
    SHURIKEN_OVER: {};
    GAME_START: {};
    GAME_WON: {};
    GAME_LOST: {};
    LEVEL_START: {};
    LEVEL_END: {};
    MAKE_FAKE_PLAYERS: { playerCount: number };
    FAKE_PLAY: {};
    TRANSITION: { nextAction: ServerAction }
    GAME_RESTART: {};
    TRANSITION_TO_PLAYING: {}
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

export function enrichAction(action: ClientAction, playerId: string): ServerAction {
    if (!action || typeof action.type !== "string") {
        console.warn("Invalid action:", action);
        return action;
    }

    const schema = gameActionSchema[action.type as GameActionType];

    if (schema.requiresPlayerId) {
        return { ...action, playerId } as ServerAction;
    }

    return action as ServerAction;
}
