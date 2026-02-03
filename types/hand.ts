import { Card } from '@/types/card';

export interface Hand {
    cards: Card[];
}

export function removeLowestCard(hand: Hand): Hand {
    const lowest = Math.min(...hand.cards.map(c => c.number));
    return {
        cards: hand.cards.filter(c => c.number !== lowest),
    };
}