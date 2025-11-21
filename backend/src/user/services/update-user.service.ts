import { Injectable, InternalServerErrorException } from '@nestjs/common';

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

    const userUpdated = await this.updateUserRepository.execute(
      userId,
      updateData,
    );

    if (!userUpdated) {
      throw new InternalServerErrorException(
        'Falha ao atualizar usuário, tente novamente',
      );
    }

    return userUpdated;
  }
}
