import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BusinessException } from 'src/common/exceptions/business.exception';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw new BusinessException('请输入用户名和密码');
    }
    return user;
  }
}
