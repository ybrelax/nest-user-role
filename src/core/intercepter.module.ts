import { Module } from '@nestjs/common';
import { IntercepterController } from './intercepter.controller';

@Module({
  controllers: [IntercepterController],
  // providers: [Intercepter]
})
export class IntercepterModule {}
