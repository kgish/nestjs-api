import { Role } from './user-role.enum';

export class UserRO {
  id: string;
  username: string;
  role: Role;
  created: Date;
  updated: Date;
  token?: string;
}
