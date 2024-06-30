import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateTypeAccountDto } from './dto/create-type_account.dto';
import { UpdateTypeAccountDto } from './dto/update-type_account.dto';

@Injectable()
export class TypeAccountsService {
  constructor(private prisma: PrismaService) {}

  async create(createTypeAccountDto: CreateTypeAccountDto) {
    const existTypeAccount = await this.prisma.type_accounts.findUnique({
      where: { bank_name: createTypeAccountDto.bank_name },
      select: { bank_name: true },
    });
    if (existTypeAccount) {
      throw new AppError('Type Account already exists', 400);
    }

    const typeAccount = await this.prisma.type_accounts.create({
      data: { ...createTypeAccountDto },
    });
    return typeAccount;
  }

  async findAll() {
    const typeAccount = await this.prisma.type_accounts.findMany({
      where: { deletedAt: null },
    });
    return typeAccount;
  }

  async findOne(id: string) {
    const typeAccount = await this.prisma.type_accounts.findUnique({
      where: { id },
    });
    return typeAccount;
  }

  async update(id: string, updateTypeAccountDto: UpdateTypeAccountDto) {
    const typeAccount = await this.findOne(id);

    let updatedData = { ...updateTypeAccountDto };

    const updateTypeAccount = await this.prisma.type_accounts.update({
      where: { id: typeAccount.id },
      data: updatedData,
    });

    return updateTypeAccount;
  }

  async remove(id: string) {
    const existTypeAccount = await this.prisma.type_accounts.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existTypeAccount) {
      throw new AppError('Type Account not found.', 404);
    }

    const typeAccount = await this.prisma.type_accounts.update({
      where: { id: existTypeAccount.id },
      data: { deletedAt: new Date(), status: false },
    });

    return typeAccount;
  }
}
