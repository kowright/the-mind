import { ServerAction } from '@/shared/types/gameAction';
import { GamePhase } from '@/shared/types/gamePhase';
import { hasValidPlayerCount, shuffleDeck, dealCards, loseLife, sortPlayerHands, removeLowestCardFromAllHands, removeCardsLowerThanCardNumber, makePlayer, resetAllCardMistakes, resolveEndOfRound } from '@/shared/utils/utils';
import { initialGameState, GameState, determineLives, determineWinLevel, removeTopCardFromPlayer, addCardToDiscardPile } from '@/shared/types/gameState';
import { Card } from '@/shared/types/card';
import { createLogger } from './logger';

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

            const isValid = hasValidPlayerCount(players);

            if (!isValid && state.gamePhase !== 'setup') {
                return {
                    ...state,
                    players,
                    gamePhase: 'error',
                    errorMessage: 'There are not enough players in the game. Restarting game.'
                }
            }

            const winLevel = determineWinLevel(players.length);

            return {
                ...state,
                winLevel,
                players: [...players]
            };
        }

        case 'STATE_UPDATE': // ui
            return {
                ...state,
                ...action.state,
            };

        case 'GAME_START':

            const playerCount = state.players.length;
            if (!hasValidPlayerCount(state.players)) {
                log.error("Player Count is invalid:", playerCount)
                return state;
            }

            const lives = state.gameSettings.oneLife ? 1 : determineLives(playerCount);
            const winLevel = determineWinLevel(playerCount);

            return {
                ...state,
                gamePhase: 'agreeToStart',
                lives,
                winLevel
            };

        case 'GAME_RESTART':

            log.info('Game is restarting')

            return {
                ...initialGameState,
                players: state.players,
                gameSettings: state.gameSettings,
            }

        case 'LEVEL_START':
            {

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
                    shurikenedCards: [],
                };
            }

        case 'PLAY':
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


            let wasRightMove: boolean = true;

            const { editedPlayers, removedCards } =
                removeCardsLowerThanCardNumber(updatedPlayers, playedCard.number);
            if (removedCards.length > 0) {
           
                playedCard = {
                    ...playedCard,
                    mistakenlyPlayed: true,
                    mistakenPlayerId: updatedPlayer.id,
                };
                const updatedGamePhase = 'mistake';
                wasRightMove = false;
                updatedLastPlayedCard = playedCard;

                let updatedDiscardPile: Card[] = addCardToDiscardPile(
                    state.discardPile,
                    playedCard
                );

                updatedDiscardPile = [
                    ...updatedDiscardPile,
                    ...removedCards,
                ];

                updatedPlayers = updatedPlayers.map(p =>
                    editedPlayers.find(ep => ep.id === p.id) ?? p
                );

                let updatedLives = wasRightMove ? state.lives : loseLife(state.lives);
                updatedLives = removedCards.length > 1 ? loseLife(updatedLives) : updatedLives;

                return {
                    ...state,
                    players: updatedPlayers,
                    discardPile: updatedDiscardPile,
                    lives: updatedLives,
                    gamePhase: updatedGamePhase,
                    lastRemovedCards: removedCards,
                    readyToStartPlayers: [],
                    lastPlayedCard: updatedLastPlayedCard,
                };
            }

            let updatedDiscardPile: Card[] = addCardToDiscardPile(
                state.discardPile,
                playedCard
            );

            updatedDiscardPile = [
                ...updatedDiscardPile,
                ...removedCards, 
            ];

            updatedPlayers = updatedPlayers.map(p =>
                editedPlayers.find(ep => ep.id === p.id) ?? p
            );

            let updatedLives = wasRightMove ? state.lives : loseLife(state.lives);
            updatedLives = removedCards.length > 1 ? loseLife(updatedLives) : updatedLives;

            let {
                updatedGamePhase,
                updatedLevel,
                rewardedLives,
                rewardedShuriken,
                updatedGameOutcome
            } = resolveEndOfRound(
                state,
                updatedPlayers,
                updatedLives,
                state.shuriken,
                state.level
            );

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
                gameOutcome: updatedGameOutcome,
            };

        case 'SHURIKEN_CALLED': {

            if (state.gamePhase !== 'shuriken') {
                return state;
            }
            const { players, removedCards } =
                removeLowestCardFromAllHands(state.players);

            return {
                ...state,
                players,
                shuriken: state.shuriken - 1,
                lastRemovedCards: removedCards,
                shurikenedCards: [...state.shurikenedCards, ...removedCards]
            };
        };

        case 'CALL_FOR_SHURIKEN':
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
            const {
                updatedGamePhase,
                updatedLevel,
                rewardedLives,
                rewardedShuriken,
                updatedGameOutcome

            } = resolveEndOfRound(
                state,
                state.players,
                state.lives,
                state.shuriken,
                state.level
            );

            return {
                ...state,
                shurikenCalls: [],
                gamePhase: updatedGamePhase,
                lives: rewardedLives,
                shuriken: rewardedShuriken,
                level: updatedLevel,
                readyToStartPlayers: [],
                lastRemovedCards: [],
                gameOutcome: updatedGameOutcome,
            };
        }

        case 'MISTAKE_OVER': {

            const {
                updatedGamePhase,
                updatedLevel,
                rewardedLives,
                rewardedShuriken,
                updatedGameOutcome,
            } = resolveEndOfRound(
                state,
                state.players,
                state.lives,
                state.shuriken,
                state.level
            );

            return {
                ...state,
                shurikenCalls: [],
                gamePhase: updatedGamePhase,
                lives: rewardedLives,
                shuriken: rewardedShuriken,
                level: updatedLevel,
                readyToStartPlayers: [],
                lastRemovedCards: [],
                gameOutcome: updatedGameOutcome,
            };
        }

        case 'READY_TO_START': 

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
                gamePhase: allReady ? 'startLevel' : state.gamePhase,
            };


        case 'TRANSITION_TO_PLAYING':
            return {
                ...state,
                gamePhase: 'playing',

            }

        case 'SETTINGS': {
            const settings = state.gameSettings;
            const setting = settings[action.setting] 
            settings[action.setting] = !setting;
            
            return {
                ...state,
                gameSettings: settings,
            }
        }
          
        case 'ERROR':
            log.warn('Error in reducer')
            return {
                ...state,
                gamePhase: 'error',
                errorMessage: action.errorMessage ?? 'Unknown error in reducer'

            }

        case 'PAUSE': {

            return {
                ...state,
                gamePhase: 'pause',
                paused: true,
            }
        }

        case 'PAUSE_OVER': {
            return {
                ...state,
               gamePhase: 'startLevel',

            }
        }

        default:
            log.warn('Reducer could not find a case for action');
            return state;
    }
}