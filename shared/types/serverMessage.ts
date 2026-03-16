import { GameState } from "./gameState";

export type ServerMessage =
    | { type: "ASSIGN_PLAYER_ID"; playerId: string }
    | { type: "STATE_UPDATE"; state: GameState };