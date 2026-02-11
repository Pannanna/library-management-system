import { Borrower } from "../models/borrower";

export type LoanRecord<T> = {
  item: T;
  borrower: Borrower;
  borrowedAt: Date;
  returnedAt?: Date;
};

export class LoanManager<T extends { id: number; isBorrowed: boolean }> {
  private loans: Map<number, LoanRecord<T>> = new Map();

  loan(item: T, borrower: Borrower): void {
    if (item.isBorrowed) {
      throw new Error("A tétel már kölcsön van adva.");
    }
    item.isBorrowed = true;

    this.loans.set(item.id, {
      item,
      borrower,
      borrowedAt: new Date()
    });
  }

  returnItem(item: T): void {
    const record = this.loans.get(item.id);
    if (!record || record.returnedAt) {
      throw new Error("Nincs aktív kölcsönzés ehhez a tételhez.");
    }

    item.isBorrowed = false;
    record.returnedAt = new Date();
  }

  getActiveLoans(): Array<LoanRecord<T>> {
    return Array.from(this.loans.values()).filter(l => !l.returnedAt);
  }
}