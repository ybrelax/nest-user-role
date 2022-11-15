import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { isNotEmpty } from 'class-validator';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CustomPaginationMeta, getPaginationOptions } from 'src/helper';
import { Repository } from 'typeorm';
import { PaginationParams } from 'types/type';
import { PrivilegeService } from '../privilege/privilege.service';
import { RolePrivilegeService } from '../role-privilege/role-privilege.service';
import { RoleService } from '../role/role.service';
import { UserRoleService } from '../user-role/user-role.service';
import { CreateUserDto, UserPaginationDto } from './providers/user.dto';
import { User } from './providers/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private readonly userRoleService: UserRoleService,
    private readonly roleService: RoleService,
    private readonly rolePrivilegeService: RolePrivilegeService,
    private readonly privilegeService: PrivilegeService,
  ) {}

  // 个人名片
  profile(userId) {
    return this.userRepository.findOneBy(userId);
  }

  // 注册用户
  async register(createUser: CreateUserDto) {
    const { username } = createUser;
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userRepository.create(createUser);
    return await this.userRepository.save(newUser);
  }

  async paginate(
    searchParams: UserPaginationDto,
    page: PaginationParams,
  ): Promise<Pagination<User, CustomPaginationMeta>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    queryBuilder.orderBy('user.updateTime', 'DESC');
    if (isNotEmpty(searchParams.keyword)) {
      queryBuilder.orWhere('user.username LIKE :name', {
        name: `%${searchParams.keyword}%`,
      });
    }
    return paginate<User, CustomPaginationMeta>(queryBuilder, getPaginationOptions(page));
  }

  // 获取用户权限
  async getPrivilegeByUserId(userId: number) {
    const userRoleList = await this.userRoleService.findListByUserId(userId);
    const roleIds = userRoleList.map((i) => i.id);
    const rolePrivilegeList = await this.rolePrivilegeService.listByRoleIds(roleIds);
    const privilegeIds = rolePrivilegeList.map((r) => r.id);
    const privilegeList = await this.privilegeService.findByIds([...new Set(privilegeIds)]);
    return privilegeList;
  }

  // 获取用户角色列表
  async getRolesById(userId: number) {
    const userRoleList = await this.userRoleService.findListByUserId(userId);
    const roleIds = userRoleList.map((i) => i.id);
    return await this.roleService.findByIds(roleIds);
  }

  getUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  getUserByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  getUserByOpenid(openid: string) {
    return this.userRepository.findOne({ where: { openid } });
  }

  async saveUser(user: Partial<User>) {
    return this.userRepository.save(user);
  }

  async delete(userId: number) {
    return this.userRepository.delete({
      id: userId,
    });
  }
}
