import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UserQueryOptions } from '../interfaces/user-query-options.interface';
import { GetUserRepository } from '../repositories/get-user.repository';
import { UserLean } from '../Schema/user.schema';

@Injectable()
export class GetUserService {
  constructor(private readonly getUserRepository: GetUserRepository) {}

  async find({ userEmail, userId }: UserQueryOptions): Promise<UserLean> {
    if (!userEmail && !userId) {
      throw new BadRequestException(
        'Envie userId ou userEmail para realizar a busca.',
      );
    }

    let user: UserLean | null = null;

    if (userId) {
      user = await this.getUserRepository.findById(userId);
    } else if (userEmail) {
      user = await this.getUserRepository.findByEmail(userEmail);
    }

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async checkExistingEmail(userEmail: string): Promise<void> {
    const exists = await this.getUserRepository.checkExistingEmail(userEmail);

    if (exists) {
      throw new ConflictException(
        'Usuário não pode ser cadastrado, email já está em uso.',
      );
    }
  }
}
