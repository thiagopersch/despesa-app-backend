import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';

@Injectable()
export class PaymentMethodsService {
  constructor(private prisma: PrismaService) {}

  async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    const existPaymentMethods = await this.prisma.payment_methods.findUnique({
      where: {
        name: createPaymentMethodDto.name,
      },
      select: { name: true },
    });

    if (existPaymentMethods) {
      throw new AppError('Payment Method already exists', 400);
    }

    const paymentMethod = await this.prisma.payment_methods.create({
      data: { ...createPaymentMethodDto },
    });

    return paymentMethod;
  }

  async findAll() {
    const paymentMethod = await this.prisma.payment_methods.findMany({
      where: { deletedAt: null },
    });

    return paymentMethod;
  }

  async findOne(id: string) {
    const paymentMethod = await this.prisma.payment_methods.findUnique({
      where: { id },
    });

    return paymentMethod;
  }

  async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    const paymentMethod = await this.findOne(id);

    let updatedData = { ...updatePaymentMethodDto };

    const updatePaymentMethod = await this.prisma.payment_methods.update({
      where: { id: paymentMethod.id },
      data: updatedData,
    });

    return updatePaymentMethod;
  }

  async remove(id: string) {
    const existPaymentMethods = await this.prisma.payment_methods.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existPaymentMethods) {
      throw new AppError('Payment Method not found.', 404);
    }

    const paymentMethod = this.prisma.payment_methods.update({
      where: { id },
      data: { deletedAt: new Date(), status: false },
    });

    return paymentMethod;
  }
}
