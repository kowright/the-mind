// card in game rules
export interface Card {
    id: string;
    number: number;
    mistakenlyPlayed: boolean;
    mistakenPlayerId?: string;
}