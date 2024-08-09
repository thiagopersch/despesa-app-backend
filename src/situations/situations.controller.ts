import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateSituationDto } from './dto/create-situation.dto';
import { UpdateSituationDto } from './dto/update-situation.dto';
import { SituationsService } from './situations.service';

@Controller('situations')
export class SituationsController {
  constructor(private readonly situationsService: SituationsService) {}

  @Post()
  create(@Body() createSituationDto: CreateSituationDto) {
    return this.situationsService.create(createSituationDto);
  }

  @Get()
  findAll() {
    return this.situationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.situationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSituationDto: UpdateSituationDto,
  ) {
    return this.situationsService.update(id, updateSituationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.situationsService.remove(id);
  }
}
