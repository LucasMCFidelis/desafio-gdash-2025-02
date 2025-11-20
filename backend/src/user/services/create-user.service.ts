import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { CreateUserRepository } from '../repositories/create-user.repository';
import { hashPassword } from '../utils/hashPassword';

@Injectable()
export class CreateUserService {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async execute(user: CreateUserDto): Promise<CreateUserDto> {
    const hashedPassword = await hashPassword(user.password);

    const newUser = await this.createUserRepository.execute({
      ...user,
      password: hashedPassword,
    });

    return newUser;
  }
}
