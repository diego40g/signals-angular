import { Component, OnDestroy, OnInit, resource, signal, computed, effect, Signal, ResourceStreamItem, inject, Injector, runInInjectionContext } from '@angular/core';
import { WebSocketMessage } from '../../models/web-socket-message';
import { CommonModule } from '@angular/common';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-data-stream',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-stream.component.html',
  styleUrl: './data-stream.component.sass'
})
export class DataStreamComponent implements OnInit, OnDestroy {
  private socket!: Socket;
  private messageSignal = signal<WebSocketMessage[]>([]);
  private connectionStatus = signal<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  private injector = inject(Injector);
  
  // Resource para manejar el stream de datos
  dataStream = resource({
    stream: () => {
      return new Promise<Signal<ResourceStreamItem<WebSocketMessage[]>>>((resolve) => {
        const resourceResult = signal<{ value: WebSocketMessage[] }>({
          value: [],
        });

        // Inicializar conexión WebSocket si no existe
        if (!this.socket || this.socket.disconnected) {
          this.connectToWebSocket();
        }

        // Configurar el listener para actualizar el signal cuando cambien los mensajes
        const updateResource = () => {
          resourceResult.set({ value: this.messageSignal() });
        };

        // Llamar inmediatamente para sincronizar estado inicial
        updateResource();

        // Configurar el efecto para actualizaciones futuras
        const effectRef = runInInjectionContext(this.injector, () => {
          return effect(() => {
            const messages = this.messageSignal();
            resourceResult.set({ value: messages });
          });
        });
        
        resolve(resourceResult);
      });
    },
  });

  // Signals computados para el estado
  isConnected = computed(() => this.connectionStatus() === 'connected');
  isConnecting = computed(() => this.connectionStatus() === 'connecting');
  hasError = computed(() => this.connectionStatus() === 'error');
  messageCount = computed(() => this.messageSignal().length);

  constructor() {
    // Effect para detectar cambios en los mensajes y recargar el resource si es necesario
    effect(() => {
      this.messageSignal();
      // El resource se actualiza automáticamente a través del stream
    });
  }

  ngOnInit(): void {
    // La conexión se maneja dentro del resource stream
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  private connectToWebSocket(): void {
    this.connectionStatus.set('connecting');
    
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
      this.connectionStatus.set('connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor WebSocket');
      this.connectionStatus.set('disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Error de conexión WebSocket:', error);
      this.connectionStatus.set('error');
    });

    this.socket.on('message', (data: WebSocketMessage) => {
      console.log('Mensaje recibido:', data);
      this.messageSignal.update(current => [...current, data]);
    });
  }

  // Método para enviar mensajes
  sendMessage(message: string): void {
    if (this.socket && this.isConnected() && message.trim()) {
      this.socket.emit('sendMessage', { message: message.trim() });
    }
  }

  // Método para unirse a una sala
  joinRoom(room: string): void {
    if (this.socket && this.isConnected() && room.trim()) {
      this.socket.emit('joinRoom', { room: room.trim() });
    }
  }

  // Método para reconectar
  reconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.messageSignal.set([]);
    this.connectToWebSocket();
  }

  // Método para limpiar mensajes
  clearMessages(): void {
    this.messageSignal.set([]);
  }
}