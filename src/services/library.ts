import { BaseBook } from "../models/book";
import { Borrower } from "../models/borrower";
import { Category } from "../models/category";
import { SearchResult, WithCreatedAt } from "../models/types";
import { Repository } from "./repository";
import { LoanManager } from "./loanManager";

export class Library {
  private bookRepo = new Repository<BaseBook>();
  private borrowerRepo = new Repository<Borrower>();
  private loanManager = new LoanManager<BaseBook>();

  addBook(book: BaseBook): void {
    this.bookRepo.add(book);
  }

  updateBook(book: BaseBook): void {
    this.bookRepo.update(book);
  }

  removeBook(id: number): void {
    this.bookRepo.remove(id);
  }

  addBorrower(borrower: Borrower): void {
    this.borrowerRepo.add(borrower);
  }

  updateBorrower(borrower: Borrower): void {
    this.borrowerRepo.update(borrower);
  }

  removeBorrower(id: number): void {
    this.borrowerRepo.remove(id);
  }

  loanBook(bookId: number, borrowerId: number): void {
    const book = this.bookRepo.getById(bookId);
    const borrower = this.borrowerRepo.getById(borrowerId);

    if (!book) throw new Error("Nincs ilyen könyv.");
    if (!borrower) throw new Error("Nincs ilyen kölcsönző.");

    this.loanManager.loan(book, borrower);
  }

  returnBook(bookId: number): void {
    const book = this.bookRepo.getById(bookId);
    if (!book) throw new Error("Nincs ilyen könyv.");

    this.loanManager.returnItem(book);
  }

  findBooksByAuthor(author: string): BaseBook[] {
    return this.bookRepo.getAll().filter(b => b.author === author);
  }

  findBooksByCategory(category: Category): BaseBook[] {
    return this.bookRepo.getAll().filter(b => b.category.name === category.name);
  }

  findBooksByBorrowStatus(isBorrowed: boolean): BaseBook[] {
    return this.bookRepo.getAll().filter(b => b.isBorrowed === isBorrowed);
  }

  searchByNameOrTitle(query: string): SearchResult[] {
    const books = this.bookRepo.getAll().filter(b => b.title.includes(query));
    const borrowers = this.borrowerRepo.getAll().filter(p => p.name.includes(query));
    return [...books, ...borrowers];
  }

  getBorrowersWithCreatedAt(): Array<WithCreatedAt<Borrower>> {
    return this.borrowerRepo.getAll().map(b => ({ ...b, createdAt: new Date() }));
  }

  async getActiveLoansAsync(): Promise<string[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const result = this.loanManager.getActiveLoans().map(
          l => `${l.borrower.name} -> ${l.item.title}`
        );
        resolve(result);
      }, 10);
    });
  }
}