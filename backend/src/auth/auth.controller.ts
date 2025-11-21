import { Body, Controller, Post } from '@nestjs/common';

import { LoginAuthDto } from './dto/login-auth.dto';
import { LoginAuthService } from './services/login-auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginAuthService: LoginAuthService) {}

  @Post('login')
  async login(@Body() loginData: LoginAuthDto) {
    return this.loginAuthService.execute(loginData);
  }
}
