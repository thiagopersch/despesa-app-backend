import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    const existCategory = await this.prisma.category.findUnique({
      where: { name: data.name },
      select: { name: true },
    });

    if (existCategory) {
      throw new AppError('Category already exists', 400);
    }

    const category = await this.prisma.category.create({ data: { ...data } });

    return category;
  }

  async findAll() {
    const category = await this.prisma.category.findMany({
      where: { deletedAt: null },
    });

    return category;
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new AppError('Category not found', 404);
    }
  }

  async update(id: string, data: UpdateCategoryDto) {
    const category = await this.prisma.category.update({
      where: { id: data.id },
      data: data,
    });

    return category;
  }

  async remove(id: string) {
    const category = await this.prisma.category.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return category;
  }
}
