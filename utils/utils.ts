import { Player } from "../types/player";

export function hasValidPlayerCount(players: Player[]) {
    const playerCount = players.length;
    if (playerCount < 1 || playerCount > 4) {
        return false;
    }
    return true;
}