import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

import { CreateUserRepository } from '../repositories/create-user.repository';

@Injectable()
export class CreateUserService {
  constructor(private readonly createUserRepository: CreateUserRepository) {}

  async execute(user: CreateUserDto): Promise<CreateUserDto> {
    const newUser = await this.createUserRepository.execute(user);
    return newUser;
  }
}
