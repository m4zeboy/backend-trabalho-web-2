import { SetMetadata } from '@nestjs/common'
import { UserRole } from 'src/auth/users/types/user-role.enum'

export const RequiresRole = (requiredRole: UserRole) =>
  SetMetadata('role', requiredRole)
