// src/types/express-user.d.ts
import { User } from 'src/users/user.entity';

declare global {
  namespace Express {
    // Extend the existing Request interface
    interface Request {
      user?: User; // or user: User if guaranteed to exist
    }
  }
}
