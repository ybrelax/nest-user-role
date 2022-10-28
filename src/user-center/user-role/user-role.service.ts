import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRole } from './provide/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject('USER_ROLE_REPOSITORY')
    private userRoleRespository: Repository<UserRole>,
  ) {}

  findListByUserId(userId: number) {
    return this.userRoleRespository.find({
      where: {
        userId,
      },
    });
  }

  deleteByUserId(userId: number) {
    return this.userRoleRespository.delete({ userId });
  }

  async setUserRoles(userId, roleIds: number[]) {
    const userRoles: UserRole[] = roleIds.map((roleId) => {
      return {
        userId,
        roleId,
      };
    });
    await this.deleteByUserId(userId);
    return this.userRoleRespository.save(userRoles);
  }
}
