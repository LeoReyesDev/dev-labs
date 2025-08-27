import { IsString, IsNumber } from 'class-validator';

export class CreateLoanDto {
  @IsString()
  name: string;

  @IsString()
  borrower: string;

  @IsString()
  lender: string;

  @IsNumber()
  amount: number;
}