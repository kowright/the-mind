import { ServerAction } from "../shared/types/gameAction";
import { applyAction } from "../shared/types/gameEngine";
import { GameState } from "../shared/types/gameState";
import { broadcastLobby, broadcastAction, broadcastServerAction } from "./server";
import { errorWaitTime, hasValidPlayerCount, mistakeWaitTime, shurikenWaitTime, startLevelWaitTime, winLevelWaitTime } from "../shared/utils/utils";
import { createLogger } from "../shared/types/logger";
import { start } from "repl";


const log = createLogger('SERVER UTILS')

function waitTime(timeInSeconds: number) {
    return timeInSeconds * 1000;
}

//TODO: make function for comparing out and new phase

//export function handlePostActionEffects(
//    action: ServerAction,
//    newState: GameState
//) {
//    console.log('serverUtils action', action);
//    console.log('newState', newState)
//    // NOTE: could change to compare oldState to newState than action to newState
//    if (
//        action.type === 'READY_TO_START' &&
//        newState.gamePhase === 'transition'
//    ) {
//        // everyone agreed to start level, show countdown to play screen
//        console.log('Ready TO START to playing')
//        setTimeout(() => {
//            const playingState = applyAction({
//                type: 'TRANSITION_TO_PLAYING'
//            });

//            broadcastLobby(playingState);
//        }, waitTime(startLevelWaitTime));
//    }

//    if (action.type === 'PLAY' &&
//        newState.gamePhase === 'transition') {
//        // a play was done to win the level, transition was shown, show ready to start screen

//        setTimeout(() => {
//            const startLevel = applyAction({ type: 'LEVEL_START' })
//            broadcastLobby(startLevel)
//        }, waitTime(winLevelWaitTime));
//    }

//    if (action.type === 'CALL_FOR_SHURIKEN' &&
//        newState.gamePhase === 'shuriken') {
//        // we have called for shuriken, show everyone shuriken screen
//        const shuriken = applyAction({ type: 'SHURIKEN_CALLED' })
//        broadcastLobby(shuriken)

//        // wait to go back to playing
//        setTimeout(() => {
//            const startLevel = applyAction({ type: 'SHURIKEN_OVER' })
//            broadcastLobby(startLevel)
//        }, waitTime(shurikenWaitTime));
//    }

//    if (action.type === 'PLAY' &&
//        newState.gamePhase === 'mistake') {
//        // someone made a mistake, mistake screen was shown, show playing screen again

//        setTimeout(() => {
//            const startLevel = applyAction({ type: 'TRANSITION_TO_PLAYING' })
//            broadcastLobby(startLevel)
//        }, waitTime(mistakeWaitTime));
//    }

//    if (action.type === 'GAME_START' &&
//        newState.gamePhase === 'agreeToStart') {
//        // passed game start checks. we always start the level on game start.
//        const startLevel = applyAction({ type: 'LEVEL_START' })
//        broadcastLobby(startLevel)
//    }

//    if (action.type === 'PLAYER_DISCONNECTION') {
//        const isGameStillValidFromPlayerCount = hasValidPlayerCount(newState.players)
//        if (!isGameStillValidFromPlayerCount) {
//            log.warn('Not enough players to continue')
//            // notify players that game cannot continue 
//            const showError = applyAction({ type: 'ERROR' })
//            broadcastLobby(showError);

//            // then restart game
//            setTimeout(() => {
//                const restartGame = applyAction({ type: 'GAME_RESTART' })
//                broadcastLobby(restartGame)
//            }, waitTime(errorWaitTime));
//        }
//    }

//}


export function handlePostActionEffects(
    action: ServerAction,
    oldState: GameState,
    newState: GameState
) {
    console.log('server action', action);
    console.log('oldState', oldState.gamePhase)
    console.log('newState', newState.gamePhase)
    // PHASE ENTER: transition
    //if (
    //    oldState.gamePhase !== 'transition' &&
    //    newState.gamePhase === 'transition'
    //) {
    //    setTimeout(() => {
    //        const startLevel = applyAction({ type: 'LEVEL_START' });
    //        broadcastLobby(startLevel);
    //    }, waitTime(winLevelWaitTime));
    //}

    // PHASE ENTER: shuriken
    if (
        oldState.gamePhase !== 'shuriken' &&
        newState.gamePhase === 'shuriken'
    ) {
        const shuriken = applyAction({ type: 'SHURIKEN_CALLED' });
        broadcastLobby(shuriken);

        setTimeout(() => {
            //const over = applyAction({ type: 'SHURIKEN_OVER' });
            //broadcastLobby(over);

           
            broadcastServerAction({ type: 'SHURIKEN_OVER' })
        }, waitTime(shurikenWaitTime));
    }

    // PHASE ENTER: mistake
    if (
        oldState.gamePhase !== 'mistake' &&
        newState.gamePhase === 'mistake'
    ) {
        setTimeout(() => {
            //const playing = applyAction({ type: 'TRANSITION_TO_PLAYING' });
            //broadcastLobby(playing);
            broadcastServerAction({ type: 'TRANSITION_TO_PLAYING' })
        }, waitTime(mistakeWaitTime));
    }

    // READY TO START ? playing
    if (
        oldState.gamePhase !== 'startLevel' &&
        action.type === 'READY_TO_START' &&
        newState.gamePhase === 'startLevel'
    ) {
        setTimeout(() => {
            //const playing = applyAction({ type: 'TRANSITION_TO_PLAYING' });
            //broadcastLobby(playing
            broadcastServerAction({ type: 'TRANSITION_TO_PLAYING' })
        }, waitTime(startLevelWaitTime));
    }

    // PHASE ENTER: agreeToStart
    if (
        oldState.gamePhase !== 'agreeToStart' &&
        newState.gamePhase === 'agreeToStart'
    ) {
        //const startLevel = applyAction({ type: 'LEVEL_START' });
        //broadcastLobby(startLevel);
        broadcastServerAction({ type: 'LEVEL_START' })
    }

    // PHASE ENTER: error
    if (
        oldState.gamePhase !== 'error' &&
        newState.gamePhase === 'error'
    ) {
        setTimeout(() => {
            //const restart = applyAction({ type: 'GAME_RESTART' });
            //broadcastLobby(restart);
            broadcastServerAction({ type:'GAME_RESTART' })
        }, waitTime(errorWaitTime));
    }

    // PHASE ENTER: startLevel
    if (
        oldState.gamePhase !== 'startLevel' &&
        newState.gamePhase === 'startLevel'
    ) {
        setTimeout(() => {
            //const restart = applyAction({ type: 'TRANSITION_TO_PLAYING' });
            //broadcastLobby(restart);
            broadcastServerAction({ type: 'TRANSITION_TO_PLAYING' })
        }, waitTime(startLevelWaitTime));
    }

    // PHASE ENTER: levelComplete
    if (
        oldState.gamePhase !== 'levelComplete' &&
        newState.gamePhase === 'levelComplete'
    ) {
        setTimeout(() => {
            //const restart = applyAction({ type: 'LEVEL_START' });
            //broadcastLobby(restart);
            broadcastServerAction({ type: 'LEVEL_START' })
        }, waitTime(winLevelWaitTime));
    }
}