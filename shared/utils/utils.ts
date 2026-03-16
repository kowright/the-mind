import { GameState, areAllHandsEmpty, determineRewards } from "../types/gameState";
import { Player } from "../types/player";
import { Card } from "../types/card";
import { Hand } from "../types/hand";
import { Level, levels } from "../types/level";
import { GamePhase } from "../types/gamePhase";

export const mistakeWaitTime: number = 5;
export const winLevelWaitTime: number = 10;
export const startLevelWaitTime: number = 3;
export const shurikenWaitTime: number = 5;
export const countdownInterval: number = 1000;
export const errorWaitTime: number = 5;

export function allPlayersHaveNames(players: Player[]) {
    return players.every(
        player => player.name && player.name.trim().length > 0
    );
}

export function hasValidPlayerCount(players: Player[]) {
    const playerCount = players.length;
    if (playerCount < 2 || playerCount > 4) {
        return false;
    }
    return true;
}

export function makePlayer(
    id: string,
    name?: string,
): Player {
    return {
        hand: { cards: [] },
        name: name ?? '',
        id: id,
        cardCount: 0,
    }
}

export function shuffleDeck<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function resetAllCardMistakes(players: Player[]): Player[] {
    return players.map(player => ({
        ...player,
        hand: {
            ...player.hand,
            cards: player.hand.cards.map(card => ({
                ...card,
                mistakenlyPlayed: false,
                mistakenPlayerId: undefined,
            })),
        },
    }));
}

/**
 * Deal cards- each card from the top of the deck goes to a different player.
 * Removes cards from shuffledDeck as they are dealt.
 */
export function dealCards(
    players: Player[],
    shuffledDeck: Card[],
    level: number
): { players: Player[] } {

    let deck = [...shuffledDeck];

    let updatedPlayers = players.map(player => ({
        ...player,
        hand: { cards: [] as Card[] },
    }));

    for (let i = 0; i < level; i++) {
        updatedPlayers = updatedPlayers.map(player => {
            const card = deck.shift();
            if (!card) return player;
            const cards = [...player.hand.cards, card];
            return {
                ...player,
                hand: {
                    ...player.hand,
                    cards,
                },
                cardCount: cards.length
            };
        });
    }

    return { players: updatedPlayers };
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

export function removeLowestCardFromAllHands(
    players: Player[]
): { players: Player[]; removedCards: Card[] } {
    const removedCards: Card[] = [];

    const updatedPlayers = players.map(player => {
        if (player.hand.cards.length === 0) return player;

        const [lowest, ...rest] = player.hand.cards;

        removedCards.push(lowest);

        return {
            ...player,
            hand: { cards: rest },
            cardCount: rest.length,
        };
    });

    return { players: updatedPlayers, removedCards };
}

export function removeCardsLowerThanCardNumber(
    players: Player[],
    playedCardNumber: number,
): {
    editedPlayers: Player[];
    removedCards: Card[];
    } {
    const removedCards: Card[] = [];
    const editedPlayers = players.map(player => {
        const keptCards: Card[] = [];
        const discarded: Card[] = [];

        for (const card of player.hand.cards) {
            if (card.number < playedCardNumber) {
                discarded.push(card);
             
                card.mistakenPlayerId = player.id;
                card.mistakenlyPlayed = true;

            } else {
                keptCards.push(card);
            }
        }

        removedCards.push(...discarded);

        const hand = {
            ...player.hand,
            cards: keptCards
        }

        return {
            ...player,
            hand,
            cardCount: hand.cards.length
        };
    });

    return { editedPlayers, removedCards };
}

export function removeOtherPlayersFromStateForClient(
    state: GameState,
    playerId: string
): GameState {
    const emptyHand: Hand = { cards: [] };

    return {
        ...state,
        players: state.players.map(player => {
            if (player.id === playerId) {
                return player; // clients get all of their data
            }

            return {
                ...player, 
                hand: emptyHand // clients can't get other clients crucial data
                // card count remains to show other clients know what to display
            };
        }),
    };
}

export function resolveEndOfRound(
    state: GameState,
    players: Player[],
    lives: number,
    shuriken: number,
    level: Level
) {
    let updatedGamePhase: GamePhase = state.gamePhase;
    let updatedLevel = level;
    let rewardedLives = lives;
    let rewardedShuriken = shuriken;
    let updatedGameOutcome = state.gameOutcome;

    const noMoreLives = areAllLivesLost(rewardedLives);

    updatedGamePhase = noMoreLives ? 'gameOver' : updatedGamePhase;


    if (noMoreLives) {
        updatedGameOutcome = 'lost';
        return {
            updatedGamePhase,
            updatedLevel,
            rewardedLives,
            rewardedShuriken,
            updatedGameOutcome,
        };
    }


    const noMoreCards = areAllHandsEmpty(players);
    if (noMoreCards) {
        const gameWon = level.number === state.winLevel;

        updatedGamePhase = gameWon ? "gameOver" : "levelComplete";
        updatedGameOutcome = gameWon ? "won" : "lost";

        if (!gameWon) {
            const nextLevelNumber = level.number + 1;
            updatedLevel =
                levels.find(l => l.number === nextLevelNumber) ?? level;

            const rewards = determineRewards(lives, shuriken, level);
            
            rewardedLives = rewards.rewardLives;
            rewardedShuriken = rewards.rewardShuriken;

        }

        return {
            updatedGamePhase,
            updatedLevel,
            rewardedLives,
            rewardedShuriken,
            updatedGameOutcome,
        };
    }

    updatedGamePhase = 'playing'

    return {
        updatedGamePhase,
        updatedLevel,
        rewardedLives,
        rewardedShuriken,
        updatedGameOutcome,
    };
}