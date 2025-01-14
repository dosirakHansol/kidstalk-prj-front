import { IBoard } from "../interfaces/IBoard";

export class Board implements IBoard {
  title: string;
  content: string;
  imagePath: string;
  createdAt: string;

  constructor(
    title: string,
    content: string,
    imagePath: string,
    createdAt: string
  ) {
    this.title = title;
    this.content = content;
    this.imagePath = imagePath;
    this.createdAt = createdAt;
  }
}
