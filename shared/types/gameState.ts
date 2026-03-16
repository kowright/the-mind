import { Card } from "./card";
import { GamePhase } from "./gamePhase";
import { GameSettings, initialGameSettings } from "./gameSettings";
import { Level, levels } from "./level";
import { Player } from "./player";

export interface GameState {
    players: Player[];
    lives: number;
    shuriken: number;
    level: Level;
    discardPile?: Card[];
    deck: Card[];
    gamePhase: GamePhase;
    winLevel: number;
    readyToStartPlayers: string[];
    shurikenCalls: string[];
    lastRemovedCards: Card[];
    lastPlayedCard?: Card;
    shurikenedCards: Card[];
    gameOutcome?: 'won' | 'lost';
    errorMessage?: string;
    gameSettings: GameSettings;
    paused?: boolean;
}

export const initialGameState: GameState = {
    players: [],
    lives: 0,
    shuriken: 1,
    level: levels[0],
    discardPile: undefined,
    deck: createDeck(),
    gamePhase: 'setup',
    winLevel: 0,
    readyToStartPlayers: [],
    shurikenCalls: [],
    lastRemovedCards: [],
    shurikenedCards: [],
    gameSettings: initialGameSettings,
    paused: false,
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

function createDeck() {
    return Array.from({ length: 100 }, (_, i): Card => ({
        number: i + 1,
        mistakenlyPlayed: false,
        id: `card-${i+1}`
    }));
}

export function removeTopCardFromPlayer(
    player: Player
): { updatedPlayer: Player; playedCard: Card | null } {
    const cards = player.hand.cards;
    if (cards.length === 0) {
        return { updatedPlayer: player, playedCard: null };
    }

    const card = cards[0];

    return {
        playedCard: card,
        updatedPlayer: {
            ...player,
            hand: {
                cards: cards.slice(1),
            },
        },
    };
};

export function addCardToDiscardPile(
    discardPile: Card[] | undefined,
    card: Card
): Card[] {
    return [...(discardPile ?? []), card];
}

export function areAllHandsEmpty(players: Player[]): boolean {
    return players.every(player => player.hand.cards.length === 0);
}

export function determineRewards(lives: number, shuriken:number, level: Level) {
    let rewardShuriken = shuriken;
    let rewardLives = lives;

    if (level.reward === 'Life') {
        rewardLives++;
    }
    else if (level.reward === 'Shuriken') {
        rewardShuriken++;
    }

    return { rewardLives, rewardShuriken };
}