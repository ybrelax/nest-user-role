import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserRoleModule } from './user-center/user-role/user-role.module';
import { RoleModule } from './user-center/role/role.module';
import { PrivilegeModule } from './user-center/privilege/privilege.module';

@Module({
  imports: [AuthModule, RoleModule, UserRoleModule, PrivilegeModule],
})
export class AppModule {}
