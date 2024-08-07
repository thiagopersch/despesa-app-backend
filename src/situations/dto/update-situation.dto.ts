import { PartialType } from '@nestjs/mapped-types';
import { CreateSituationDto } from './create-situation.dto';

export class UpdateSituationDto extends PartialType(CreateSituationDto) {
  id?: string;
  name: string;
  color: string;
  status: boolean;
}
