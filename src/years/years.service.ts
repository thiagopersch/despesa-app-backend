import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateYearDto } from './dto/create-year.dto';
import { UpdateYearDto } from './dto/update-year.dto';

@Injectable()
export class YearsService {
  constructor(private prisma: PrismaService) {}

  async create(createYearDto: CreateYearDto) {
    const existYear = await this.prisma.year.findUnique({
      where: { year: createYearDto.year },
      select: { year: true },
    });

    if (existYear) {
      throw new AppError('Year already exists', 400);
    }

    const year = await this.prisma.year.create({
      data: { ...createYearDto },
    });

    return year;
  }

  async findAll() {
    const year = await this.prisma.year.findMany({
      where: { deletedAt: null },
    });

    return year;
  }

  async findOne(id: string) {
    const year = await this.prisma.year.findUnique({
      where: { id },
    });
    return year;
  }

  async update(id: string, updateYearDto: UpdateYearDto) {
    const year = await this.findOne(id);

    let updatedData = { ...updateYearDto };

    const updateYear = await this.prisma.year.update({
      where: { id: year.id },
      data: updatedData,
    });

    return updateYear;
  }

  async remove(id: string) {
    const existYear = await this.prisma.year.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existYear) {
      throw new AppError('Year not found.', 404);
    }

    const year = await this.prisma.year.update({
      where: { id },
      data: { deletedAt: new Date(), status: false },
    });
    return year;
  }
}
