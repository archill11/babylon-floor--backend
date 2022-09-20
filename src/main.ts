import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const port = process.env.PORT || 4444;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // для использования class-validator подключаем ValidationPipe
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(port);
  console.log('Server ok', port);
}
bootstrap();
