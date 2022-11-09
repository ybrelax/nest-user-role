import { IsNotEmpty } from 'class-validator';
import { PaginationParams } from 'types/type';

export class CreatePrivilegeDto {
  @IsNotEmpty()
  name: string;
  description?: string;
  status?: number;
}

export class UpdatePrivilegeDto {
  @IsNotEmpty()
  id: number;
  name?: string;
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
