import { Injectable, Inject } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import {
  CreatePrivilegeDto,
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
    return this.privilegeRepository.find({
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
}
