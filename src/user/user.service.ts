import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService, fileType } from 'src/file/file.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private fileService: FileService
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

  update(dto: UpdateUserDto, files: any, userId: number) {

  const avatarPath = files 
    && this.fileService.createFile(fileType.IMAGE, files[0])
    
    return this.repository.update(userId, {
      fullName: dto.fullName, 
      avatarUrl: avatarPath 
    })
  }

}
