import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTypeAccountDto } from './dto/create-type_account.dto';
import { UpdateTypeAccountDto } from './dto/update-type_account.dto';
import { TypeAccountsService } from './type_accounts.service';

@Controller('type-accounts')
export class TypeAccountsController {
  constructor(private readonly typeAccountsService: TypeAccountsService) {}

  @Post()
  create(@Body() createTypeAccountDto: CreateTypeAccountDto) {
    return this.typeAccountsService.create(createTypeAccountDto);
  }

  @Get()
  findAll() {
    return this.typeAccountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeAccountsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeAccountDto: UpdateTypeAccountDto,
  ) {
    return this.typeAccountsService.update(id, updateTypeAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeAccountsService.remove(id);
  }
}
