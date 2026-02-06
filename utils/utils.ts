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
): { players: Player[]; remainingDeck: Card[] } {

    let deck = [...shuffledDeck];

    let updatedPlayers = players.map(player => ({
        ...player,
        hand: { cards: [] as Card[] },
    }));

    for (let i = 0; i < level; i++) {
        updatedPlayers = updatedPlayers.map(player => {
            const card = deck.shift();
            if (!card) return player;

            return {
                ...player,
                hand: {
                    ...player.hand,
                    cards: [...player.hand.cards, card],
                },
            };
        });
    }

    return { players: updatedPlayers, remainingDeck: deck };
}


export function sortPlayerHands(players: Player[]) {
    return players.map(player => ({
        ...player,
        hand: {
            ...player.hand,
            cards: [...player.hand.cards].sort((a, b) => a.number - b.number),
        },
    }));
}


export function loseLife(lives: number): number {
    return Math.max(lives - 1, 0);
}


export function areAllLivesLost(lives: number) {
    return lives === 0;
}

export function isGameWon(gameState: GameState) {
    const atWinLevel = gameState.level.number === gameState.winLevel;
    return atWinLevel
}

export function removeLowestCardFromAllHands(players: Player[]): Player[] {
    return players.map(player => {
        if (player.hand.cards.length === 0) return player;

        const lowest = Math.min(
            ...player.hand.cards.map(card => card.number)
        );

        return {
            ...player,
            hand: {
                ...player.hand,
                cards: player.hand.cards.filter(
                    card => card.number !== lowest
                ),
            },
        };
    });
}

export function removeCardsLowerThanCardNumber(
    players: Player[],
    playedCardNumber: number,
): {
    editedPlayers: Player[];
    removedCards: Card[];
    } {
    const removedCards: Card[] = [];
    console.log('remove cards lower than: ', playedCardNumber);
    const editedPlayers = players.map(player => {
        const keptCards: Card[] = [];
        const discarded: Card[] = [];

        for (const card of player.hand.cards) {
            if (card.number < playedCardNumber) {
                discarded.push(card);
                card.mistakenlyPlayedByPlayerId = player.id;
                card.mistakenlyPlayed = true;
            } else {
                keptCards.push(card);
            }
        }

        removedCards.push(...discarded);

        return {
            ...player,
            hand: {
                ...player.hand,
                cards: keptCards,
            },
        };
    });

    return { editedPlayers, removedCards };
}
