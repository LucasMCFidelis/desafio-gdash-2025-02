import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateUserRepository } from './repositories/create-user.repository';
import { DeleteUserRepository } from './repositories/delete-user.repository';
import { GetUserRepository } from './repositories/get-user.repository';
import { User, UserSchema } from './Schema/user.schema';
import { CreateUserService } from './services/create-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { GetUserService } from './services/get-user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    CreateUserRepository,
    CreateUserService,
    GetUserRepository,
    GetUserService,
    DeleteUserRepository,
    DeleteUserService,
  ],
  exports: [
    CreateUserRepository,
    CreateUserService,
    GetUserRepository,
    GetUserService,
    DeleteUserRepository,
    DeleteUserService,
  ],
})
export class UserModule {}
