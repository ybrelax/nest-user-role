import { compareSync } from 'bcryptjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { UserService } from 'src/user-center/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    // 如果不是username、password， 在constructor中配置
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);

    if (!user || !compareSync(password, user.password)) {
      throw new BadRequestException('用户名或密码不正确！');
    }

    return user;
  }
}
