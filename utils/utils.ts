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

export function shuffleDeck<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Deal cards- each card from the top of the deck goes to a different player.
 * Removes cards from shuffledDeck as they are dealt.
 */
export function dealCards(
    players: Player[],
    shuffledDeck: Card[],
    level: number
): Card[] {
    // Reset each player's hand
    players.forEach(player => (player.hand = { cards: [] }));

    for (let i = 0; i < level; i++) {
        for (let player of players) {
            const card = shuffledDeck.shift(); // take the top card
            if (!card) break; 
            player.hand.cards.push(card);
        }
    }

    return shuffledDeck; // remaining cards
}

 