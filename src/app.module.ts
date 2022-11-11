import { Module } from '@nestjs/common';
import { UserRoleModule } from './user-center/user-role/user-role.module';
import { RoleModule } from './user-center/role/role.module';
import { PrivilegeModule } from './user-center/privilege/privilege.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RoleModule, UserRoleModule, PrivilegeModule, AuthModule],
})
export class AppModule {}
