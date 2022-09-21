import { MessageEntity } from 'src/message/entities/message.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity('[babylon-floor]-chats')
export class ChatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => UserEntity, (user) => user.id, { cascade: true })
  @JoinTable()
  users: UserEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => MessageEntity, (message) => message.chat)
  messages: MessageEntity[];
}
