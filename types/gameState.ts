export interface GameState {
    // players
    // lives
    // shuriken
    // level
    // playedCards
    // players who want shuriken
    // game phase
}

// move below ones to other files

/*
export Shuriken {
    // remove every player's lowest card
}

export Level {
    // number
    // reward 
    // reward action
}

export GamePhase {
    // setup
    // play
    // win phase
    // game Over
}

export type GameAction =
  | { type: 'PLAY_CARD'; cardId: string }
  | { type: 'END_TURN' }
  | { type: 'RESET_GAME' };


// EXAMPLE 
export function reduceGame(
  state: GameState,
  action: GameAction
): GameState {
  switch (action.type) {
    case 'PLAY_CARD': {
      const player = state.players.find(
        (p) => p.id === state.currentPlayerId
      )!;

      const card = player.hand.find(
        (c) => c.id === action.cardId
      )!;

      const newState = card.play(state);

      return {
        ...newState,
        discardPile: [...state.discardPile, card],
      };
    }

    case 'END_TURN':
      return {
        ...state,
        currentPlayerId: nextPlayer(state),
      };

    default:
      return state;
  }
}


*/