import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        transport: {
          targets: [
            {
              target: 'pino-pretty',
              level: 'warn',
              options: {
                translateTime: 'hh:mm:ss',
                ignore: 'pid,hostname',
              },
            },
          ],
        },
      },
    }),
  );

  // 开启全局校验
  app.useGlobalPipes(new ValidationPipe());

  // 设置请求前缀
  app.setGlobalPrefix('api', { exclude: ['*'] });

  app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });

  await app.listen(80);
}
bootstrap();
