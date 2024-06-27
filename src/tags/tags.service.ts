import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    const existTags = await this.prisma.tags.findUnique({
      where: { name: createTagDto.name },
      select: { name: true },
    });
    if (existTags) {
      throw new AppError('Tag already exists', 400);
    }

    const tag = await this.prisma.tags.create({
      data: { ...createTagDto },
    });
    return tag;
  }

  async findAll() {
    const tag = await this.prisma.tags.findMany({
      where: { deletedAt: null },
    });

    return tag;
  }

  async findOne(id: string) {
    const tag = await this.prisma.tags.findUnique({
      where: { id },
    });
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const tag = await this.findOne(id);

    let updatedData = { ...updateTagDto };

    const updatedTag = await this.prisma.tags.update({
      where: { id: tag.id },
      data: updatedData,
    });
    return updatedTag;
  }

  async remove(id: string) {
    const existTag = await this.prisma.tags.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existTag) {
      throw new AppError('tag not found.', 404);
    }

    const tags = await this.prisma.tags.update({
      where: { id },
      data: { deletedAt: new Date(), status: false },
    });

    return tags;
  }
}
