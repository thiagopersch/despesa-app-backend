import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return await this.expensesService.create(createExpenseDto);
  }

  @Get()
  async findAll() {
    return await this.expensesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.expensesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return await this.expensesService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.expensesService.remove(id);
  }
}
