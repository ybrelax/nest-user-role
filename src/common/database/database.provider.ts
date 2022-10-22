/*
 * @Author: yaobo
 * @Description: 数据库链接配置
 */

import { DataSource } from 'typeorm';

const MYSQL_DATABASE_CONFIG = {} as any;

const MYSQL_DATA_SOURCE = new DataSource(MYSQL_DATABASE_CONFIG);

// 数据库注入
export const DatabaseProviders = [
  {
    provider: 'MYSQL_DATA_SOURCE',
    useFactory: async () => {
      if (!MYSQL_DATA_SOURCE.initialize) await MYSQL_DATA_SOURCE.initialize();
      return MYSQL_DATA_SOURCE;
    },
  },
];
