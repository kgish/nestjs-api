import { Role } from './user-ro.interface';

export interface User {
  readonly username: string;
  readonly password: string;
  readonly role: Role;
}
