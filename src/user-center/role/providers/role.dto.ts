import { IsNotEmpty } from 'class-validator';
import { PaginationParams } from 'types/type';
import { Role } from './role.entity';

export class CreateRoleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateRoleDto extends Role {
  @IsNotEmpty()
  id: number;
}

export class DeleteRoleDto {
  @IsNotEmpty()
  id: number;
}

export class RolePrivilegeSaveDto {}

export class RoleListWidthPaginateDto {
  keyword?: string;
  page?: PaginationParams;
}

export class GetPrivilegeListByIdDto {
  @IsNotEmpty()
  roleId: number;
}

export class RolePrivilegeSetDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  privilegeIds: number[];
}
