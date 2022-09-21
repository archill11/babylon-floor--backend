import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  findAll() {
    return this.repository.find();
  }
  
  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }

  findById(id: number) {
    return this.repository.findOneBy({ id: id });
  }

  findByCond(cond: LoginUserDto) {
    return this.repository.findOneBy(cond);
  }

}
