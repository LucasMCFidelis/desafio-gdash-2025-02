import type { Response } from 'express';

export const setAuthCookie = (
  res: Response,
  token: string,
  name = 'userToken',
) => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    path: '/',
    maxAge: 1000 * 60 * 60,
  });
};
