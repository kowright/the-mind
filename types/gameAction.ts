// events & intent, not how they happenm
export type GameAction =
    // players
    | { type: 'PLAY_CARD'; cardNumber: number, playerId: number; }
    | { type: 'CALL_FOR_SHURIKEN', playerId: number }
    // game
    | { type: 'FAILED_ORDER' } // PROBABLY LOGIC RETURN USER NAME WHO MESSED UP
    | { type: 'SHURIKEN_CALLED' } // probably want something about which cards are leaving
    | { type: 'GAME_WON' }
    | { type: 'GAME_LOST' }
    | { type: 'LEVEL_START' }
    | { type: 'GAME_START' }
    | { type: 'MAKE_FAKE_PLAYERS', playerCount: number; }



    ;
