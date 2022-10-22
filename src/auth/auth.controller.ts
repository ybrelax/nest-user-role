import { Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { PayloadUser } from 'src/helper';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: FastifyReply) {
    response.setCookie('jwt', '');
    return {};
  }

  @Get('/token/info')
  async getTokenInfo(@PayloadUser() user) {
    return user;
  }
}
