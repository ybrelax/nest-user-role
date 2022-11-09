import { Injectable, Inject } from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { paginate } from 'nestjs-typeorm-paginate';
import { CustomPaginationMeta, getPaginationOptions } from 'src/helper';
import { In, Repository } from 'typeorm';
import {
  CreatePrivilegeDto,
  PrivilegeListWidthPaginateDto,
  UpdatePrivilegeDto,
} from './provide/privilege.dto';
import { Privilege } from './provide/privilege.entity.mysql';

@Injectable()
export class PrivilegeService {
  constructor(
    @Inject('PRIVILEGE_REPOSITORY')
    private privilegeRepository: Repository<Privilege>,
  ) {}

  createOrUpdate(params: CreatePrivilegeDto | UpdatePrivilegeDto) {
    return this.privilegeRepository.save(params);
  }

  findById(id) {
    return this.privilegeRepository.findOne({
      where: { id },
    });
  }

  findByIds(ids: number[]) {
    return this.privilegeRepository.find({
      where: { id: In(ids) },
    });
  }

  delete(id: number) {
    return this.privilegeRepository.delete(id);
  }

  async paginate(params: PrivilegeListWidthPaginateDto) {
    const { current, pageSize, ...searchParams } = params;
    const queryBuilder =
      this.privilegeRepository.createQueryBuilder('privilege');
    queryBuilder.orderBy('privilege.createDate', 'DESC');

    if (isNotEmpty(searchParams.keyword)) {
      queryBuilder.andWhere('privilege.name like :name', {
        name: `%${searchParams.keyword}%`,
      });
    }

    return paginate<Privilege, CustomPaginationMeta>(
      queryBuilder,
      getPaginationOptions({ current, pageSize }),
    );
  }
}
