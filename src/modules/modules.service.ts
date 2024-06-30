import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(private prisma: PrismaService) {}

  async create(createModuleDto: CreateModuleDto) {
    const existModule = await this.prisma.module.findUnique({
      where: { code: createModuleDto.code },
      select: { code: true },
    });

    if (existModule) {
      throw new AppError('Module already exists', 400);
    }

    const module = await this.prisma.module.create({
      data: { ...createModuleDto },
    });
    return module;
  }

  async findAll() {
    const modules = await this.prisma.module.findMany({
      where: { deletedAt: null },
    });

    return modules;
  }

  async findOne(id: string) {
    const module = await this.prisma.module.findUnique({
      where: { id },
    });

    return module;
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    const module = await this.findOne(id);

    let updatedData = { ...updateModuleDto };

    const updatedModule = this.prisma.module.update({
      where: { id: module.id },
      data: updatedData,
    });

    return updatedModule;
  }

  async remove(id: string) {
    const existModule = await this.prisma.module.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existModule) {
      throw new AppError('Module not found.', 404);
    }

    const module = await this.prisma.module.update({
      where: { id: existModule.id },
      data: { deletedAt: new Date(), status: false },
    });

    return module;
  }
}
