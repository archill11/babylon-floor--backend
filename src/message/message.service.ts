import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private repository: Repository<MessageEntity>,
  ) {}

  create(dto: CreateMessageDto, userId: number) {

    return this.repository.save({
      user: { id: Number(userId) },
      chat: { id: Number(dto.chatId) },
      name: dto.name,
      avatarUrl: dto.avatarUrl,
      text: dto.text,
    });
  }

  async findAll(chatId: number) {
    const dialogs = await this.repository
      .createQueryBuilder('message')
      .innerJoinAndSelect('message.chat', 'id')
      .where('message.chat = :id', { id: chatId })
      .getMany();

    return dialogs;

    // return this.repository.findBy({ chatId: 1 });
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
