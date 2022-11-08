import { Controller, Post, Body } from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import {
  CreatePrivilegeDto,
  UpdatePrivilegeDto,
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
}
