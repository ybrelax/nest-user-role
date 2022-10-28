import { UserRole } from './user-role.entity';

export const UserRoleProviders = [
  {
    provide: 'USER_ROLE_REPOSITORY',
    useFactory: (AppDataSource) => AppDataSource.getRepository(UserRole),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
