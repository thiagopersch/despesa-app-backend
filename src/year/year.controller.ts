import { Controller, Get } from '@nestjs/common';
import { YearService } from './year.service';

@Controller('year')
export class YearController {
  constructor(private readonly yearService: YearService) {}

  @Get()
  findAll() {
    return this.yearService.findAll();
  }
}
