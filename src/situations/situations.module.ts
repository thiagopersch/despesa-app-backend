import { Module } from '@nestjs/common';
import { SituationsService } from './situations.service';
import { SituationsController } from './situations.controller';

@Module({
  controllers: [SituationsController],
  providers: [SituationsService],
})
export class SituationsModule {}
