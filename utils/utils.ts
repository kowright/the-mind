import { PlayerView } from "../components/models/player";
import { GameState } from "../types/gameState";
import { Player } from "../types/player";
import { Card } from "../types/card";
import { Hand } from "../types/hand";

export function hasValidPlayerCount(players: Player[]) {
    const playerCount = players.length;
    if (playerCount < 1 || playerCount > 4) {
        return false;
    }
    return true;
}

export function makeFakePlayers(
    gameState: GameState,
    numberToMake: number
): Player[] {
    return Array.from({ length: numberToMake }, (_, i): Player => ({
        id: i,
        name: `Player ${i + 1}`,
        hand: { cards: [] },
    }));
}
