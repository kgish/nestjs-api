import { ReflectMetadata } from '@nestjs/common';
import { Role } from '../../user/interfaces/user-role.enum';

export const Roles = (...roles: Role[]) => ReflectMetadata('roles', roles);
