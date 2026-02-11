import { Book } from "./book";
import { Borrower } from "./borrower";

export type SearchResult = Book | Borrower;

export type WithCreatedAt<T> = T & { createdAt: Date };