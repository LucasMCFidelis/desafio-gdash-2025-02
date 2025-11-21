import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLean } from 'src/user/Schema/user.schema';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class TokenAuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: UserLean): string {
    const payload: JwtPayload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }

  async validateToken(userToken: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(userToken);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Token invalido');
    }
  }
}
