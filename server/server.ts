
import { WebSocketServer, WebSocket } from "ws";
import dotenv from "dotenv";
import { applyAction, getState } from "../shared/types/gameEngine.js";
import { ClientAction, GameAction, enrichAction } from "../shared/types/gameAction.js";
import { GameState } from "../shared/types/gameState"; 
/*import { enrichAction } from "../shared/utils/utils.js";*/
import { removeOtherPlayersFromStateForClient } from '@/shared/utils/utils.js'
import { handlePostActionEffects } from "./serverUtils.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const wss = new WebSocketServer({
    port: PORT,
    host: HOST,
});

console.log(`WebSocket running on ws://${HOST}:${PORT}`);

function generatePlayerId(): string {
    return Math.random().toString(36).substring(2, 10);
}

export function broadcastLobby(state: GameState) {
    /* const state = getState();*/

 /*   const players = state.players;*/
    const message = JSON.stringify({ type: "STATE_UPDATE", state });
    wss.clients.forEach((client: any) => {
        if (client.readyState === WebSocket.OPEN) {
            const isolatedState =
                removeOtherPlayersFromStateForClient(
                    state,
                    client.playerId
                );
    /*        console.log('isolated state for ' + client.playerId) 
            console.log(isolatedState.players)*/
            client.send(JSON.stringify({
                type: "STATE_UPDATE",
                state: isolatedState
            }));

            /*client.send(message); // for debug version*/
        }
    });
    console.log(`Broadcasted lobby update to ${wss.clients.size} client(s)`);
}

function broadcastAction(clientAction: ClientAction, playerId: string) {
    const action = enrichAction(clientAction, playerId);
    if (!action) return;
    const newState = applyAction(action);
    broadcastLobby(newState);
    handlePostActionEffects(action, newState);
}

wss.on("connection", (ws: any, req: any) => {
    const playerId = generatePlayerId();
    ws.playerId = playerId;
    const ip = req.socket.remoteAddress;

    //const action = enrichAction({ type: 'PLAYER_CONNECTION' }, playerId); // TODO make this enrich apply broadcast a function
    //const newState = applyAction(action);
    //broadcastLobby(newState);
    broadcastAction({type: 'PLAYER_CONNECTION'}, playerId)


    ws.send(JSON.stringify({ type: "ASSIGN_PLAYER_ID", playerId }));

    ws.on("message", (data: any) => {
        try {
            const message = JSON.parse(data);
            console.log(`SERVER Received message from ${playerId}:`, message);

            //const action = enrichAction(message, playerId);
            //if (!action) return;
            //const newState = applyAction(action);
            //broadcastLobby(newState);
            //handlePostActionEffects(action, newState);
            broadcastAction(message, playerId)

        } catch (err) {
            console.error("Error parsing message:", err);
        }
    });

    ws.on("close", () => {
        console.log(`Player disconnected: ${playerId}`);

        //const action = enrichAction({ type: 'PLAYER_DISCONNECTION' }, playerId);
        //const newState = applyAction(action);
        //broadcastLobby(newState);
        //handlePostActionEffects(action, newState);
        broadcastAction({type: 'PLAYER_DISCONNECTION'}, playerId)

    });

    ws.on("error", (err: any) => {
        console.error(`WebSocket error for player ${playerId}:`, err);
    });
});