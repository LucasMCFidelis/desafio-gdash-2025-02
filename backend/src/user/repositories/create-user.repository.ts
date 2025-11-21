import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { User, UserDocument, UserLean } from '../Schema/user.schema';

@Injectable()
export class CreateUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async execute(user: CreateUserDto): Promise<UserLean> {
    const createdUser = new this.userModel(user);
    const createdUserObj = createdUser.toObject();

    await createdUser.save();
    return {
      ...createdUserObj,
      _id: createdUser._id.toString(),
    };
  }
}
