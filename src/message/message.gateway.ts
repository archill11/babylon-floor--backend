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

const port = process.env.SOCKET_PORT_CHAT || 8001

@WebSocketGateway(Number(port), { cors: '*:*' })
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}
  
  @WebSocketServer()
  server: any;
  
  @SubscribeMessage('message')
  async addMessage( @MessageBody() dto: CreateMessageDto) {
    const message =  await this.messageService.create(dto);
    this.server.emit('message', message);
  }



  // @SubscribeMessage('message')
  // handleMessage( @MessageBody() message: string): void {
  //   console.log(message);
  //   this.server.emit('message', message);
  // }

}
