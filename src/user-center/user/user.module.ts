import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { UserProviders } from './provide/user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...UserProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
