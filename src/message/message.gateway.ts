import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';
import { User } from '../../decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { Logger } from '@nestjs/common';
// import { Socket, Server } from 'socket.io';

@WebSocketGateway(8001, { cors: '*:*' })
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: any;
  
  @SubscribeMessage('message')
  async addMessage( @MessageBody() dto: CreateMessageDto) {
    const message =  await this.messageService.create(dto);
  }



  @SubscribeMessage('message')
  handleMessage( @MessageBody() message: string): void {
    console.log(message);
    this.server.emit('message', message);
  }

}
