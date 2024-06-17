import { PartialType } from '@nestjs/mapped-types';
import { CreatePriorityDto } from './create-priority.dto';

export class UpdatePriorityDto extends PartialType(CreatePriorityDto) {
  name: string;
  status: boolean;
}
