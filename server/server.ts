
import { WebSocketServer, WebSocket } from "ws";
import dotenv from "dotenv";
import { applyAction, getState } from "../shared/types/gameEngine.js";
import { GameAction, enrichAction } from "../shared/types/gameAction.js";
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

wss.on("connection", (ws: any, req: any) => {
    const playerId = generatePlayerId();
    ws.playerId = playerId;
    const ip = req.socket.remoteAddress;

  /*  players.push({ id: playerId });*/

    console.log(`New player connected: ${playerId} from ${ip} `);

   /* const state = getState(); 
   
    const message: GameAction = { type: 'STATE_UPDATE', gameState: state }
    applyAction(message);
    console.log('SERVER state', state.players);

    broadcastLobby();*/

    const action = enrichAction({ type: 'PLAYER_CONNECTION' }, playerId);

    const newState = applyAction(action);


    //const newState = applyAction({ type: 'PLAYER_CONNECTION', playerId, requiresId: true });
    

    console.log('SERVER state', newState.players);

    // Broadcast updated state to all clients
    broadcastLobby(newState);

    //const message = JSON.stringify({ type: 'ASSIGN_PLAYER_ID', playerId: playerId });
    //ws.send(message);

    const assignIdAction = enrichAction({ type: 'ASSIGN_PLAYER_ID' }, playerId);

    //const assignIdState = applyAction(assignIdAction);
    ws.send(JSON.stringify({ type: "ASSIGN_PLAYER_ID", playerId }));

    ws.on("message", (data: any) => {
        try {
            const message = JSON.parse(data);
            console.log(`SERVER Received message from ${playerId}:`, message);

            const action = enrichAction(message, playerId);
            if (!action) return;
            const newState = applyAction(action);
            broadcastLobby(newState);
            handlePostActionEffects(action, newState);

        } catch (err) {
            console.error("Error parsing message:", err);
        }
    });

    ws.on("close", () => {
        const state = getState();
        let players = state.players;
        players = players.filter((p) => p.id !== playerId); // might need to make this into an immutable
        console.log(`Player disconnected: ${playerId}`);

        const newState = applyAction({ type: 'PLAYER_DISCONNECTION', playerId });

        broadcastLobby(newState);
        // TODO: what happens if you lose too may players for the game

    });

    ws.on("error", (err: any) => {
        console.error(`WebSocket error for player ${playerId}:`, err);
    });
});
