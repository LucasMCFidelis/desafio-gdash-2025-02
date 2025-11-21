import { UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';

export async function comparePasswords(
  provided: string,
  stored: string,
): Promise<boolean> {
  const match = await bcrypt.compare(provided, stored);

  if (!match) {
    throw new UnauthorizedException('Credenciais inválidas');
  }

  return true;
}
