import type { GameState } from "./gameState";
import type { GameAction } from "./gameAction";

const { initialGameState } = require("./gameState");
const { gameReducer } = require("./gameReducer");

let gameState: GameState = initialGameState;

export function getState(): GameState {
    return gameState;
}

export function applyAction(action: GameAction): GameState {
    console.log('applyAction', action)
    gameState = gameReducer(gameState, action);
    return gameState;
}
