import { Module } from '@nestjs/common';
import { TypeAccountsService } from './type_accounts.service';
import { TypeAccountsController } from './type_accounts.controller';

@Module({
  controllers: [TypeAccountsController],
  providers: [TypeAccountsService],
})
export class TypeAccountsModule {}
