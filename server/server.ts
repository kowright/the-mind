// server.ts
const WebSocket = require("ws");
require("dotenv").config();


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const wss = new WebSocket.Server({ port: PORT, host: HOST });

console.log(`WebSocket running on ws://${HOST}:${PORT}`);

let players: { id: string }[] = [];


function generatePlayerId(): string {
    return Math.random().toString(36).substring(2, 10);
}

function broadcastLobby() {
    const message = JSON.stringify({ type: "LOBBY_UPDATE", players });
    wss.clients.forEach((client: any) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
    console.log(`Broadcasted lobby update to ${wss.clients.size} clients`);
}

wss.on("connection", (ws: any, req: any) => {
    const playerId = generatePlayerId();
    const ip = req.socket.remoteAddress;

    players.push({ id: playerId });

    console.log(`New player connected: ${playerId} from ${ip} `);
    console.log("NEW CONNECTION", req.socket.remoteAddress);
    broadcastLobby();

    ws.on("message", (data: any) => {
        try {
            const message = JSON.parse(data);
            console.log(`Received message from ${playerId}:`, message);
            broadcastLobby();
        } catch (err) {
            console.error("Error parsing message:", err);
        }
    });

    ws.on("close", () => {
        players = players.filter((p) => p.id !== playerId);
        console.log(`Player disconnected: ${playerId}`);
        broadcastLobby();
    });

    ws.on("error", (err: any) => {
        console.error(`WebSocket error for player ${playerId}:`, err);
    });
});
