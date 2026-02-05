import { GameState } from '@/types/gameState';
import { GameAction } from '@/types/gameAction';
import { hasValidPlayerCount, makeFakePlayers, shuffleDeck, dealCards } from '@/utils/utils';
import { determineLives, determineWinLevel, removeTopCardFromPlayer, addCardToDiscardPile } from '@/types/gameState';

export function gameReducer(
    state: GameState,
    action: GameAction
): GameState {
    switch (action.type) {
        case 'GAME_START':
            console.log('GAME STARTTO', state);

            const playerCount = state.players.length;
            if (!hasValidPlayerCount(state.players)) {
                console.error("Player Count is invalid:", playerCount);
                return state;
            }

            const lives = determineLives(playerCount);
            const winLevel = determineWinLevel(playerCount);

            return {
                ...state,
                gamePhase: 'playing',
                lives,
                winLevel
            };

        case 'MAKE_FAKE_PLAYERS':
            console.log('MAKE FAKE PLAYERS');
            const players = makeFakePlayers(state, action.playerCount);
            console.log('players made: ', players)
            return {
                ...state,
                players
            };


        case 'LEVEL_START':
            console.log('LEVEL START');
            // start with all 100 cards
            const shuffledDeck = shuffleDeck(state.deck);
            // TODO: sort each hand
            dealCards(state.players, shuffledDeck, state.level.number);
            state.players.map(player => player.hand.cards.map(card => console.log(card.number)));
            // put all players in not ready mode TODO: do something for this
            // maybe store players * level top cards for checking later?


            return {
                ...state,
                // 
            };

        case 'FAKE_PLAY':
            console.log('FAKE PLAY')
            const playerIndex = state.players.findIndex(
                p => p.id === action.playerId
            );

            if (playerIndex === -1) return state;

            console.log('From Player ', action.playerId);

            const player = state.players[playerIndex];


            const { updatedPlayer, playedCard } =
                removeTopCardFromPlayer(player);

            if (!playedCard) return state;

            console.log('Card played: ', playedCard);

            const updatedPlayers = state.players.map((p, index) =>
                index === playerIndex ? updatedPlayer : p
            );

            const updatedDiscardPile = addCardToDiscardPile(
                state.discardPile,
                playedCard
            );
            // DETERMINE IF IT WAS VALID
            // IF INVALID, TAKE AWAY LIFE
            // IF INVALID, CHECK IF WE LOST THE GAME
            // DESPITE VALIDITY, CHECK IF WE WON THE GAME
            // IF WE DID NOT WIN, CHECK IF ALL CARDS WERE PLAYED OR IF PLAYERS HAVE NO MORE CARDS



            return {
                ...state,
                players: updatedPlayers,
                discardPile: updatedDiscardPile   
            };


        default:
            return state;
    }
}