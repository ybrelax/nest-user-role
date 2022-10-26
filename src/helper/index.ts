import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PayloadUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('request:",', request);
    return request.user;
  },
);
