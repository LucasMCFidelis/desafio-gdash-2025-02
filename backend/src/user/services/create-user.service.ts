import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { hashPassword } from '../../common/utils/hashPassword';
import { CreateUserRepository } from '../repositories/create-user.repository';
import { GetUserService } from './get-user.service';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly getUserService: GetUserService,
  ) {}

  async execute(user: CreateUserDto): Promise<CreateUserDto> {
    const [hashedPassword] = await Promise.all([
      hashPassword(user.password),
      this.getUserService.checkExistingEmail(user.email),
    ]);

    const newUser = await this.createUserRepository.execute({
      ...user,
      password: hashedPassword,
    });

    return newUser;
  }
}
