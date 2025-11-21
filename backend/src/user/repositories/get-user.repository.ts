import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../Schema/user.schema';

@Injectable()
export class GetUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(userId: string): Promise<User | null> {
    return await this.userModel.findById(userId).lean();
  }

  async findByEmail(userEmail: string): Promise<User | null> {
    return await this.userModel.findOne({ email: userEmail }).lean();
  }

  async checkExistingEmail(userEmail: string): Promise<boolean> {
    return !!(await this.findByEmail(userEmail));
  }
}
