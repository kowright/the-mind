// card in game rules
import { GameState } from '@/types/gameState';

export interface Card {
/*    id: string;*/
/*    play: (state: GameState) => GameState;*/
    number: number;
}

export function playCard(card: Card, playerId: number, gameState: GameState) {

    const player = gameState.players.find(p => p.id === playerId);
    if (!player) {
        // player not found. 
    }

    const playedCard = player?.hand.cards.find(c => c.number === card.number); 
    //remove card from player hand

    // check if deck order is bad
        // if so, lose life, tell everyone someone messed up


    // create a new game state
    // return that game state
}