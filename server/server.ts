// server.ts
const WebSocket = require("ws"); // CommonJS style

const wss = new WebSocket.Server({ port: 3000, host: "0.0.0.0" });

let players: { id: string }[] = [];

console.log("WebSocket server running on ws://localhost:3000");

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

    console.log(`New player connected: ${playerId} from ${ip}`);
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
