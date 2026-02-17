import { ClientAction, GameAction } from "../shared/types/gameAction";

class WebsocketService {

    private socket: WebSocket | null = null;

    isConnected() {
        console.log('this.socket?.readyState === WebSocket.OPEN', this.socket?.readyState === WebSocket.OPEN)
        return this.socket?.readyState === WebSocket.OPEN;
    }

    connect(url: string, onOpen?: () => void) {
        console.log("CONNECTING...");

        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log("SOCKET OPEN");
            onOpen?.();
        };

        this.socket.onerror = (err) => {
            console.log("SOCKET ERROR", err);
        };

        this.socket.onclose = () => {
            console.log("SOCKET CLOSED");
        };
    }

    onMessage(callback: (data: any) => void) {
        if (!this.socket) return;

        this.socket.onmessage = (event) => {
            const parsed = JSON.parse(event.data);
            callback(parsed);
        };
    }

    send(action: ClientAction) {
        if (!this.socket) return;

        if (this.socket.readyState === WebSocket.OPEN) {
            console.log("SEND data");
            this.socket.send(JSON.stringify(action));
        } else {
            console.log("Tried to send before socket was open");
        }
    }

    disconnect() {
        this.socket?.close();
        this.socket = null;
    }
}

export const websocketService = new WebsocketService();
