import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  async create(@Body() data: CreateCategoryDto) {
    const category = await this.categoriesService.create(data);

    return { category };
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    const category = await this.categoriesService.update(id, data);

    return category;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const category = await this.categoriesService.remove(id);

    return category;
  }
}
