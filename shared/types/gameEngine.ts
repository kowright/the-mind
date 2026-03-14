import type { GameState } from "./gameState";
import type { ServerAction } from "./gameAction";
import { initialGameState } from "./gameState";
import { gameReducer } from "./gameReducer";

let gameState: GameState = initialGameState;

export function getState(): GameState {
    return gameState;
}

export function applyAction(action: ServerAction): GameState {
    gameState = gameReducer(gameState, action);
    return gameState;
}
