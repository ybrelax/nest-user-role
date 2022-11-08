/*
 * @Author: yaobo
 * @Description: 数据库链接配置
 */

import { Privilege } from 'src/user-center/privilege/provide/privilege.entity.mysql';
import { User } from 'src/user-center/user/provide/user.mysql.entity';
import { getConfig } from 'src/utils';
import { DataSource } from 'typeorm';

const { MYSQL_CONFIG } = getConfig();

const MYSQL_DATABASE_CONFIG = {
  ...MYSQL_CONFIG,
  entities: [User, Privilege],
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
