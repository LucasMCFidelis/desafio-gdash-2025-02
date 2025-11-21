import { CurrentUserPayload } from './current-user';

declare module 'express-serve-static-core' {
  interface Request {
    user?: CurrentUserPayload;
  }
}
