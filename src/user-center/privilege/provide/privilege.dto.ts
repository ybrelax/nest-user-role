import { IsNotEmpty, IsIn } from 'class-validator';
import { PaginationParams } from 'types/type';
import { Action } from './privilege.entity';

export class CreatePrivilegeDto {
  @IsNotEmpty()
  name: string;

  @IsIn(Object.values(Action))
  @IsNotEmpty()
  action: Action;

  description?: string;
  status?: number;
}

export class UpdatePrivilegeDto {
  @IsNotEmpty()
  id: number;
  name?: string;
  action?: Action;
  description?: string;
  status?: number;
}

export class ChangePrivilegeStatusDto {
  @IsNotEmpty()
  privilegeId: number;
  @IsNotEmpty()
  status: number;
}

export class DeletePrivilegeDto {
  @IsNotEmpty()
  privilegeId: number;
}

export class PrivilegeListWidthPaginateDto extends PaginationParams {
  keyword?: string;
}
