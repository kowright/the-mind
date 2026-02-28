import { ServerAction } from '@/shared/types/gameAction';
import { GamePhase } from '@/shared/types/gamePhase';
import { hasValidPlayerCount, makeFakePlayers, shuffleDeck, dealCards, loseLife, areAllLivesLost, isGameWon, sortPlayerHands, removeLowestCardFromAllHands, removeCardsLowerThanCardNumber, makePlayer, resetAllCardMistakes } from '@/shared/utils/utils';
import { determineLives, determineWinLevel, removeTopCardFromPlayer, addCardToDiscardPile, getLastValidCard, areAllHandsEmpty, determineRewards } from '@/shared/types/gameState';
import { Card } from '@/shared/types/card';
import { Level, levels } from "./level";
import { GameState, initialGameState } from '@/shared/types/gameState';
import { createLogger } from './logger';

// TODO: remove logs

const log = createLogger('REDUCER')
export function gameReducer(
    state: GameState,
    action: ServerAction
): GameState {
    switch (action.type) {
        case 'PLAYER_CONNECTION': {
            let player = makePlayer(action.playerId)
            let players = [...state.players, player]
            
            return {
                ...state,
                players: [...players]
            };
        }

        case 'PLAYER_NAME_CHANGE': {
            console.log('PLAYER NAME CHANGE')
            const players = state.players.map(p =>
                p.id === action.playerId
                    ? { ...p, name: action.name }
                    : p
            );
            return {
                ...state,
                players
            };
        }

        case 'PLAYER_DISCONNECTION': {
            let players = state.players;
            players = players.filter((p) => p.id !== action.playerId);

            return {
                ...state,
                players: [...players]
            };
        }

        case 'STATE_UPDATE': // ui
            return {
                ...state,
                ...action.state,
            };

        case 'GAME_START':
            console.log('GAME STARTTO');

            const playerCount = state.players.length;
            if (!hasValidPlayerCount(state.players)) {
                log.error("Player Count is invalid:", playerCount)
                return state;
            }

            const lives = determineLives(playerCount);
            const winLevel = determineWinLevel(playerCount);

            return {
                ...state,
                gamePhase: 'agreeToStart',
                lives,
                winLevel
            };

        case 'GAME_RESTART':
            //TODO: why doesn't my phone also restart the game?
            log.info('Game is restarting')

            return {
                ...initialGameState,
                players: state.players,
            }


        case 'MAKE_FAKE_PLAYERS':
            console.log('MAKE FAKE PLAYERS');

            const players = makeFakePlayers(state, action.playerCount);

            return {
                ...state,
                players
            };


        case 'LEVEL_START':
            {
                console.log('LEVEL START');

                const shuffledDeck = shuffleDeck(state.deck);

                const { players } = dealCards(state.players, shuffledDeck, state.level.number);
            
                const playersWithSortedHands = sortPlayerHands(players);

                const playersWithResetHands = resetAllCardMistakes(playersWithSortedHands)

                const startDiscardPile: Card[] = [];
                const startGamePhase: GamePhase = 'agreeToStart';
                
                return {
                    ...state,
                    discardPile: startDiscardPile,
                    gamePhase: startGamePhase,
                    players: playersWithResetHands,
                    shurikenCalls: [],
                    readyToStartPlayers: [],
                    lastPlayedCard: undefined,
                };
            }

        case 'PLAY':
            console.log('PLAY')
            const playerIndex = state.players.findIndex(
                p => p.id === action.playerId
            );

            if (playerIndex === -1) return state;


            const player = state.players[playerIndex];

            let { updatedPlayer, playedCard } =
                removeTopCardFromPlayer(player);

            if (!playedCard) return state;

            let updatedLastPlayedCard = playedCard;

            let updatedPlayers = state.players.map((p, index) =>
                index === playerIndex ? updatedPlayer : p
            );

            let updatedGamePhase: GamePhase = state.gamePhase;

            let wasRightMove: boolean = true;

            const { editedPlayers, removedCards } =
                removeCardsLowerThanCardNumber(updatedPlayers, playedCard.number);
            console.log('removed cards', removedCards.map(c => console.log('removed card: ', c)))
            if (removedCards.length > 0) {
           
                playedCard = {
                    ...playedCard,
                    mistakenlyPlayed: true,
                    mistakenPlayerId: updatedPlayer.id,
                };
                console.log('played card', playedCard)
                updatedGamePhase = 'mistake';
                wasRightMove = false;
                updatedLastPlayedCard = playedCard;
            }

            let updatedDiscardPile: Card[] = addCardToDiscardPile(
                state.discardPile,
                playedCard
            );
            console.log('updated discard pile', updatedDiscardPile)


            updatedDiscardPile = [
                ...updatedDiscardPile,
                ...removedCards, 
            ];
            console.log('updated discard pile', updatedDiscardPile)

            updatedPlayers = updatedPlayers.map(p =>
                editedPlayers.find(ep => ep.id === p.id) ?? p
            );


            let updatedLives = wasRightMove ? state.lives : loseLife(state.lives);
            updatedLives = removedCards.length > 1 ? loseLife(updatedLives) : updatedLives;

            let updatedLevel: Level = state.level;
            let completedLevel = state.level;

            let rewardedLives: number = updatedLives;
            let rewardedShuriken: number = state.shuriken;

            const noMoreLives = areAllLivesLost(updatedLives);

            updatedGamePhase = noMoreLives ? 'gameOver' : updatedGamePhase;

            if (noMoreLives) {
                return {
                    ...state,
                    players: updatedPlayers,
                    discardPile: updatedDiscardPile,
                    lives: rewardedLives,
                    gamePhase: updatedGamePhase,
                    shuriken: rewardedShuriken,
                    level: updatedLevel,
                    lastRemovedCards: removedCards,
                    lastPlayedCard: updatedLastPlayedCard,
                };
            }

            const noMoreCards = areAllHandsEmpty(updatedPlayers);
            
            if (noMoreCards) {
                const gameWon = isGameWon(state);
                updatedGamePhase = gameWon ? 'gameOver' : 'transition';

                const nextLevelNumber = updatedLevel.number + 1;
                updatedLevel = levels.find(l => l.number === nextLevelNumber) ?? state.level;

                const { rewardLives, rewardShuriken } = determineRewards(updatedLives, state.shuriken, completedLevel);
                rewardedLives = rewardLives;
                rewardedShuriken = rewardShuriken;
            }

            return {
                ...state,
                players: updatedPlayers,
                discardPile: updatedDiscardPile,   
                lives: rewardedLives, 
                gamePhase: updatedGamePhase,
                shuriken: rewardedShuriken,
                level: updatedLevel,
                lastRemovedCards: removedCards,
                readyToStartPlayers: [],
                lastPlayedCard: updatedLastPlayedCard,
            };


        case 'TRANSITION':
            console.log('TRANSITION');

            const transitionGamePhase: GamePhase = 'transition';

            return {
                ...state,
                gamePhase: transitionGamePhase,
                readyToStartPlayers: [],
            };

        case 'SHURIKEN_CALLED': {

            if (state.lastRemovedCards.length > 0) {
                return state;
            }
            const { players, removedCards } =
                removeLowestCardFromAllHands(state.players);
                // TODO: what if shuriken is called to empty all the hands? 
            return {
                ...state,
                players,
                shuriken: state.shuriken - 1,
                lastRemovedCards: removedCards,
            };
        };

        case 'CALL_FOR_SHURIKEN':
            console.log('CALL FOR SHURIKEN by ', action.playerId);
            if (state.gamePhase !== 'playing') return state;
            if (state.shuriken <= 0) return state;

            let shurikenCalls = [...state.shurikenCalls, action.playerId];
            if (state.shurikenCalls.includes(action.playerId)) {
                // can double click button to remove your vote
                shurikenCalls = state.shurikenCalls.filter(call => call !== action.playerId)
            }
             
            const allAgreed =
                shurikenCalls.length === state.players.length;

            return {
                ...state,
                shurikenCalls,
                gamePhase: allAgreed ? 'shuriken' : state.gamePhase,
            };

        case 'SHURIKEN_OVER': { 
            console.log('SHURIKEN OVER')
        

            return {
                ...state,

                shurikenCalls: [],
                gamePhase: 'playing',
                lastRemovedCards: [],
            };
        }

        case 'READY_TO_START': 
            console.log('READY TO START')

            let readyToStartPlayers = [...state.readyToStartPlayers];

            if (readyToStartPlayers.includes(action.playerId)) {
                // can double click button to remove your vote
                readyToStartPlayers = readyToStartPlayers.filter(player => player !== action.playerId)
            }
            else {
                readyToStartPlayers = [...readyToStartPlayers, action.playerId]
            }
            

            const allReady =
                readyToStartPlayers.length === state.players.length;

            return {
                ...state,
                readyToStartPlayers,
                gamePhase: allReady ? 'transition' : state.gamePhase,
            };


        case 'TRANSITION_TO_PLAYING':
            return {
                ...state,
                gamePhase: 'playing',

            }

        case 'ERROR':
            log.warn('Error in reducer')
            return {
                ...state,
                gamePhase: 'error',

            }

        default:
            log.warn('Reducer could not find a case for action');
            return state;
    }
}