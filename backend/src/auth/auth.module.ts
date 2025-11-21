import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

import { AuthController } from './auth.controller';
import { LoginAuthService } from './services/login-auth.service';
import { TokenAuthService } from './services/token-auth.service';

@Module({
  controllers: [AuthController],
  providers: [LoginAuthService, TokenAuthService],
  exports: [LoginAuthService, TokenAuthService],
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    forwardRef(() => UserModule),
  ],
})
export class AuthModule {}
