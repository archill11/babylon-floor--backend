import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  DataSource,
  EntityManager,
  EntityRepository,
  Repository,
} from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatEntity } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private repository: Repository<ChatEntity>,

    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  create(dto: CreateChatDto, userId: number) {
    return this.repository.save({
      users: [{ id: userId }, { id: +dto.receiverId }],
    });
  }

  async findAll(userId: any) {
    const chatsList = await this.repository.find({ relations: ['users'] });
    const dialogs = chatsList.filter((item) => {
      const usersChats = item.users.filter((itm) => itm.id === userId);
      return item.users.includes(usersChats[0], 0);
    });

    return { dialogs, userId };

  
    // const dialogs = await this.repository
    //   .createQueryBuilder('chat')
    //   .leftJoinAndSelect('chat.users', 'user')
    //   // .where('user.id = :id', { id: userId })
    //   .groupBy('chat.chat')
    //   .having('user.id = :id', { id: userId })
    //   .getMany();
    //   console.log(dialogs);

    // return dialogs;

    // const data = await this.repository.find();
    // console.log(data);

    // return this.repository.findBy({ users: userId });
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
