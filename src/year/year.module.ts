import { Module } from '@nestjs/common';
import { YearController } from './year.controller';
import { YearService } from './year.service';

@Module({
  controllers: [YearController],
  providers: [YearService, YearService],
})
export class YearModule {}
