import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway(8002, { cors: '*:*' })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: any;
  
  @SubscribeMessage('chat')
  async addMessage( @MessageBody() dto: CreateChatDto) {
    const chat =  await this.chatService.create(dto);
    console.log('chat::::' ,chat);
    this.server.emit('chat', chat);
    
  }



  @SubscribeMessage('chat')
  handleMessage( @MessageBody() chat: string): void {
    console.log('yyyyy',chat);
    // this.server.emit('chat', chat);
  }

}