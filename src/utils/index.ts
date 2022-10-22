/*
 * @Author yaobo
 * @Description 工具类
 */
import path from 'path';
import fs from 'fs';
import { parse } from 'yaml';

// 获取当前项目运行环境
export const getEnv = () => {
  return process.env.RUNNING_ENV;
};

// 读取项目配置
export const getConfig = (key: string) => {
  const environment = getEnv();
  const yamlPaht = path.join(process.cwd(), `./config/${environment}.yaml`);
  const file = fs.readFileSync(yamlPaht, 'utf8');
  const config = parse(file);
  if (key) {
    return config[key];
  }
  return config;
};
