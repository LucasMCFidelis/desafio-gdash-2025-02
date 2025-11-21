import { Injectable } from '@nestjs/common';

import { UserQueryOptions } from '../interfaces/user-query-options.interface';
import { DeleteUserRepository } from '../repositories/delete-user.repository';
import { GetUserService } from './get-user.service';

@Injectable()
export class DeleteUserService {
  constructor(
    private readonly deleteUserRepository: DeleteUserRepository,
    private readonly getUserService: GetUserService,
  ) {}

  async execute(options: UserQueryOptions): Promise<void> {
    const user = await this.getUserService.find(options);

    await this.deleteUserRepository.deleteById(user._id);
  }
}
