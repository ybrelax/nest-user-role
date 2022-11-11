import { IsNotEmpty } from 'class-validator';
import { PaginationParams } from 'types/type';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

export class DisableUserDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  status: number;
}

export class GetRolesByIdDto {
  @IsNotEmpty()
  userId: number;
}

export class UserPaginationDto {
  keyword?: string;
  page?: PaginationParams;
}

export class setRolesDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  roleIds: number[];
}
