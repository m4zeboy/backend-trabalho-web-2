// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRole } from '../users/types/user-role.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<UserRole>(
      'role',
      context.getHandler(),
    )
    if (!requiredRole) {
      return true // Allow access if no roles are specified
    }

    const request = context.switchToHttp().getRequest()
    const user = request.user // Assuming you have a user object in the request

    return requiredRole === user.role // Original logic
  }
}
