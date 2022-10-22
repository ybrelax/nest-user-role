import { User } from './user.mysql.entity';

// 数据库注入
export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    userFatory: (AppDataSource) => AppDataSource.getRepository(User),
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
