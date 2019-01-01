import { UserRole } from '../../user/user-role.enum';

export interface JwtPayload {
    username: string;
    role: UserRole;
    iat?: Date;
}
