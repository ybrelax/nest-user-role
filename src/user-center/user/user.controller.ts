import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles, RolesGuard } from 'src/auth/guards/role-auth.guard';
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
  @Roles('admin', 'root')
  @UseGuards(JwtAuthGuard, RolesGuard)
  register(@Body() createUser: CreateUserDto) {
    return this.userService.register(createUser);
  }

  // 更改用户状态
  @Post('changeStatus')
  async changeStatus(@Body() dto: DisableUserDto) {
    const found = await this.userService.getUserById(dto.userId);
    if (!found) {
      throw new BusinessException(`未找到 ID 为 ${dto.userId} 的用户`);
    }
    return this.userService.saveUser({ ...found, status: dto.status });
  }

  @Post('/list/paginate')
  async listWidthPaginate(dto: UserPaginationDto) {
    const { page, ...searchParams } = dto;
    return this.userService.paginate(searchParams, page);
  }

  // 根据用户Id获取用户角色
  @Post('/getRolesById')
  getRolesById(@Body() dto: GetRolesByIdDto) {
    return this.userService.getRolesById(dto.userId);
  }

  // 设置用户角色
  @Post('setRoles')
  async setRoles(@Body() dto: setRolesDto) {
    return await this.userRoleService.setUserRoles(dto.userId, dto.roleIds);
  }
}
