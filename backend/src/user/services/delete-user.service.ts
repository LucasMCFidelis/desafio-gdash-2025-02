import { BadRequestException, Injectable } from '@nestjs/common';

import { DeleteUserRepository } from '../repositories/delete-user.repository';
import { GetUserService } from './get-user.service';

interface Props {
  userId?: string;
  userEmail?: string;
}

@Injectable()
export class DeleteUserService {
  constructor(
    private readonly deleteUserRepository: DeleteUserRepository,
    private readonly getUserService: GetUserService,
  ) {}

  async execute({ userEmail, userId }: Props): Promise<void> {
    if (!userEmail && !userId) {
      throw new BadRequestException(
        'Envie userId ou userEmail para realizar a exclusão.',
      );
    }

    const user = await this.getUserService.find({ userEmail, userId });

    await this.deleteUserRepository.deleteById(user._id);
  }
}
