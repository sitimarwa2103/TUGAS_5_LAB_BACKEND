import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { Client } from 'socket.io/dist/client';
import { connected } from 'process';

@WebSocketGateway(
  {
    cors :{
      origin: '*',
    },
    path: '/socket',
  }
)
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private users: Map<string, string> = new Map();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const username = this.users.get(client.id);
    if (username) {
      this.server.emit('user-disconnected', username);
      this.users.delete(client.id);
    }
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('user-connected')
  handleUserConnect(client: Socket, username: string) {
    this.users.set(client.id, username);
    this.server.emit('user-connected', username);
  }

  @SubscribeMessage('chat-send')
  handleMessage(client: Socket, data: any): void {
    this.server.emit('chat-receive', {
      message: data.message,
      username: data.username,
      timestamp: data.timestamp
    });
  }}
