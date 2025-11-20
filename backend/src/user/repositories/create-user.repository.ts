import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { User, UserDocument } from '../Schema/user.schema';

@Injectable()
export class CreateUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async execute(user: CreateUserDto): Promise<CreateUserDto> {
    const createdUser = new this.userModel(user);
    await createdUser.save();
    return createdUser.toObject();
  }
}
