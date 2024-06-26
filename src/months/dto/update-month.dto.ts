import { PartialType } from '@nestjs/mapped-types';
import { CreateMonthDto } from './create-month.dto';

export class UpdateMonthDto extends PartialType(CreateMonthDto) {
  id?: string;
  name: string;
  status: boolean;
}
