import { Controller, Post, Body } from '@nestjs/common';
import { PrivilegeService } from '../privilege/privilege.service';
import { RolePrivilegeService } from '../role-privilege/role-privilege.service';
import {
  CreateRoleDto,
  DeleteRoleDto,
  GetPrivilegeListByIdDto,
  UpdateRoleDto,
  RoleListWidthPaginateDto,
  RolePrivilegeSetDto,
} from './providers/role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly rolePrivilegeService: RolePrivilegeService,
    private readonly privilegeService: PrivilegeService,
  ) {}

  @Post('create')
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Post('update')
  update(@Body() dto: UpdateRoleDto) {
    return this.roleService.update(dto);
  }

  @Post('delete')
  delete(@Body() dto: DeleteRoleDto) {
    return this.roleService.delete(dto.id);
  }

  @Post('list')
  list() {
    return this.roleService.list();
  }

  // 根据角色Id查询权限列表
  @Post('/getPrivilegeListById')
  async getPrivilegeListById(@Body() dto: GetPrivilegeListByIdDto) {
    const rolePrivilegeList = await this.rolePrivilegeService.listByRoleIds([dto.roleId]);
    const privilegeList = await this.privilegeService.findByIds(
      rolePrivilegeList.map((rp) => rp.id),
    );
    return privilegeList;
  }

  @Post('/list/paginate')
  async listWidthPaginate(@Body() dto: RoleListWidthPaginateDto) {
    const { page, ...searchParams } = dto;
    return this.roleService.paginate(searchParams, page);
  }

  // 设置角色权限
  @Post('/setRolePrivilege')
  async setRolePrivilege(@Body() dto: RolePrivilegeSetDto) {
    await this.rolePrivilegeService.deleteByRoleId(dto.id);
    return this.rolePrivilegeService.save(dto.id, dto.privilegeIds);
  }
}
