import { ServerAction } from "../shared/types/gameAction";
import { applyAction } from "../shared/types/gameEngine";
import { GameState } from "../shared/types/gameState";
import { broadcastLobby, broadcastAction, broadcastServerAction } from "./server";
import { errorWaitTime, hasValidPlayerCount, mistakeWaitTime, shurikenWaitTime, startLevelWaitTime, winLevelWaitTime } from "../shared/utils/utils";
import { createLogger } from "../shared/types/logger";
import { GamePhase } from "../shared/types/gamePhase";

const log = createLogger('SERVER UTILS')
function waitTime(timeInSeconds: number) {
    return timeInSeconds * 1000;
}
function enterPhase(gamePhase: GamePhase, oldState: GameState, newState: GameState): boolean {
    return oldState.gamePhase !== gamePhase &&
        newState.gamePhase === gamePhase;
}

export function handlePostActionEffects(
    action: ServerAction,
    oldState: GameState,
    newState: GameState
) {

    if (enterPhase('shuriken', oldState, newState)) {
        const shuriken = applyAction({ type: 'SHURIKEN_CALLED' });
        broadcastLobby(shuriken);

        setTimeout(() => {
            broadcastServerAction({ type: 'SHURIKEN_OVER' })
        }, waitTime(shurikenWaitTime));
    }

    if (enterPhase('mistake', oldState, newState)) {
        setTimeout(() => {
            broadcastServerAction({ type: 'TRANSITION_TO_PLAYING' })
        }, waitTime(mistakeWaitTime));
    }

    if (
        oldState.gamePhase !== 'startLevel' &&
        action.type === 'READY_TO_START' &&
        newState.gamePhase === 'startLevel'
    ) {
        setTimeout(() => {
            broadcastServerAction({ type: 'TRANSITION_TO_PLAYING' })
        }, waitTime(startLevelWaitTime));
    }

    if (enterPhase('agreeToStart', oldState, newState)) {
        broadcastServerAction({ type: 'LEVEL_START' })
    }

    if (enterPhase('error', oldState, newState)) {
        setTimeout(() => {
            broadcastServerAction({ type:'GAME_RESTART' })
        }, waitTime(errorWaitTime));
    }

    if (enterPhase('startLevel', oldState, newState)) {
        setTimeout(() => {
            broadcastServerAction({ type: 'TRANSITION_TO_PLAYING' })
        }, waitTime(startLevelWaitTime));
    }

    if (enterPhase('levelComplete', oldState, newState)) {
        setTimeout(() => {
            broadcastServerAction({ type: 'LEVEL_START' })
        }, waitTime(winLevelWaitTime));
    }
}