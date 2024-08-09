import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateSituationDto } from './dto/create-situation.dto';
import { UpdateSituationDto } from './dto/update-situation.dto';

@Injectable()
export class SituationsService {
  constructor(private prisma: PrismaService) {}

  async create(createSituationDto: CreateSituationDto) {
    const existSituation = await this.prisma.situation.findUnique({
      where: { name: createSituationDto.name },
      select: { name: true },
    });

    if (existSituation) {
      throw new AppError('Situation already exists', 400);
    }

    const situation = await this.prisma.situation.create({
      data: { ...createSituationDto },
    });

    return situation;
  }

  async findAll() {
    const situation = this.prisma.situation.findMany({
      where: { deletedAt: null },
    });
    return situation;
  }

  async findOne(id: string) {
    const situation = this.prisma.situation.findUnique({
      where: { id },
    });
    return situation;
  }

  async update(id: string, updateSituationDto: UpdateSituationDto) {
    const situation = await this.findOne(id);

    let updatedData = { ...updateSituationDto };

    const updatedSituation = await this.prisma.situation.update({
      where: { id: situation.id },
      data: updatedData,
    });

    return updatedSituation;
  }

  async remove(id: string) {
    const existSituation = await this.prisma.situation.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existSituation) {
      throw new AppError('Situation not found.', 404);
    }

    const situation = this.prisma.situation.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return situation;
  }
}
