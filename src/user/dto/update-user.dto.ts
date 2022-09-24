import { IsEmail, Length } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';
// import { UniqueOnDatabase } from '../../auth/validations/UniqueValidation';
// import { UserEntity } from '../entities/user.entity';

export class UpdateUserDto {

  // @Field({ nullable: true })
  fullName?: string;
  avatarUrl?: string;

}
