import { Inject, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { RolePrivilege } from './providers/role-privilege.mysql.entity';

@Injectable()
export class RolePrivilegeService {
  constructor(
    @Inject('ROLE_PRIVILEGE_REPOSITORY')
    private rolePrivilegeRepository: Repository<RolePrivilege>,
  ) {}

  findListByRoleIds(roleIds: number[]) {
    return this.rolePrivilegeRepository.find({
      where: {
        roleId: In(roleIds),
      },
    });
  }

  save(roleId: number, privilegeIds: number[]) {
    const rolePrivileges: RolePrivilege[] = privilegeIds.map((id) => ({
      roleId,
      privilegeId: id,
    }));
    return this.rolePrivilegeRepository.save(rolePrivileges);
  }

  deleteByRoleId(roleId: number) {
    return this.rolePrivilegeRepository.delete({ roleId });
  }
}
