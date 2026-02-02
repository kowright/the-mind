// card in game rules

export interface Card {
    id: string;
    name: string;
    play: (state: GameState) => GameState;
    number: number;
}
