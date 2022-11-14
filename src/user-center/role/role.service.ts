import { Inject, Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { CustomPaginationMeta, getPaginationOptions } from 'src/helper';
import { In, Repository } from 'typeorm';
import { PaginationParams } from 'types/type';
import { RolePrivilegeService } from '../role-privilege/role-privilege.service';
import { CreateRoleDto, RoleListWidthPaginateDto, UpdateRoleDto } from './providers/role.dto';
import { Role } from './providers/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private roleRepository: Repository<Role>,
    private rolePrivilegeService: RolePrivilegeService,
  ) {}

  create(dto: CreateRoleDto) {
    return this.roleRepository.save(dto);
  }

  async update(dto: UpdateRoleDto) {
    const found = await this.findByid(dto.id);
    if (!found) {
      throw new BusinessException('未找到角色');
    }
    return this.roleRepository.save(dto);
  }

  async delete(id: number) {
    // 同步删除角色和权限的关系
    await this.rolePrivilegeService.deleteByRoleId(id);
    return await this.roleRepository.delete(id);
  }

  findByid(id) {
    return this.roleRepository.findOneBy({ id });
  }

  findByIds(ids: number[]) {
    return this.roleRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async paginate(
    searchParams: RoleListWidthPaginateDto,
    page: PaginationParams,
  ): Promise<Pagination<Role, CustomPaginationMeta>> {
    const queryBuilder = this.roleRepository.createQueryBuilder('role');
    queryBuilder.orderBy('role.createTime', 'DESC');

    // 关键字
    if (isNotEmpty(searchParams.keyword)) {
      queryBuilder.andWhere('role.name LIKE :name', {
        name: `%${searchParams.keyword}%`,
      });
    }
    return paginate<Role, CustomPaginationMeta>(queryBuilder, getPaginationOptions(page));
  }

  list() {
    return this.roleRepository.find();
  }
}
