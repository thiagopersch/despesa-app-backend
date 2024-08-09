import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import AppError from 'src/utils/appError';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const expense = await this.prisma.expense.create({
      data: {
        user: { connect: { id: createExpenseDto.user.id } },
        paymentMethod: { connect: { id: createExpenseDto.paymentMethod.id } },
        priority: { connect: { id: createExpenseDto.priority.id } },
        month: { connect: { id: createExpenseDto.month.id } },
        year: { connect: { id: createExpenseDto.year.id } },
        category: { connect: { id: createExpenseDto.category.id } },
        tags: { connect: { id: createExpenseDto.tags.id } },
        typeAccount: { connect: { id: createExpenseDto.typeAccount.id } },
        situation: { connect: { id: createExpenseDto.situation.id } },
        name: createExpenseDto.name,
        description: createExpenseDto.description,
        amount_to_pay: createExpenseDto.amount_to_pay,
        amount_paid: createExpenseDto.amount_paid,
        pay_day: createExpenseDto.pay_day,
        due_date: createExpenseDto.due_date,
        fixed_expense: createExpenseDto.fixed_expense,
        repeat: createExpenseDto.repeat,
        number_repeat: createExpenseDto.number_repeat,
      },
    });

    return expense;
  }

  async findAll() {
    const expenses = await this.prisma.expense.findMany({
      where: { deletedAt: null },
    });

    return expenses;
  }

  async findOne(id: string) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    });

    return expense;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.findOne(id);

    let updatedData = {
      ...updateExpenseDto,
    };

    const updatedExpense = await this.prisma.expense.update({
      where: { id: expense.id },
      data: {
        user: { connect: { id: updatedData.user.id } },
        paymentMethod: { connect: { id: updatedData.paymentMethod.id } },
        priority: { connect: { id: updatedData.priority.id } },
        month: { connect: { id: updatedData.month.id } },
        year: { connect: { id: updatedData.year.id } },
        category: { connect: { id: updatedData.category.id } },
        tags: { connect: { id: updatedData.tags.id } },
        typeAccount: { connect: { id: updatedData.typeAccount.id } },
        situation: { connect: { id: updatedData.situation.id } },
        name: updatedData.name,
        description: updatedData.description,
        amount_to_pay: updatedData.amount_to_pay,
        amount_paid: updatedData.amount_paid,
        pay_day: updatedData.pay_day,
        due_date: updatedData.due_date,
        fixed_expense: updatedData.fixed_expense,
        repeat: updatedData.repeat,
        number_repeat: updatedData.number_repeat,
      },
    });

    return updatedExpense;
  }

  async remove(id: string) {
    const existExpense = await this.prisma.expense.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existExpense) {
      throw new AppError('Expense not found.', 404);
    }

    const expense = await this.prisma.expense.update({
      where: { id: existExpense.id },
      data: { deletedAt: new Date() },
    });

    return expense;
  }
}
