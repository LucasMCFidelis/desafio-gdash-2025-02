import { Injectable } from '@nestjs/common';
import { comparePasswords } from 'src/common/utils/comparePasswords';
import { GetUserService } from 'src/user/services/get-user.service';

import { LoginAuthDto } from '../dto/login-auth.dto';
import { TokenAuthService } from './token-auth.service';

@Injectable()
export class LoginAuthService {
  constructor(
    private readonly tokenAuthService: TokenAuthService,
    private readonly getUserService: GetUserService,
  ) {}

  async execute({
    userEmail,
    passwordProvided,
  }: LoginAuthDto): Promise<{ userToken: string }> {
    const { password, ...user } = await this.getUserService.find({ userEmail });

    await comparePasswords(passwordProvided, password);

    return { userToken: this.tokenAuthService.generateToken(user), ...user };
  }
}
