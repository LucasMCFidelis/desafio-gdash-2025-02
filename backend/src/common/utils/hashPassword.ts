import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const SALT_HOUNDS = 10;

  return await bcrypt.hash(password, SALT_HOUNDS);
}
