import { hasValidPlayerCount } from "../utils/utils";
import { Card } from "./card";
import { GameAction } from "./gameAction";
import { GamePhase } from "./gamePhase";
import { Level, levels } from "./level";
import { Player } from "./player";

export interface GameState {
    players: Player[];
    lives: number;
    shuriken: number;
    level: Level;
    discardPile?: Card[];
    // players who want shuriken
    gamePhase: GamePhase;
    winLevel: number;
    lastGameAction?: GameAction;
}

export const initialGameState: GameState = {
    players: [],
    lives: 0,
    shuriken: 0,
    level: levels[0],
    discardPile: undefined,
    gamePhase: 'setup',
    winLevel: 0,
    lastGameAction: undefined,
}


export function determineLivesAndShuriken(gameState: GameState) {  
    const validPlayerCount = hasValidPlayerCount(gameState.players);
    if (!validPlayerCount) {
        // return error
        return gameState;
    }

    switch (gameState.players.length) {
        case 2:
            gameState = {
                ...gameState,
                winLevel: 12,
                lives: 2,
                shuriken: 1,
            };
        case 3:
            gameState = {
                ...gameState,
                winLevel: 10,
                lives: 3,
                shuriken: 1,
            };
        case 4: 
            gameState = {
                ...gameState,
                winLevel: 8,
                lives: 4,
                shuriken: 1,
            };
    }
}

export function canShurikenBeUsed(gameState: GameState) {
    const shurikenCount = gameState.shuriken;
    const playerCount = gameState.players.length;

    return shurikenCount === playerCount;
}
