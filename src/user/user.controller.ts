import { Controller, Patch, Get, Post, Body, UseGuards, Request, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(parseInt(id, 10));
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatarUrl', maxCount: 1},
  ]))
  update(
    @User() userId: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFiles() files,
  ) {
    console.log('111111',files);
    
    const avatarUrl = files?.avatarUrl
    // console.log('updateUserDto',updateUserDto);
    // console.log('files',files);
    
    return this.userService.update(updateUserDto, avatarUrl, +userId);
  }

} 
