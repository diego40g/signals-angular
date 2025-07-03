import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

export class WebSocketExampleGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('WebSocketGateway');
  private messageCounter = 0;

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);

    // Enviar mensaje de bienvenida
    client.emit('message', {
      id: ++this.messageCounter,
      content: `¡Bienvenido! Tu ID de sesión es: ${client.id}`,
      timestamp: new Date().toISOString(),
    });

    // Simular mensajes periódicos para demostración
    const interval = setInterval(() => {
      client.emit('message', {
        id: ++this.messageCounter,
        content: `Mensaje automático #${this.messageCounter} - ${new Date().toLocaleTimeString()}`,
        timestamp: new Date().toISOString(),
      });
    }, 3000);

    // Limpiar intervalo cuando el cliente se desconecte
    client.on('disconnect', () => {
      clearInterval(interval);
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: { message: string },
    @ConnectedSocket() client: Socket,
  ): void {
    this.logger.log(`Mensaje recibido de ${client.id}: ${data.message}`);
    
    // Enviar mensaje a todos los clientes conectados
    this.server.emit('message', {
      id: ++this.messageCounter,
      content: data.message,
      timestamp: new Date().toISOString(),
      clientId: client.id,
    });
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { room: string },
    @ConnectedSocket() client: Socket,
  ): void {
    client.join(data.room);
    this.logger.log(`Cliente ${client.id} se unió a la sala: ${data.room}`);
    
    client.to(data.room).emit('message', {
      id: ++this.messageCounter,
      content: `Un nuevo usuario se unió a la sala ${data.room}`,
      timestamp: new Date().toISOString(),
    });
  }
}
