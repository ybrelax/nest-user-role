import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserRoleProviders } from './provide/user-role.provider';
import { UserRoleService } from './user-role.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserRoleService, ...UserRoleProviders],
})
export class UserRoleModule {}
