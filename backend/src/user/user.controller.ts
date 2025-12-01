import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { type Response } from 'express';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { setAuthCookie } from 'src/common/utils/cookie.helpers';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user.dto';
import { type UserQueryOptions } from './interfaces/user-query-options.interface';
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
  async create(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CreateUserDto> {
    const { userToken, ...newUser } =
      await this.createUserService.execute(user);

    setAuthCookie(res, userToken);

    return newUser;
  }

  @Get()
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  async find(@Query() query: UserQueryOptions): Promise<User> {
    return this.getUserService.find(query);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  async delete(@Query() query: UserQueryOptions): Promise<void> {
    return this.deleteUserService.execute(query);
  }

  @Put()
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  async update(
    @Body() userUpdateData: UpdateUserDto,
    @Query('userId') userId: string,
  ): Promise<UserLean> {
    return this.updateUserService.execute(userId, userUpdateData);
  }
}
