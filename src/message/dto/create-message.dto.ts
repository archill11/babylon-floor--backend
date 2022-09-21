import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  chatId: any;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  avatarUrl: string;

  @IsNotEmpty()
  text: string;
}
