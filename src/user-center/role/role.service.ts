import { Inject, Injectable } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CustomPaginationMeta, getPaginationOptions } from 'src/helper';
import { In, Repository } from 'typeorm';
import { PaginationParams } from 'types/type';
import { RolePrivilegeService } from '../role-privilege/role-privilege.service';
import { CreateRoleDto, RoleListWithPaginationDto } from './providers/role.dto';
import { Role } from './providers/role.entity.mysql';

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

  update(dto: Role) {
    return this.roleRepository.save(dto);
  }

  async delete(id: number) {
    // 同步删除角色和权限的关系
    await this.rolePrivilegeService.deleteByRoleId(id);
    return await this.roleRepository.delete(id);
  }

  findByid(id) {
    return this.roleRepository.findOneBy(id);
  }

  findByIds(ids: number[]) {
    return this.roleRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async paginate(
    searchParams: RoleListWithPaginationDto,
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
}
