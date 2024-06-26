import { Injectable } from '@nestjs/common';
import { Month } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateMonthDto } from './dto/create-month.dto';
import { UpdateMonthDto } from './dto/update-month.dto';

@Injectable()
export class MonthsService {
  constructor(private prisma: PrismaService) {}

  async create(createMonthDto: CreateMonthDto) {
    const existMonth = await this.prisma.month.findUnique({
      where: { name: createMonthDto.name },
      select: { name: true },
    });

    if (existMonth) {
      throw new AppError('Month already exists', 400);
    }

    const month = await this.prisma.month.create({
      data: { ...createMonthDto },
    });
    return month;
  }

  async findAll(): Promise<Month[]> {
    const month = await this.prisma.month.findMany({
      where: { deletedAt: null },
    });

    return month;
  }

  async findOne(id: string) {
    const month = await this.prisma.month.findUnique({
      where: { id },
    });
    return month;
  }

  async update(id: string, updateMonthDto: UpdateMonthDto) {
    const month = await this.findOne(id);

    let updatedData = { ...updateMonthDto };

    const updatedMonth = await this.prisma.month.update({
      where: { id: month.id },
      data: updatedData,
    });
    return updatedMonth;
  }

  async remove(id: string) {
    const existMonth = await this.prisma.month.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existMonth) {
      throw new AppError('Month not found.', 404);
    }

    const month = await this.prisma.month.update({
      where: { id },
      data: { deletedAt: new Date(), status: false },
    });

    return month;
  }
}
