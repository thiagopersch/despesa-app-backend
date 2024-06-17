import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreatePriorityDto } from './dto/create-priority.dto';
import { UpdatePriorityDto } from './dto/update-priority.dto';

@Injectable()
export class PrioritiesService {
  constructor(private prisma: PrismaService) {}

  async create(createPriorityDto: CreatePriorityDto) {
    const existPriority = await this.prisma.priority.findUnique({
      where: { name: createPriorityDto.name },
      select: { name: true },
    });

    if (existPriority) {
      throw new AppError('Priority already exists', 400);
    }

    const priority = await this.prisma.priority.create({
      data: { ...createPriorityDto },
    });

    return priority;
  }

  async findAll() {
    const priority = this.prisma.priority.findMany({
      where: { deletedAt: null },
    });
    return priority;
  }

  async findOne(id: string) {
    const priority = this.prisma.priority.findUnique({
      where: { id },
    });

    if (!priority) {
      throw new AppError('Priority not found.', 404);
    }

    return priority;
  }

  async update(id: string, updatePriorityDto: UpdatePriorityDto) {
    const priority = await this.findOne(id);

    let updatedData = { ...updatePriorityDto };

    const existPriority = await this.prisma.priority.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existPriority) {
      throw new AppError('Priority not found.', 404);
    }

    const updatedPriority = await this.prisma.priority.update({
      where: { id: priority.id },
      data: updatedData,
    });

    return updatedPriority;
  }

  async remove(id: string) {
    const existPriority = await this.prisma.priority.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existPriority) {
      throw new AppError('Priority not found.', 404);
    }

    const priority = this.prisma.priority.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return priority;
  }
}
