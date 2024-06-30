import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(createProfileDto: CreateProfileDto) {
    const existProfile = await this.prisma.profile.findUnique({
      where: { code: createProfileDto.code },
      select: { code: true },
    });

    if (existProfile) {
      throw new AppError('Profile already exists', 400);
    }

    const profile = this.prisma.profile.create({
      data: { ...createProfileDto },
    });

    return profile;
  }

  async findAll() {
    const profile = await this.prisma.profile.findMany({
      where: { deletedAt: null },
    });

    return profile;
  }

  async findOne(id: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id },
    });

    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.findOne(id);

    let updatedData = { ...updateProfileDto };

    const updatedProfile = await this.prisma.profile.update({
      where: { id: profile.id },
      data: updatedData,
    });

    return updatedProfile;
  }

  async remove(id: string) {
    const existProfile = await this.prisma.profile.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existProfile) {
      throw new AppError('Profile not found', 404);
    }

    const profile = await this.prisma.profile.update({
      where: { id: existProfile.id },
      data: { deletedAt: new Date(), status: false },
    });

    return profile;
  }
}
