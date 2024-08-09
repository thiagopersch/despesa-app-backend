import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  id?: string;
  userId: string;
  paymentMethodId: string;
  priorityId: string;
  monthId: string;
  yearId: string;
  categoryId: string;
  tagsId: string;
  typeAccountId: string;
  situationId: string;
  name: string;
  description?: string;
  amount_to_pay: number;
  amount_paid: number;
  pay_day: string;
  due_date: string;
  fixed_expense: boolean;
  repeat: boolean;
  number_repeat: string;
}
