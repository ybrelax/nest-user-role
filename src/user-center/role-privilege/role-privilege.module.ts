import { Module } from '@nestjs/common';
import { RolePrivilegeProviders } from './providers/role-privilege';
import { RolePrivilegeService } from './role-privilege.service';

@Module({
  providers: [...RolePrivilegeProviders, RolePrivilegeService],
  exports: [RolePrivilegeService],
})
export class RolePrivilegeModule {}
