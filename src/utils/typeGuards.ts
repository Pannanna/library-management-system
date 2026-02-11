import { Book } from "../models/book";
import { Borrower } from "../models/borrower";
import { SearchResult } from "../models/types";

export function isBook(result: SearchResult): result is Book {
  return (result as Book).title !== undefined;
}

export function isBorrower(result: SearchResult): result is Borrower {
  return (result as Borrower).name !== undefined && (result as any).title === undefined;
}