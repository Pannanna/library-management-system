import { LoanManager } from "../src/services/loanManager";

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

type DummyItem = {
  id: number;
  isBorrowed: boolean;
  name: string;
};

(() => {
  const manager = new LoanManager<DummyItem>();

  const item: DummyItem = {
    id: 1,
    isBorrowed: false,
    name: "Item1"
  };

  const borrower = { id: 1, name: "Tester" };

  manager.loan(item, borrower);
  assert(item.isBorrowed === true, "Kölcsönzés után true kell legyen");

  manager.returnItem(item);
  assert(item.isBorrowed === false, "Visszavétel után false kell legyen");

  console.log("loanManager.test.ts OK");
})();