import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { ChatEntity } from './chat/entities/chat.entity';
import { MessageEntity } from './message/entities/message.entity';
import { MessageGateway } from './message/message.gateway';

config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [UserEntity, ChatEntity, MessageEntity],
      autoLoadEntities: true,
      retryAttempts: 5,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ChatModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
