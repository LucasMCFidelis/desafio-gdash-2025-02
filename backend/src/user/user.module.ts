import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateUserRepository } from './repositories/create-user.repository';
import { User, UserSchema } from './Schema/user.schema';
import { CreateUserService } from './services/create-user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [CreateUserRepository, CreateUserService],
  exports: [CreateUserRepository, CreateUserService],
})
export class UserModule {}
