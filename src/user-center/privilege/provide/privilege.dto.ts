import { IsNotEmpty } from 'class-validator';

export class CreatePrivilegeDto {
  @IsNotEmpty()
  name: string;
  description?: string;
}

export class UpdatePrivilegeDto {
  @IsNotEmpty()
  id: number;
  name?: string;
  description?: string;
}

export class ChangePrivilegeStatusDto {
  @IsNotEmpty()
  privilegeId: number;

  @IsNotEmpty()
  status: number;
}
