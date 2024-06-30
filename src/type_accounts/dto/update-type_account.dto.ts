import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeAccountDto } from './create-type_account.dto';

export class UpdateTypeAccountDto extends PartialType(CreateTypeAccountDto) {
  bank_code: string;
  bank_name: string;
  bank_type: string;
  bank_color: string;
  status: boolean;
}
