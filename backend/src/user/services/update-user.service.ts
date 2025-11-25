import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { hashPassword } from 'src/common/utils/hashPassword';

import { UpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserRepository } from '../repositories/update-user.repository';
import { UserLean } from '../Schema/user.schema';
import { GetUserService } from './get-user.service';

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly getUserService: GetUserService,
  ) {}

  async execute(userId: string, updateData: UpdateUserDto): Promise<UserLean> {
    const currentUser = await this.getUserService.find({ userId });

    if (updateData.email && updateData.email !== currentUser.email) {
      await this.getUserService.checkExistingEmail(updateData.email);
    }

    let passwordHashed: string | null = null;
    if (updateData.password) {
      passwordHashed = await hashPassword(updateData.password);
    }

    const userUpdated = await this.updateUserRepository.execute(userId, {
      ...updateData,
      ...(passwordHashed && { password: passwordHashed }),
    });

    if (!userUpdated) {
      throw new InternalServerErrorException(
        'Falha ao atualizar usuário, tente novamente',
      );
    }

    return userUpdated;
  }
}
