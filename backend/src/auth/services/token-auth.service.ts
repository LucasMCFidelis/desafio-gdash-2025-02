import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLean } from 'src/user/Schema/user.schema';

@Injectable()
export class TokenAuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: UserLean): string {
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }

  validateToken(userToken: string): boolean {
    try {
      this.jwtService.verify(userToken);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Token invalido');
    }

    return true;
  }
}
