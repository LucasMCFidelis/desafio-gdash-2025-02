import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { CreateUserService } from './services/create-user.service';

@Controller('user')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    return this.createUserService.execute(user);
  }
}
