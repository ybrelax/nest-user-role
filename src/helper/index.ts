import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IPaginationMeta, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { MAX_PAGE_SIZE, PaginationParams } from 'types/type';
import { defaultPaginationParams } from './constants';

export class CustomPaginationMeta {
  constructor(
    public readonly current: number,
    public readonly pageSize: number,
    public readonly total: number,
  ) {}
}

export const getPaginationOptions = (
  page: PaginationParams = {
    current: defaultPaginationParams.current,
    pageSize: defaultPaginationParams.pageSize,
  },
) => {
  const limit = page.pageSize > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : page.pageSize;

  const options: IPaginationOptions<CustomPaginationMeta> = {
    page: page.current,
    limit,
    metaTransformer: (meta: IPaginationMeta): CustomPaginationMeta => {
      return new CustomPaginationMeta(
        meta.currentPage,
        meta.itemCount,
        meta.totalItems,
      );
    },
  };
  return options;
};

export const PayloadUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
