import { UserRole } from '../../../user/interfaces';

export interface JwtPayload {
  username: string;
  role: UserRole;
  iat?: Date;
}
