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
    shuriken: 1,
    level: levels[0],
    discardPile: undefined,
    gamePhase: 'setup',
    winLevel: 0,
    lastGameAction: undefined,
}


export function determineWinLevel(playerCount: number) {

    switch (playerCount) {
        case 2: return 12;

        case 3: return 10;
    
        case 4: return 8;

        default: return 0;
    }
}


export function determineLives(playerCount: number) {
    return playerCount;
}

export function canShurikenBeUsed(gameState: GameState) {
    const shurikenCount = gameState.shuriken;
    const playerCount = gameState.players.length;

    return shurikenCount === playerCount;
}