import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { getWechatAccessToken, getWechatUserInfo } from 'src/helper/apis';
import { User } from 'src/user-center/user/providers/user.entity';
import { UserService } from 'src/user-center/user/user.service';
import { AccessConfig, AccessTokenInfo, WechatError, WechatUserInfo } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}
  private accessTokenInfo: AccessTokenInfo;

  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  login(user: Partial<User>) {
    const token = this.createToken({
      id: user.id,
      password: user.password,
      username: user.username,
    });
    return { token };
  }

  async loginWithWechat(code) {
    if (!code) {
      throw new BusinessException('请输入验证码');
    }

    const user = await this.getUserByOpenid();
    if (!user) {
      const userInfo: WechatUserInfo = await this.getUserInfo();
      return this.userService.saveUser({
        nickname: userInfo.nickname,
        openid: userInfo.openid,
        avatar: userInfo.headimgurl,
      });
    }
    return this.login(user);
  }

  async getUserByOpenid() {
    return await this.userService.getUserByOpenid(this.accessTokenInfo.openid);
  }

  async getUserInfo() {
    const result: WechatError & WechatUserInfo = await getWechatUserInfo({
      access_token: this.accessTokenInfo.accessToken,
      openid: this.accessTokenInfo.openid,
    });
    if (result.errcode) {
      throw new BusinessException(
        `[getUserInfo] errcode:${result.errcode}, errmsg:${result.errmsg}`,
      );
    }
    return result;
  }

  async getAccessToken(code) {
    const { APPID, APPSECRET } = this.configService.get('WECHAT');
    if (!APPSECRET) {
      throw new BusinessException('[getAccessToken]必须有appSecret');
    }
    if (!this.accessTokenInfo || (this.accessTokenInfo && this.isExpires(this.accessTokenInfo))) {
      const result: WechatError & AccessConfig = await getWechatAccessToken({
        app_id: APPID,
        secret: APPSECRET,
        access_token: this.accessTokenInfo.accessToken,
        openid: this.accessTokenInfo.openid,
        code,
        grant_type: 'authorization_code',
      });
      if (result.errcode) {
        throw new BusinessException(
          `[getAccessToken] errcode:${result.errcode}, errmsg:${result.errmsg}`,
        );
      }
      return this.accessTokenInfo.accessToken;
    }
  }

  isExpires(access) {
    return Date.now() - access.getTime > access.expiresIn * 1000;
  }
}
