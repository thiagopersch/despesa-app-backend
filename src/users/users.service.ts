import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({
      data: { createdAt: new Date(), ...data },
    });
  }

  findAll() {
    return this.prisma.user.findMany({ where: { deletedAt: null } });
  }

  findOne(id: string) {
    const user = this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return user;
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
