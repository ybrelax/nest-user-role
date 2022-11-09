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

@Controller('privilege')
export class PrivilegeController {
  constructor(private readonly privilegeService: PrivilegeService) {}

  @Post('create')
  async create(@Body() dto: CreatePrivilegeDto) {
    return this.privilegeService.createOrUpdate(dto);
  }

  @Post('update')
  async update(@Body() dto: UpdatePrivilegeDto) {
    return this.privilegeService.createOrUpdate(dto);
  }

  // 修改权限状态
  @Post('change-status')
  async changeStatus(@Body() dto: ChangePrivilegeStatusDto) {
    const privilegeInstance = await this.privilegeService.findById(
      dto.privilegeId,
    );
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
}
