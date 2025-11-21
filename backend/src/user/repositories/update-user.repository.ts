import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserDocument, UserLean } from '../Schema/user.schema';

@Injectable()
export class UpdateUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async execute(
    userId: string,
    updateData: UpdateUserDto,
  ): Promise<UserLean | null> {
    const updated = await this.userModel
      .findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
      .lean();

    return updated ? { ...updated, _id: updated._id.toString() } : null;
  }
}
