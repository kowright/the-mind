import { Card } from "./card";
import { GamePhase } from "./gamePhase";
import { Level } from "./level";
import { Player } from "./player";
import { Shuriken } from "./shuriken";

export interface GameState {
    players: Player[];
    lives: number;
    shuriken: Shuriken[]; // TODO might not even need a whole type for it
    level: Level; // TODO: might make a constant map of what levels are 
    discardPile: Card[];
    // players who want shuriken
    gamePhase: GamePhase;
}


/*







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