import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';

interface Loan {
  id: number;
  name: string;
  borrower: string;
  lender: string;
  amount: number;
  status: 'Pending' | 'Signed' | 'Settled';
}

@Injectable()
export class LoanService {
  private loans: Loan[] = [];
  private idCounter = 1;

  findAll(): Loan[] {
    return this.loans;
  }

  create(dto: CreateLoanDto): Loan {
    const newLoan: Loan = {
      id: this.idCounter++,
      ...dto,
      status: 'Pending',
    };
    this.loans.push(newLoan);
    return newLoan;
  }

  sign(id: number): Loan | string {
    const loan = this.loans.find(l => l.id === id);
    if (loan && loan.status === 'Pending') {
      loan.status = 'Signed';
      return loan;
    }
    return 'Cannot sign this loan';
  }

  settle(id: number): Loan | string {
    const loan = this.loans.find(l => l.id === id);
    if (loan && loan.status === 'Signed') {
      loan.status = 'Settled';
      return loan;
    }
    return 'Cannot settle this loan';
  }
}