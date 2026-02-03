// card in game rules
import { GameState } from '@/types/gameState';

export interface Card {
    id: string;
    name: string;
    play: (state: GameState) => GameState;
    number: number;
}
