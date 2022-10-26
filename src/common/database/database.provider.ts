/*
 * @Author: yaobo
 * @Description: 数据库链接配置
 */

import { User } from 'src/user-center/user/provider/user.mysql.entity';
import { getConfig } from 'src/utils';
import { DataSource } from 'typeorm';

const { MYSQL_CONFIG } = getConfig();

const MYSQL_DATABASE_CONFIG = {
  ...MYSQL_CONFIG,
  entities: [User],
};

const MYSQL_DATA_SOURCE = new DataSource(MYSQL_DATABASE_CONFIG);
// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MYSQL_DATA_SOURCE',
    useFactory: async () => {
      if (!MYSQL_DATA_SOURCE.isInitialized)
        await MYSQL_DATA_SOURCE.initialize();
      return MYSQL_DATA_SOURCE;
    },
  },
];
