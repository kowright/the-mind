
import { WebSocketServer, WebSocket } from "ws";
import dotenv from "dotenv";
import { applyAction, getState } from "../shared/types/gameEngine.js";
import { ClientAction, ServerAction, enrichAction } from "../shared/types/gameAction.js";
import { GameState } from "../shared/types/gameState"; 
import { hasValidPlayerCount, removeOtherPlayersFromStateForClient } from '@/shared/utils/utils.js'
import { handlePostActionEffects } from "./serverUtils.js";
import { createLogger } from "../shared/types/logger.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const wss = new WebSocketServer({
    port: PORT,
    host: HOST,
});

const log = createLogger('SERVER.TS')

log.info(`WebSocket running on ws://${HOST}:${PORT}`);

function generatePlayerId(): string {
    return Math.random().toString(36).substring(2, 10);
}

export function broadcastLobby(state: GameState) {

    wss.clients.forEach((client: any) => {
        if (client.readyState === WebSocket.OPEN) {
            const isolatedState =
                removeOtherPlayersFromStateForClient(
                    state,
                    client.playerId
                );

            client.send(JSON.stringify({
                type: "STATE_UPDATE",
                state: isolatedState
            }));
        }
    });
}

export function broadcastServerAction(action: ServerAction) {
    const oldState = getState();
    const newState = applyAction(action);

    //if (!hasValidPlayerCount(newState.players)) {
    //    return broadcastServerAction({
    //        type: "ERROR",
    //        errorMessage: "There are not enough players to continue."
    //    });
    //}

    broadcastLobby(newState);
    console.log('broadcastServerAction newState', newState)
    handlePostActionEffects(action, oldState, newState);
}

export function broadcastAction(
    clientAction: ClientAction,
    playerId: string
) {
    // translate client action to server actopm
    const enriched = enrichAction(clientAction, playerId);
    if (!enriched) return;

    broadcastServerAction(enriched);
}

wss.on("connection", (ws: any, req: any) => {
    const playerId = generatePlayerId();
    ws.playerId = playerId;

    broadcastAction({ type: 'PLAYER_CONNECTION' }, playerId)

    log.info(`${playerId} has connected to server.`)

    ws.send(JSON.stringify({ type: "ASSIGN_PLAYER_ID", playerId }));

    log.info(`There are ${wss.clients.size} connected to the server.`)
    ws.on("message", (data: any) => {
        try {
            const message = JSON.parse(data);
            log.info(`SERVER Received message from ${playerId}:`, message);

            broadcastAction(message, playerId)

        } catch (err) {
            log.error(`Error parsing connection message.`, err)
        }
    });

    ws.on("close", () => {
        log.info(`Player disconnected: ${playerId}`)

        broadcastAction({type: 'PLAYER_DISCONNECTION'}, playerId)
    });

    ws.on("error", (err: any) => {
        log.error(`WebSocket error for player ${ playerId }:`, err)
    });
});