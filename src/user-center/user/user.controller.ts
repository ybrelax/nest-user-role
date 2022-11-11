import { Controller, Post, Body } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { UserRoleService } from '../user-role/user-role.service';
import {
  CreateUserDto,
  DisableUserDto,
  GetRolesByIdDto,
  setRolesDto,
  UserPaginationDto,
} from './providers/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRoleService: UserRoleService,
  ) {}

  @Post('/profile')
  profile(@Body() user: Payload) {
    return this.userService.profile(user.userId);
  }

  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  @Post('changeStatus')
  async changeStatus(@Body() dto: DisableUserDto) {
    const found = await this.userService.getUserById(dto.userId);
    if (!found) {
      throw new BusinessException(`未找到 ID 为 ${dto.userId} 的用户`);
    }
    return this.userService.saveUser({ ...found, status: dto.status });
  }

  @Post('/list/paginate')
  async getLisPagination(dto: UserPaginationDto) {
    const { page, ...searchParams } = dto;
    return this.userService.paginate(searchParams, page);
  }

  @Post('/getRolesById')
  getRolesById(@Body() dto: GetRolesByIdDto) {
    return this.userService.getRolesById(dto.userId);
  }

  @Post('setRoles')
  async setRoles(@Body() dto: setRolesDto) {
    return await this.userRoleService.setUserRoles(dto.userId, dto.roleIds);
  }
}
