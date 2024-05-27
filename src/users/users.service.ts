import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userData: CreateUserDto) {
    const existUser = await this.prisma.user.findUnique({
      where: { login: userData.login },
      select: { login: true },
    });

    if (existUser) {
      throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });

    return user;
  }
  findAll() {
    return this.prisma.user.findMany({ where: { deletedAt: null } });
  }

  findOne(id: string) {
    const user = this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOne(id);

    /* if (data.login && data.login !== user.login) {
      const existUser = await this.prisma.user.findUnique({
        where: { login: data.login },
        select: { login: true },
      });
      if (existUser) {
        throw new AppError('User with this login already exists', 400);
      }
    } */

    let updateData = { ...data };

    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateData = { ...updateData, password: hashedPassword };
    }

    const existUser = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existUser) {
      throw new AppError('User not found.', 404);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    console.log('User updated:', updatedUser);
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
