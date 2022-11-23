import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BusinessException } from 'src/common/exceptions/business.exception';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    console.log(user, roles)
    if (!user) {
      return false;
    }
    const hasRoles = roles.some((role) => role === user.role);
    if (!hasRoles) {
      throw new BusinessException('您没有权限');
    }
    return hasRoles;
  }
}
