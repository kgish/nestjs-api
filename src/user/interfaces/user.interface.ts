import { UserRole } from './user-role.enum';

export interface User {
  username: string;
  password: string;
  role: UserRole;
}
