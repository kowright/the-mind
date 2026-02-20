import { Hand } from '@/shared/types/hand';
export interface Player {
    id: string;
    hand: Hand;
    name: string;
    cardCount: number;
}