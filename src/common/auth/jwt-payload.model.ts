import { Role } from '../../user/interfaces';

export interface JwtPayload {
    username: string;
    role: Role;
    iat?: Date;
}
