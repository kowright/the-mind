import { GameAction } from '@/types/gameAction';
import { GamePhase } from '@/types/gamePhase';
import { hasValidPlayerCount, makeFakePlayers, shuffleDeck, dealCards, loseLife, areAllLivesLost, isGameWon, sortPlayerHands, removeLowestCardFromAllHands, removeCardsLowerThanCardNumber } from '@/utils/utils';
import { determineLives, determineWinLevel, removeTopCardFromPlayer, addCardToDiscardPile, wasLastPlayWasValid, getLastValidCard, setPlayedCard, areAllHandsEmpty, determineRewards } from '@/types/gameState';
import { Card } from '@/types/card';
import { Level, levels, RewardType } from "./level";
import { GameState, initialGameState } from '@/types/gameState';

export function gameReducer(
    state: GameState,
    action: GameAction
): GameState {
    switch (action.type) {
        case 'GAME_START':
            console.log('GAME STARTTO');

            const playerCount = state.players.length;
            if (!hasValidPlayerCount(state.players)) {
                console.error("Player Count is invalid:", playerCount);
                return state;
            }

            const lives = determineLives(playerCount);
            const winLevel = determineWinLevel(playerCount);

            return { //TODO add last action to all of these returns
                ...state,
                gamePhase: 'playing',
                lives,
                winLevel
            };

        case 'GAME_RESTART':
            console.log("GAME RESTART");

            return {
                
                ...initialGameState,
            }


        case 'MAKE_FAKE_PLAYERS':
            console.log('MAKE FAKE PLAYERS');
            const players = makeFakePlayers(state, action.playerCount);
            console.log('players made: ', players)
            return {
                ...state,
                players
            };


        case 'LEVEL_START':
            {
                console.log('LEVEL START');
                // start with all 100 cards

                const shuffledDeck = shuffleDeck(state.deck);

                const { players, remainingDeck } = dealCards(state.players, shuffledDeck, state.level.number);
            
                const playersWithSortedHands = sortPlayerHands(players);

                state.players.map(player => player.hand.cards.map(card => console.log(card.number)));
                // put all players in not ready mode TODO: do something for this

                const startDiscardPile: Card[] = [];
                const startGamePhase: GamePhase = 'playing';
                return {
                    ...state,
                    discardPile: startDiscardPile,
                    gamePhase: startGamePhase,
                    players: playersWithSortedHands,
                    shurikenCalls: [],

                };
            }

        case 'FAKE_PLAY':
            console.log('FAKE PLAY')
            const playerIndex = state.players.findIndex(
                p => p.id === action.playerId
            );

            if (playerIndex === -1) return state;

            console.log('From Player ', action.playerId);

            const player = state.players[playerIndex];


            let { updatedPlayer, playedCard } =
                removeTopCardFromPlayer(player);

            if (!playedCard) return state;

            console.log('Card played: ', playedCard);

            const lastValidCard = getLastValidCard(state.discardPile);

          /*  const wasRightMove = wasLastPlayWasValid(lastValidCard, playedCard);


            if (!wasRightMove) {
                console.log('YOU MESSED UP ', updatedPlayer.name);
              *//*  const mistakeCard = setPlayedCard(playedCard, updatedPlayer.id, wasRightMove);
                playedCard = { ...mistakeCard };*//*
                playedCard = {
                    ...playedCard,
                    mistakenlyPlayed: true,
                    mistakenlyPlayedByPlayerId: updatedPlayer.id,
                };


                
            }

            let updatedGamePhase: GamePhase = wasRightMove ? state.gamePhase : 'mistake';
            console.log('1 game phase', updatedGamePhase)*/

            let updatedPlayers = state.players.map((p, index) =>
                index === playerIndex ? updatedPlayer : p
            );

        
            let updatedGamePhase: GamePhase = state.gamePhase;
            let wasRightMove: boolean = true;
            const { editedPlayers, removedCards } =
                removeCardsLowerThanCardNumber(updatedPlayers, playedCard.number);
            if (removedCards.length > 0) {
                removedCards.map(card => console.log(card.mistakenlyPlayedByPlayerId + ' DID NOT PLAY WHEN THEY WERE SUPPOSED TO'))
                playedCard = {
                    ...playedCard,
                    mistakenlyPlayed: true,
                    mistakenlyPlayedByPlayerId: updatedPlayer.id,
                };
                updatedGamePhase = 'mistake';
                wasRightMove = false;
                console.log('playedCard', playedCard)
                console.log('cards were removed game phase', updatedGamePhase)
            }

            let updatedDiscardPile: Card[] = addCardToDiscardPile(
                state.discardPile,
                playedCard
            );
            console.log('removed cards: ', removedCards);
            console.log('editedPlayers', editedPlayers);
            updatedDiscardPile = [
                ...updatedDiscardPile,
                ...removedCards, 
            ];

            updatedPlayers = updatedPlayers.map(p =>
                editedPlayers.find(ep => ep.id === p.id) ?? p
            );

            

            let updatedLives = wasRightMove ? state.lives : loseLife(state.lives);
            updatedLives = removedCards.length > 0 ? loseLife(updatedLives) : updatedLives;




            let updatedLevel: Level = state.level;
            let completedLevel = state.level;

            let rewardedLives: number = updatedLives;
            let rewardedShuriken: number = state.shuriken;

            console.log('lives: ', updatedLives);
            const noMoreLives = areAllLivesLost(updatedLives);

            updatedGamePhase = noMoreLives ? 'gameOver' : updatedGamePhase;
            console.log('gamePhase', updatedGamePhase);


            if (noMoreLives) {
                return {
                    ...state,
                    lastGameAction: { type: 'FAKE_PLAY', playerId: updatedPlayer.id },
                    players: updatedPlayers,
                    discardPile: updatedDiscardPile,
                    lives: rewardedLives,
                    gamePhase: updatedGamePhase,
                    shuriken: rewardedShuriken,
                    level: updatedLevel,
                    lastRemovedCards: removedCards,// TODO have transition or something to show what happened when someone made a mistake
                };
            }
  

            const noMoreCards = areAllHandsEmpty(updatedPlayers);
            
            if (noMoreCards) {
                const gameWon = isGameWon(state);
                if (gameWon) {
                    console.log("YAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY GAME WON!")

                    updatedGamePhase = 'gameOver';
                }
                else {
                    updatedGamePhase = 'transition';
                }
                const nextLevelNumber = updatedLevel.number + 1;
                console.log('LEVEL WON, onto level ', nextLevelNumber);

                updatedLevel = levels.find(l => l.number === nextLevelNumber) ?? state.level;

                console.log('array', levels[completedLevel.number-1])

                const { rewardLives, rewardShuriken } = determineRewards(updatedLives, state.shuriken, completedLevel);
                rewardedLives = rewardLives;
                rewardedShuriken = rewardShuriken;
                // set level to next level and play.tsx should have an effect for checking level to dispatch next action
            }

       
          


            console.log('fake play last game phase', updatedGamePhase)
            return {
                ...state,
                lastGameAction: {type: 'FAKE_PLAY', playerId: updatedPlayer.id},
                players: updatedPlayers,
                discardPile: updatedDiscardPile,   
                lives: rewardedLives, 
                gamePhase: updatedGamePhase,
                shuriken: rewardedShuriken,
                level: updatedLevel,
                lastRemovedCards: removedCards,// TODO have transition or something to show what happened when someone made a mistake
            };


        case 'TRANSITION':
            console.log('TRANSITION');

            const transitionGamePhase: GamePhase = 'transition';
            console.log('new game phase', transitionGamePhase);
            return {
                ...state,
                gamePhase: transitionGamePhase,


            };

        case 'LEVEL_END':
            console.log('LEVEL END');

        case 'SHURIKEN_CALLED': { // do shuriken rules

            if (state.lastRemovedCards.length > 0) {
                return state; // we already calculated the rules
            }
            const { players, removedCards } =
                removeLowestCardFromAllHands(state.players);

            return {
                ...state,
                players,
                shuriken: state.shuriken - 1,
                lastRemovedCards: removedCards,
             
                // still in shuriken game phase
                // last game action
            };
        };


        case 'CALL_FOR_SHURIKEN': // votes, show shuriken screen
            console.log('CALL FOR SHURIKEN by ', action.playerId);

            if (state.gamePhase !== 'playing') return state;
            if (state.shuriken <= 0) return state;

            // Prevent double votes
            if (state.shurikenCalls.includes(action.playerId)) {
                return state; // TODO remove someone's call if clicked again
            }

            const shurikenCalls = [...state.shurikenCalls, action.playerId];

            const allAgreed =
                shurikenCalls.length === state.players.length;

            return {
                ...state,
                shurikenCalls,
                gamePhase: allAgreed ? 'shuriken' : state.gamePhase,
            };

        case 'SHURIKEN_OVER': { // leave shuriken screen
            console.log('SHURIKEN OVER')
        

            return {
                ...state,

                shurikenCalls: [],
                gamePhase: 'playing',
                lastRemovedCards: [],
            };
        }

        case 'MISTAKE_OVER':
            return {
                ...state,
                gamePhase: 'playing',
                
            };




        default:
            return state;
    }
}