import { Library } from "./services/library";
import { Fiction, Science } from "./models/category";
import { FictionBook, ScienceBook } from "./models/book";
import { isBook } from "./utils/typeGuards";

async function main() {
  const library = new Library();

  library.addBorrower({ id: 1, name: "Anna" });
  library.addBorrower({ id: 2, name: "Béla" });

  const fictionCategory = new Fiction("Fiction", "Fantasy");
  const scienceCategory = new Science("Science", "Physics");

  library.addBook(new FictionBook(10, "A Gyűrűk Ura", "Tolkien", fictionCategory));
  library.addBook(new ScienceBook(11, "Relativity", "Einstein", scienceCategory));

  library.loanBook(10, 1);

  const borrowed = library.findBooksByBorrowStatus(true);
  console.log("Kölcsönzött könyvek:", borrowed.map(b => b.title));

  const results = library.searchByNameOrTitle("A");
  for (const r of results) {
    if (isBook(r)) console.log("Talált könyv:", r.title);
    else console.log("Talált kölcsönző:", r.name);
  }

  const activeLoans = await library.getActiveLoansAsync();
  console.log("Aktív kölcsönzések:", activeLoans);
}

main();