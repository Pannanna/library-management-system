import { Library } from "../src/services/library";
import { Fiction } from "../src/models/category";
import { FictionBook } from "../src/models/book";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

(() => {
  const library = new Library();

  library.addBorrower({ id: 1, name: "Test User" });

  const category = new Fiction("Fiction", "Drama");
  const book = new FictionBook(1, "Test Book", "Test Author", category);

  library.addBook(book);

  library.loanBook(1, 1);

  const borrowed = library.findBooksByBorrowStatus(true);
  assert(borrowed.length === 1, "1 könyvnek kölcsönzöttnek kell lennie");

  library.returnBook(1);

  const available = library.findBooksByBorrowStatus(false);
  assert(available.length === 1, "Visszavétel után elérhetőnek kell lennie");

  console.log("library.test.ts OK");
})();