/*
 * @Author: yaobo
 * @Description: 数据库链接配置
 */
import * as path from 'path';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

// 数据库注入
export const DatabaseProviders = [
  {
    // mysql 数据库注入
    inject: [ConfigService],
    provide: 'MYSQL_DATA_SOURCE',
    useFactory: async (configService: ConfigService) => {
      const mysqlConfig = configService.get('MYSQL_CONFIG');
      const mysqlDataSource = new DataSource({
        ...mysqlConfig,
        entities: [path.join(__dirname, `../../**/*.entity{.ts,.js}`)],
      });
      if (!mysqlDataSource.isInitialized) await mysqlDataSource.initialize();
      return mysqlDataSource;
    },
  },
];
