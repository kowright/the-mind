import { Card } from "./card";
import { GameAction } from "./gameAction";
import { GamePhase } from "./gamePhase";
import { Level, levels, RewardType } from "./level";
import { Player } from "./player";

export interface GameState {
    players: Player[];
    lives: number;
    shuriken: number;
    level: Level;
    discardPile?: Card[];
    deck: Card[];
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
    deck: createDeck(),
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


function createDeck() {
    return Array.from({ length: 100 }, (_, i): Card => ({
        number: i + 1,
        mistakenlyPlayed: false,
        id: `card-${i+1}`
    }));
}

export function getTopCardFromPlayerHand(
    playerId: number,
    gameState: GameState
): Card | null {
    const player = gameState.players.find(p => p.id === playerId);
    if (!player || player.hand.cards.length === 0) {
        return null;
    }

    return player.hand.cards[0]; // READ only
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

export function wasLastPlayWasValid(lastCard: Card | undefined, cardPlayed: Card) {
    if (!lastCard) {
        return true;
    }

    return !lastCard || lastCard.number < cardPlayed.number
}

export function getLastValidCard(discardPile: Card[] | undefined): Card | undefined {
    if (!discardPile) {
        return undefined;
    }
    for (let i = discardPile.length - 1; i >= 0; i--) {
        if (!discardPile[i].mistakenlyPlayed) {
            return discardPile[i];
        }
    }
    return undefined;
}

export function setPlayedCard(
    card: Card,
    playerId: number,
    wasCorrect: boolean
): Card {
    return {
        number: card.number,
        mistakenlyPlayedByPlayerId: playerId,
        mistakenlyPlayed: !wasCorrect,
    };
}

export function areAllHandsEmpty(players: Player[]): boolean {
    return players.every(player => player.hand.cards.length === 0);
}

export function determineRewards(lives: number, shuriken:number, level: Level) {
    let rewardShuriken = shuriken;
    let rewardLives = lives;

    if (level.reward === 'Life') {
        rewardLives++;
        console.log('Earned a life!')
    }
    else if (level.reward === 'Shuriken') {
        rewardShuriken++;
        console.log('Earned a shuriken!');
    }
    return { rewardLives, rewardShuriken };
}