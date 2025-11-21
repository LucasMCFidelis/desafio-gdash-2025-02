import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { CurrentUserPayload } from '../types/current-user';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CurrentUserPayload | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.user;
  },
);
