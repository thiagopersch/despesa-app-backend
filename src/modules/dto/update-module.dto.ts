import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleDto } from './create-module.dto';

export class UpdateModuleDto extends PartialType(CreateModuleDto) {
  id?: string;
  code: string;
  name: string;
  status: boolean;
}
