import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { LocalStorage } from './local.strategy';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
