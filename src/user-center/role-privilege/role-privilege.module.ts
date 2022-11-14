import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { RolePrivilegeProviders } from './providers/role-privilege';
import { RolePrivilegeService } from './role-privilege.service';

@Module({
  imports: [DatabaseModule],
  providers: [...RolePrivilegeProviders, RolePrivilegeService],
  exports: [RolePrivilegeService],
})
export class RolePrivilegeModule {}
