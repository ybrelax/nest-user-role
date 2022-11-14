import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { RoleProviders } from './providers/role.provider';
import { RolePrivilegeModule } from '../role-privilege/role-privilege.module';
import { PrivilegeModule } from '../privilege/privilege.module';

@Module({
  imports: [DatabaseModule, RolePrivilegeModule, PrivilegeModule],
  controllers: [RoleController],
  providers: [RoleService, ...RoleProviders],
  exports: [RoleService],
})
export class RoleModule {}
