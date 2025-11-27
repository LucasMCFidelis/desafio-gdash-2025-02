import { Body, Controller, Post, Res } from '@nestjs/common';
import { type Response } from 'express';
import { setAuthCookie } from 'src/common/utils/cookie.helpers';

import { LoginAuthDto } from './dto/login-auth.dto';
import { LoginAuthService } from './services/login-auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginAuthService: LoginAuthService) {}

  @Post('login')
  async login(
    @Body() loginData: LoginAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { userToken, ...user } =
      await this.loginAuthService.execute(loginData);

    setAuthCookie(res, userToken);

    return { message: 'logged_in', ...user };
  }
}
