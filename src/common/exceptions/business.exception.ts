/**
 * @Author: yaobo
 * @Description: 异常拦截
 */

import { HttpException, HttpStatus } from '@nestjs/common';
import { BUSINESS_ERROR_CODE } from './business.error.codes';

type BusinessError = {
  code: number;
  message: string;
};

export class BusinessException extends HttpException {
  constructor(err: BusinessError | string) {
    if (typeof err === 'string') {
      err = {
        code: BUSINESS_ERROR_CODE.COMMON,
        message: err,
      };
    }
    super(err, HttpStatus.OK);
  }

  static throwForbidden() {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.PERMISSION_DISABLED,
      message: '抱歉哦，您无此权限！',
    });
  }

  static throwPermissionDisabled() {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.PERMISSION_DISABLED,
      message: '权限已禁用',
    });
  }

  static throwUserDisabled() {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.USER_DISABLED,
      message: '用户已经冻结',
    });
  }

  static throwUnAuthorized() {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODE.UNAUTHORIZED,
      message: '请求未经授权',
    });
  }
}
