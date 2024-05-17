import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: CreateAuthDto) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });

    return user;
  }

  async updateUser(userData: UpdateAuthDto) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return this.prisma.user.update({
      where: { id: userData.id },
      data: { ...userData, password: hashedPassword },
    });
  }

  async validateUser(credentials: { login: string; password: string }) {
    const user = await this.prisma.user.findFirst({
      where: { login: credentials.login },
    });

    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) {
      throw new AppError('password invalid.');
    }

    return user;
  }
}
