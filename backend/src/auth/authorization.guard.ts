import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user;
    const targetUserId = request.query.userId;

    if (!user) {
      throw new ForbiddenException('Usuário não autenticado.');
    }

    if (user.id !== targetUserId) {
      throw new ForbiddenException(
        'Você não pode alterar dados de outro usuário.',
      );
    }

    return true;
  }
}
