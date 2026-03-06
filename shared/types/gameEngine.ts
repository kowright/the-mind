import type { GameState } from "./gameState";
import type { GameAction, ServerAction } from "./gameAction";
import { createLogger } from "./logger";

const { initialGameState } = require("./gameState");
const { gameReducer } = require("./gameReducer");

let gameState: GameState = initialGameState;

const log = createLogger('[GAME ENGINE]')

export function getState(): GameState {
    return gameState;
}

export function applyAction(action: ServerAction): GameState {
    gameState = gameReducer(gameState, action);
    return gameState;
}
