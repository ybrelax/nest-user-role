import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserProviders } from './providers/user.providers';
import { RolePrivilegeModule } from '../role-privilege/role-privilege.module';
import { RoleModule } from '../role/role.module';
import { PrivilegeModule } from '../privilege/privilege.module';
import { UserRoleModule } from '../user-role/user-role.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [DatabaseModule, UserRoleModule, RolePrivilegeModule, RoleModule, PrivilegeModule],
  controllers: [UserController],
  providers: [...UserProviders, UserService],
  exports: [...UserProviders, UserService],
})
export class UserModule {}
