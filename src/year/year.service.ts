import { Injectable } from '@nestjs/common';

@Injectable()
export class YearService {
  findAll(): string {
    return 'Year returned';
  }
}
