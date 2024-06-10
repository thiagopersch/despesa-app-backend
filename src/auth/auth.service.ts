// auth.service.ts

import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: CreateAuthDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });
    return user;
  }

  async updateUser(userData: UpdateAuthDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.prisma.user.update({
      where: { id: userData.id },
      data: { ...userData, password: hashedPassword },
    });
    return user;
  }

  async validateUser(login: string, password: string): Promise<User> {
    if (!login || !password) {
      throw new AppError('Invalid credentials', 401);
    }

    const user = await this.prisma.user.findUnique({
      where: { login },
    });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }
    return user;
  }
}
