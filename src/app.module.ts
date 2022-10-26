import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [AuthModule, RoleModule],
})
export class AppModule {}
