export type GameAction =
    | { type: 'PLAY_CARD'; cardId: string }
    | { type: 'END_TURN' }
    | { type: 'RESET_GAME' };
