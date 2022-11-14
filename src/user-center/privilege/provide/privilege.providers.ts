import { Privilege } from './privilege.entity';

export const PrivilegeProviders = [
  {
    provide: 'PRIVILEGE_REPOSITORY',
    useFactory: (AppDataSource) => AppDataSource.getRepository(Privilege),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
