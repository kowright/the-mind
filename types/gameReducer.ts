import { GameState } from '@/types/gameState';
import { GameAction } from '@/types/gameAction';
import { GamePhase } from '@/types/gamePhase';
import { hasValidPlayerCount, makeFakePlayers, shuffleDeck, dealCards, loseLife, areAllLivesLost, isGameWon, sortPlayerHands, removeLowestCardFromAllHands, removeCardsLowerThanCardNumber } from '@/utils/utils';
import { determineLives, determineWinLevel, removeTopCardFromPlayer, addCardToDiscardPile, wasLastPlayWasValid, getLastValidCard, setPlayedCard, areAllHandsEmpty, determineRewards } from '@/types/gameState';
import { Card } from '@/types/card';
import { Level, levels, RewardType } from "./level";

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

            const wasRightMove = wasLastPlayWasValid(lastValidCard, playedCard);


            if (!wasRightMove) {
                console.log('YOU MESSED UP ', updatedPlayer.name);
              /*  const mistakeCard = setPlayedCard(playedCard, updatedPlayer.id, wasRightMove);
                playedCard = { ...mistakeCard };*/
                playedCard = {
                    ...playedCard,
                    mistakenlyPlayed: true,
                    mistakenlyPlayedByPlayerId: updatedPlayer.id,
                };


                
            }



            let updatedPlayers = state.players.map((p, index) =>
                index === playerIndex ? updatedPlayer : p
            );

        
        
            const { editedPlayers, removedCards } =
                removeCardsLowerThanCardNumber(updatedPlayers, playedCard.number);
            if (removedCards.length > 0) {
                removedCards.map(card => console.log(card.mistakenlyPlayedByPlayerId + ' DID NOT PLAY WHEN THEY WERE SUPPOSED TO'))
                playedCard = {
                    ...playedCard,
                    mistakenlyPlayed: true,
                    mistakenlyPlayedByPlayerId: updatedPlayer.id,
                };
                console.log('playedCard', playedCard)
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

            console.log('lives: ', updatedLives);
            const noMoreLives = areAllLivesLost(updatedLives);

            let updatedGamePhase : GamePhase = noMoreLives ? 'gameOver' : state.gamePhase;
            console.log('gamePhase', updatedGamePhase);

            const noMoreCards = areAllHandsEmpty(updatedPlayers);
            console.log('hands are empty?: ', noMoreCards);

            let updatedLevel: Level = state.level;
            let completedLevel = state.level;

            let rewardedLives: number = updatedLives;
            let rewardedShuriken: number = state.shuriken;
            
            if (noMoreCards) {
                const gameWon = isGameWon(state);
                if (gameWon) {
                    console.log("YAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY GAME WON!")

                    updatedGamePhase = 'gameOver';
                }
                else {
                    updatedGamePhase = 'transition';
                }
                console.log('LEVEL WON')
                const nextLevelNumber = updatedLevel.number+1;
                console.log('next level number', nextLevelNumber)
                updatedLevel = levels.find(l => l.number === nextLevelNumber) ?? state.level;

                console.log('array', levels[completedLevel.number-1])
                console.log('Going to level ', updatedLevel);

                const { rewardLives, rewardShuriken } = determineRewards(updatedLives, state.shuriken, completedLevel);
                rewardedLives = rewardLives;
                rewardedShuriken = rewardShuriken;
                // set level to next level and play.tsx should have an effect for checking level to dispatch next action
            }

            if (!state.discardPile === undefined) {
                const handIds = state.players.flatMap(p =>
                    p.hand.cards.map(c => c.id)
                );

                const discardIds = state.discardPile
                    ? state.discardPile.map(c => c.id)
                    : [];

                const allIds = [...handIds, ...discardIds];

                const duplicates = allIds.filter(
                    (id, index) => allIds.indexOf(id) !== index
                );

                if (duplicates.length > 0) {
                    console.error('DUPLICATE CARD IDS FOUND', duplicates);
                }

            }
          



            return {
                ...state,
                lastGameAction: {type: 'FAKE_PLAY', playerId: updatedPlayer.id},
                players: updatedPlayers,
                discardPile: updatedDiscardPile,   
                lives: rewardedLives, 
                gamePhase: updatedGamePhase,
                shuriken: rewardedShuriken,
                level: updatedLevel,

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

        case 'SHURIKEN_CALLED':
            console.log('SHURIKEN CALLED');

            const newShuriken = state.shuriken - 1;

            return {
                ...state,
                players: removeLowestCardFromAllHands(state.players),
                shuriken: newShuriken,
                //last game action
            };

        case 'CALL_FOR_SHURIKEN':
            console.log('CALL FOR SHURIKEN by ', action.playerId);

            if (state.gamePhase !== 'playing') return state;
            if (state.shuriken <= 0) return state;

            // Prevent double votes
            if (state.shurikenCalls.includes(action.playerId)) {
                return state;
            }

            const shurikenCalls = [...state.shurikenCalls, action.playerId];

            const allAgreed =
                shurikenCalls.length === state.players.length;

            return {
                ...state,
                shurikenCalls,
                gamePhase: allAgreed ? 'shuriken' : state.gamePhase,
            };

        case 'SHURIKEN_OVER': {
            if (state.shuriken <= 0) return state;

            // could shuriken all of the cards out of people's hands- maybe refactor away the win code to be here as well

            return {
                ...state,
                shuriken: state.shuriken - 1,
                players: removeLowestCardFromAllHands(state.players),
                shurikenCalls: [],
                gamePhase: 'playing',
            };
        }



        default:
            return state;
    }
}