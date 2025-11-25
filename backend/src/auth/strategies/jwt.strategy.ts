import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    const opts: StrategyOptions = {
      secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (
          req: Request & { cookies?: Record<string, string> },
        ): string | null => {
          return req.cookies?.userToken ?? null;
        },
      ]),
      ignoreExpiration: false,
    };

    super(opts);
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
