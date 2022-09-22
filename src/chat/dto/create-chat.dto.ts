import { IsNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  userId: any;
  @IsNotEmpty()
  receiverId: any;
}