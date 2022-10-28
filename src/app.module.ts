import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { UserRoleModule } from './user-center/user-role/user-role.module';

@Module({
  imports: [AuthModule, RoleModule, UserRoleModule],
})
export class AppModule {}
