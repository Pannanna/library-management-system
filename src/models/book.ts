import { Category } from "./category";

export interface Book {
  id: number;
  title: string;
  author: string;
  category: Category;
  isBorrowed: boolean;
}

export abstract class BaseBook implements Book {
  public isBorrowed: boolean = false;

  constructor(
    public id: number,
    public title: string,
    public author: string,
    public category: Category
  ) {}

  abstract getType(): string;
}

export class FictionBook extends BaseBook {
  getType(): string {
    return "Fiction";
  }
}

export class ScienceBook extends BaseBook {
  getType(): string {
    return "Science";
  }
}