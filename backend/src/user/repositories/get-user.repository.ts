import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument, UserLean } from '../Schema/user.schema';

@Injectable()
export class GetUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(userId: string): Promise<UserLean | null> {
    const user = await this.userModel.findById(userId).lean();

    if (!user) return null;

    return {
      ...user,
      _id: user._id.toString(),
    };
  }

  async findByEmail(userEmail: string): Promise<UserLean | null> {
    const user = await this.userModel.findOne({ email: userEmail }).lean();
    if (!user) return null;

    return {
      ...user,
      _id: user._id.toString(),
    };
  }

  async checkExistingEmail(userEmail: string): Promise<boolean> {
    return !!(await this.findByEmail(userEmail));
  }
}
