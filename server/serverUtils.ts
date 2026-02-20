import { start } from "repl";
import { ServerAction } from "../shared/types/gameAction";
import { applyAction } from "../shared/types/gameEngine";
import { GameState } from "../shared/types/gameState";
import { broadcastLobby } from "./server";

export function handlePostActionEffects(
    action: ServerAction,
    newState: GameState
) {

    // NOTE: could change to compare oldState to newState than action to newState
    if (
        action.type === 'READY_TO_START' &&
        newState.gamePhase === 'transition'
    ) {
        // everyone agreed to start level, show countdown to play screen
        console.log('Ready TO START to playing')
        setTimeout(() => {
            const playingState = applyAction({
                type: 'TRANSITION_TO_PLAYING'
            });

            broadcastLobby(playingState);
        }, 3000);
    }

    if (action.type === 'FAKE_PLAY' &&
        newState.gamePhase === 'transition') {
        // a play was done to win the level, transition was shown, show ready to start screen
      

        setTimeout(() => {
            const startLevel = applyAction({ type: 'LEVEL_START' })
            broadcastLobby(startLevel)
        }, 3000);
    }

    if (action.type === 'CALL_FOR_SHURIKEN' &&
        newState.gamePhase === 'shuriken') {
        // we have called for shuriken, show everyone shuriken screen
        const startLevel = applyAction({ type: 'SHURIKEN_CALLED' })
        broadcastLobby(startLevel)

        // wait to go back to playing
        setTimeout(() => {
            const startLevel = applyAction({ type: 'SHURIKEN_OVER' })
            broadcastLobby(startLevel)
        }, 5000);
    }

}
