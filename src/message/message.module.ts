import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageEntity } from './entities/message.entity';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway],
  exports: [MessageService]
})
export class MessageModule {}
