import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';
import { PrioritiesService } from './priorities.service';

@Controller('priorities')
export class PrioritiesController {
  constructor(private readonly prioritiesService: PrioritiesService) {}

  @Post()
  async create(@Body() createPriorityDto: CreatePriorityDto) {
    const priority = await this.prioritiesService.create(createPriorityDto);
    return priority;
  }

  @Get()
  async findAll() {
    return this.prioritiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prioritiesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePriorityDto: UpdatePriorityDto,
  ) {
    return this.prioritiesService.update(id, updatePriorityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prioritiesService.remove(id);
  }
}
