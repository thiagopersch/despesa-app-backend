import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: {
    name: string;
    login: string;
    password: string;
  }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });
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

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) {
      throw new Error('Senha inválida');
    }

    return user;
  }
}
