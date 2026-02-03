import { Hand } from '@/types/hand';
export interface Player {
    id: number;
    hand: Hand;
    name: string;
}