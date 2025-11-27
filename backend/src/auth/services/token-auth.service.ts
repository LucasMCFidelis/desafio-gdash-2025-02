import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class TokenAuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(userPayload: JwtPayload): string {
    return this.jwtService.sign(userPayload);
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
