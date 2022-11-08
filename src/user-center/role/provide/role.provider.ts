import { Role } from './role.entity.mysql';

export const RoleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (appDataSource) => appDataSource.getRepository(Role),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
