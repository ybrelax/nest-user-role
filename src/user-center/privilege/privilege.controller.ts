import { Controller, Post, Body } from '@nestjs/common';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { PrivilegeService } from './privilege.service';
import {
  CreatePrivilegeDto,
  UpdatePrivilegeDto,
  ChangePrivilegeStatusDto,
  DeletePrivilegeDto,
  PrivilegeListWidthPaginateDto,
} from './provide/privilege.dto';
import { Privilege } from './provide/privilege.entity';

@Controller('privilege')
export class PrivilegeController {
  constructor(private readonly privilegeService: PrivilegeService) {}

  @Post('create')
  async create(@Body() dto: CreatePrivilegeDto) {
    const privilege: Privilege = {
      name: dto.name,
      action: dto.action,
      description: dto.description,
    };
    return this.privilegeService.createOrUpdate(privilege);
  }

  @Post('update')
  async update(@Body() dto: UpdatePrivilegeDto) {
    const updatedPrivilege: Privilege = {
      name: dto.name,
      action: dto.action,
      description: dto.description,
    };

    const privilege = await this.privilegeService.findById(dto.id);
    if (!privilege) {
      throw new BusinessException(`未找到id为${dto.id}的权限`);
    }

    return this.privilegeService.createOrUpdate({ ...privilege, ...updatedPrivilege });
  }

  // 修改权限状态
  @Post('changeStatus')
  async changeStatus(@Body() dto: ChangePrivilegeStatusDto) {
    const privilegeInstance = await this.privilegeService.findById(dto.privilegeId);
    if (!privilegeInstance) {
      throw new BusinessException(`未找到id为${dto.privilegeId}}的权限`);
    }
    return this.privilegeService.createOrUpdate({
      ...privilegeInstance,
      status: dto.status,
    });
  }

  @Post('delete')
  async delete(@Body() dto: DeletePrivilegeDto) {
    return this.privilegeService.delete(dto.privilegeId);
  }

  @Post('/list/paginate')
  async listWidthPaginate(@Body() dto: PrivilegeListWidthPaginateDto) {
    const pageData = await this.privilegeService.paginate(dto);
    return pageData;
  }

  @Post('/list')
  list() {
    return this.privilegeService.list();
  }
}
