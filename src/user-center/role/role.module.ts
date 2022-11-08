import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { RoleProviders } from './provide/role.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [RoleService, ...RoleProviders],
})
export class RoleModule {}
