import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Get()
  findAll() {
    return this.loanService.findAll();
  }

  @Post()
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loanService.create(createLoanDto);
  }

  @Post(':id/sign')
  sign(@Param('id') id: string) {
    return this.loanService.sign(+id);
  }

  @Post(':id/settle')
  settle(@Param('id') id: string) {
    return this.loanService.settle(+id);
  }
}