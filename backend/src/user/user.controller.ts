import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserLean } from './Schema/user.schema';
import { CreateUserService } from './services/create-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { GetUserService } from './services/get-user.service';
import { UpdateUserService } from './services/update-user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly getUserService: GetUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<CreateUserDto> {
    return this.createUserService.execute(user);
  }

  @Get()
  async find(
    @Query('userId') userId?: string,
    @Query('userEmail') userEmail?: string,
  ): Promise<User> {
    return this.getUserService.find({ userId, userEmail });
  }

  @Delete()
  async delete(
    @Query('userId') userId?: string,
    @Query('userEmail') userEmail?: string,
  ): Promise<void> {
    return this.deleteUserService.execute({ userId, userEmail });
  }

  @Put()
  async update(
    @Body() userUpdateData: UpdateUserDto,
    @Query('userId') userId: string,
  ): Promise<UserLean> {
    return this.updateUserService.execute(userId, userUpdateData);
  }
}
