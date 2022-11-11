import { Module } from '@nestjs/common';
import { UserRoleModule } from './user-center/user-role/user-role.module';
import { RoleModule } from './user-center/role/role.module';
import { PrivilegeModule } from './user-center/privilege/privilege.module';
import { AuthModule } from './auth/auth.module';
import { RolePrivilegeModule } from './user-center/role-privilege/role-privilege.module';

@Module({
  imports: [RoleModule, UserRoleModule, PrivilegeModule, AuthModule, RolePrivilegeModule],
})
export class AppModule {}
