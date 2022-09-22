import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '../../decorators/user.decorator';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // create(@User() userId: number, @Body() createMessageDto: CreateMessageDto) {
  //   return this.messageService.create(createMessageDto, userId);
  // }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.messageService.findAll(+id);
  }




  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
