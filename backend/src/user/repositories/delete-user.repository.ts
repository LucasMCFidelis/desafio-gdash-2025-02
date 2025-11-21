import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '../Schema/user.schema';

@Injectable()
export class DeleteUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async deleteById(userId: string): Promise<void> {
    await this.userModel.deleteOne({ _id: userId });
  }

  async deleteByEmail(userEmail: string): Promise<void> {
    await this.userModel.deleteOne({ email: userEmail });
  }
}
