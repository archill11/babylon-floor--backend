import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
// import { Logger } from '@nestjs/common';
// import { Socket, Server } from 'socket.io';

@WebSocketGateway(8001, { cors: '*:*' })
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}
  
  @WebSocketServer()
  server: any;
  
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log(message);
    this.server.emit('message', message);
  }

}
