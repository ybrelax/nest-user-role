import { IsNotEmpty } from 'class-validator';
import { PaginationParams } from 'types/type';

export class CreateRoleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

export class DeleteRoleDto {
  @IsNotEmpty()
  id: number;
}

export class RolePrivilegeSaveDto {}

export class RoleListWithPaginationDto {
  keyword?: string;

  page?: PaginationParams;
}
