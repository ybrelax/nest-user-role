import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import * as urlencode from 'urlencode';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Get('wechatLogin')
  async wechatLogin(@Res() res) {
    const APPID = this.configService.get('WECHAT').APPID;

    const redirectUri = urlencode('http://bi.shangquedata.com');
    res.redirect(
      `https://open.weixin.qq.com/connect/qrconnect?appid=${APPID}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`,
    );
  }

  @Post('wechat')
  async loginWithWechat(@Body('code') code: string) {
    return this.authService.loginWithWechat(code);
  }
}
