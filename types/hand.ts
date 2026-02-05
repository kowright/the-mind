import { Card } from '@/types/card';

export interface Hand {
    cards: Card[];
}

/**
 * In the regular version of The Mind, there is only 1 of every card.
 * In the extreme version there are 2 of every card so we are accommodating that case. 
 */
export function removeLowestCard(hand: Hand): Hand {
    const lowest = Math.min(...hand.cards.map(c => c.number));
    let removed = false;

    return {
        cards: hand.cards.filter(card => {
            if (!removed && card.number === lowest) {
                removed = true;
                return false;
            }
            return true;
        }),
    };
}
