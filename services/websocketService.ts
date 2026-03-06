import { ClientAction } from "../shared/types/gameAction";
import { createLogger } from "../shared/types/logger";

const log = createLogger('WEBSOCKET SERVICE')
class WebsocketService {

    private socket: WebSocket | null = null;

    isConnected() {
        return this.socket?.readyState === WebSocket.OPEN;
    }

    connect(url: string, onOpen?: () => void, onError?: (err: any) => void) {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            log.info('Connected to websocket')
            onOpen?.();
        };

        this.socket.onerror = (err) => {
            log.error('error', err)
            console.log('socket on error')
            onError?.(err);
        };

        this.socket.onclose = () => {
            if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
                log.info('WebSocket closed');
                console.log('socket on close')
                //onError?.('Connection lost');
            }
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
            this.socket.send(JSON.stringify(action));
        } else {
            log.warn('Tried to send before socket was open')
        }
    }

    disconnect() {
        this.socket?.close();
        //this.socket?.close = () => {
        //    log.info('Disconnected websocket');
        //    onError?.("Connection lost");
        //};
        this.socket = null;
    }
}

export const websocketService = new WebsocketService();
