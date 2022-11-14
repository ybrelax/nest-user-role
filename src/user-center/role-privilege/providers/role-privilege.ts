import { RolePrivilege } from './role-privilege.entity';

// 数据库注入
export const RolePrivilegeProviders = [
  {
    provide: 'ROLE_PRIVILEGE_REPOSITORY',
    useFactory: (AppDataSource) => {
      return AppDataSource.getRepository(RolePrivilege);
    },
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
