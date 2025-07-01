export interface WebSocketMessage {
    id: number;
    content: string;
    timestamp: string;
    clientId?: string;
}
