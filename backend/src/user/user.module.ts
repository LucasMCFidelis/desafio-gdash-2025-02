import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

import { CreateUserRepository } from './repositories/create-user.repository';
import { DeleteUserRepository } from './repositories/delete-user.repository';
import { GetUserRepository } from './repositories/get-user.repository';
import { UpdateUserRepository } from './repositories/update-user.repository';
import { User, UserSchema } from './Schema/user.schema';
import { CreateUserService } from './services/create-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { GetUserService } from './services/get-user.service';
import { UpdateUserService } from './services/update-user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [
    CreateUserRepository,
    CreateUserService,
    GetUserRepository,
    GetUserService,
    DeleteUserRepository,
    DeleteUserService,
    UpdateUserRepository,
    UpdateUserService,
  ],
  exports: [
    CreateUserRepository,
    CreateUserService,
    GetUserRepository,
    GetUserService,
    DeleteUserRepository,
    DeleteUserService,
    UpdateUserRepository,
    UpdateUserService,
  ],
})
export class UserModule {}
