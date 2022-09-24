import { ChatEntity } from 'src/chat/entities/chat.entity';
import { MessageEntity } from 'src/message/entities/message.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('[babylon-floor]-users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;
  image/232b39f9-2144-4831-b0b9-cd623949cd94.jpg
  @Column()
  password: string;

  @Column({ default: "image/232b39f9-2144-4831-b0b9-cd623949cd94.jpg" })
  avatarUrl: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => MessageEntity, (message) => message.user)
  message: MessageEntity[];
}
