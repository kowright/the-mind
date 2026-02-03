import { Card } from '@/types/card';
export interface Hand {
    cards: Card[];
    removeLowestCard: (hand: Hand) => Hand;
}