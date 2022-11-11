import { IsNotEmpty } from 'class-validator';
import { PaginationParams } from 'types/type';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

export class UserListWithPaginationDto extends PaginationParams {
  keyword?: string;
}
