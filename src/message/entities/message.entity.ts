import { ChatEntity } from 'src/chat/entities/chat.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('[babylon-floor]-messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => ChatEntity, (chat) => chat.id, { nullable: false })
  @JoinColumn({ name: 'chatId' })
  chat: ChatEntity;

  @Column()
  name: string;

  @Column()
  avatarUrl: string;

  @Column()
  text: string;

  @Column({ default: false })
  state: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

}
