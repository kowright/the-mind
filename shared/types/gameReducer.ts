import { ServerAction } from '@/shared/types/gameAction';
import { GamePhase } from '@/shared/types/gamePhase';
import { hasValidPlayerCount, makeFakePlayers, shuffleDeck, dealCards, loseLife, areAllLivesLost, isGameWon, sortPlayerHands, removeLowestCardFromAllHands, removeCardsLowerThanCardNumber, makePlayer } from '@/shared/utils/utils';
import { determineLives, determineWinLevel, removeTopCardFromPlayer, addCardToDiscardPile, wasLastPlayWasValid, getLastValidCard, setPlayedCard, areAllHandsEmpty, determineRewards } from '@/shared/types/gameState';
import { Card } from '@/shared/types/card';
import { Level, levels, RewardType } from "./level";
import { GameState, initialGameState } from '@/shared/types/gameState';
import { Player } from '@/shared/types/player';

export function gameReducer(
    state: GameState,
    action: ServerAction
): GameState {
    switch (action.type) {
        case 'PLAYER_CONNECTION': {
            console.log("PLAYER CONNECTION ACTION");

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

      
            console.log("PLAYER DISCONNECTION ACTION");
            console.log('player id', action.playerId);

            let players = state.players;
            players = players.filter((p) => p.id !== action.playerId);


            return {
                ...state,
                players: [...players]
            };
        }

        case 'STATE_UPDATE': // ui
       
            console.log("new state!", action.state);
            return {
                ...state,
                ...action.state,
            };

        case 'GAME_START':
            console.log('GAME STARTTO');

            const playerCount = state.players.length;
            if (!hasValidPlayerCount(state.players)) {
                console.error("Player Count is invalid:", playerCount);
                return state;
            }

            const lives = determineLives(playerCount);
            const winLevel = determineWinLevel(playerCount);
            console.log('GAME START we are in game phase', state.gamePhase)
            console.log('going to game phase agreeToStart')
            return { //TODO add last action to all of these returns, or maybe remove it cause idt anywhere uses it
                ...state,
                gamePhase: 'agreeToStart',
                lives,
                winLevel
            };

        case 'GAME_RESTART':
            console.log("GAME RESTART"); //TODO player connection lost on game restart?

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

                const shuffledDeck = shuffleDeck(state.deck);

                const { players, remainingDeck } = dealCards(state.players, shuffledDeck, state.level.number);
            
                const playersWithSortedHands = sortPlayerHands(players);

                state.players.map(player => player.hand.cards.map(card => console.log(card.number)));

                const startDiscardPile: Card[] = [];
                const startGamePhase: GamePhase = 'agreeToStart';
                console.log('LEVEL START we are in game phase', state.gamePhase)

                console.log('Going to game phase', startGamePhase)
                
                return {
                    ...state,
                    discardPile: startDiscardPile,
                    gamePhase: startGamePhase,
                    players: playersWithSortedHands,
                    shurikenCalls: [],
                    readyToStartPlayers: [],

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
            console.log('fake play ORIGINAL gamePhase1', updatedGamePhase);

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

            updatedDiscardPile = [
                ...updatedDiscardPile,
                ...removedCards, 
            ];

            updatedPlayers = updatedPlayers.map(p =>
                editedPlayers.find(ep => ep.id === p.id) ?? p
            );

            

            let updatedLives = wasRightMove ? state.lives : loseLife(state.lives);
            console.log('updated Lives', updatedLives)
            updatedLives = removedCards.length > 1 ? loseLife(updatedLives) : updatedLives;
            console.log('updated Lives', updatedLives)




            let updatedLevel: Level = state.level;
            let completedLevel = state.level;

            let rewardedLives: number = updatedLives;
            let rewardedShuriken: number = state.shuriken;

            //console.log('fake play lives: ', updatedLives);
            const noMoreLives = areAllLivesLost(updatedLives);

            updatedGamePhase = noMoreLives ? 'gameOver' : updatedGamePhase;
            console.log('fake play gamePhase2', updatedGamePhase);


            if (noMoreLives) {
                console.log('No more lives')
                return {
                    ...state,
                    lastGameAction: { type: 'FAKE_PLAY', playerId: updatedPlayer.id },
                    players: updatedPlayers,
                    discardPile: updatedDiscardPile,
                    lives: rewardedLives,
                    gamePhase: updatedGamePhase,
                    shuriken: rewardedShuriken,
                    level: updatedLevel,
                    lastRemovedCards: removedCards,
                };
            }
  

            const noMoreCards = areAllHandsEmpty(updatedPlayers);
            
            if (noMoreCards) {
                console.log('all hands are empty')
                const gameWon = isGameWon(state);
                if (gameWon) {
                    console.log("YAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY GAME WON!")

                    updatedGamePhase = 'gameOver';
                }
                else {
                    updatedGamePhase = 'transition';
                }
                console.log('fake play gamePhase3', updatedGamePhase);

                const nextLevelNumber = updatedLevel.number + 1;
                console.log('LEVEL WON, onto level ', nextLevelNumber);

                updatedLevel = levels.find(l => l.number === nextLevelNumber) ?? state.level;

                console.log('array', levels[completedLevel.number-1])

                const { rewardLives, rewardShuriken } = determineRewards(updatedLives, state.shuriken, completedLevel);
                rewardedLives = rewardLives;
                rewardedShuriken = rewardShuriken;
                // set level to next level and play.tsx should have an effect for checking level to dispatch next action
            }

       
          


            console.log('fake play last game phase4', updatedGamePhase)
            return {
                ...state,
                lastGameAction: {type: 'FAKE_PLAY', playerId: updatedPlayer.id},
                players: updatedPlayers,
                discardPile: updatedDiscardPile,   
                lives: rewardedLives, 
                gamePhase: updatedGamePhase,
                shuriken: rewardedShuriken,
                level: updatedLevel,
                lastRemovedCards: removedCards,
                readyToStartPlayers: [],
            };


        case 'TRANSITION':
            console.log('TRANSITION');

            const transitionGamePhase: GamePhase = 'transition';
            console.log('new game phase', transitionGamePhase);
            return {
                ...state,
                gamePhase: transitionGamePhase,
                readyToStartPlayers: [],

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
            console.log('call for shuriken gamephase', state.gamePhase)
            if (state.gamePhase !== 'playing') return state;
            if (state.shuriken <= 0) return state;

            let shurikenCalls: number[] = [...state.shurikenCalls, action.playerId];
            console.log('shuriken calls', shurikenCalls)
            if (state.shurikenCalls.includes(action.playerId)) {
                shurikenCalls = state.shurikenCalls.filter(call => call !== action.playerId)
                console.log('filtered shuriken calls', shurikenCalls)
            }
           
             
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

        case 'READY_TO_START': // players ready to start level
            console.log('READY TO START')
            console.log(action.playerId + ' is ready to start!');
            console.log('READY TO START we are in game phase', state.gamePhase)


            let readyToStartPlayers = [...state.readyToStartPlayers];

            if (readyToStartPlayers.includes(action.playerId)) {
                readyToStartPlayers = readyToStartPlayers.filter(player => player !== action.playerId)
           
            }
            else {
                readyToStartPlayers = [...readyToStartPlayers, action.playerId]
            }
            

            const allReady =
                readyToStartPlayers.length === state.players.length;
                console.log('ready to start current gamephase', state.gamePhase)
            console.log('READY TO START change to gamephase: ', allReady ? 'transition' : state.gamePhase)
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


        default:
            return state;
    }
}