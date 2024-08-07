export class CreateExpenseDto {
  id?: string;
  user: { id: string };
  paymentMethod: { id: string };
  priority: { id: string };
  month: { id: string };
  year: { id: string };
  category: { id: string };
  tags: { id: string };
  typeAccount: { id: string };
  situation: { id: string };
  name: string;
  description?: string;
  amount_to_pay: number;
  amount_paid: number;
  pay_day: string;
  due_date: string;
  fixed_expense: boolean;
  repeat: boolean;
  number_repeat: string;
  /* id?: string;
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
  number_repeat: string; */
}
