import { UserRole } from './user-role.enum';

export class UserRO {
  id: string;
  username: string;
  role: UserRole;
  created: Date;
  updated: Date;
  token?: string;
}
