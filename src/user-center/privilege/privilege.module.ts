import { Module } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { PrivilegeController } from './privilege.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { PrivilegeProviders } from './provide/privilege.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PrivilegeController],
  providers: [PrivilegeService, ...PrivilegeProviders],
})
export class PrivilegeModule {}
