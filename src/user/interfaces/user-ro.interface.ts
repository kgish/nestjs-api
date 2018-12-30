export type Role = 'admin' | 'support' | 'operator' | 'user';

export class UserRO {
  id: string;
  username: string;
  role: Role;
  created: Date;
  updated: Date;
  token?: string;
}
