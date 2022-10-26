import { User } from './user.mysql.entity';

// 数据库注入
export const UserProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (AppDataSource) => {
      return AppDataSource.getRepository(User);
    },
    inject: ['MYSQL_DATA_SOURCE'],
  },
];
