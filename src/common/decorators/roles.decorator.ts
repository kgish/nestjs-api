import { ReflectMetadata } from '@nestjs/common';
import { UserRole } from '../../user/interfaces';

export const Roles = (...roles: UserRole[]) => ReflectMetadata('roles', roles);
