import { fakerKO as faker } from "@faker-js/faker";
import { Board } from "../board";
export function requestBoard(page: number): Board[] {
  const result = Array.from(
    { length: 10 },
    (_, index) =>
      new Board(
        faker.lorem.sentence({ min: 5, max: 10 }),
        faker.lorem.sentence({ min: 30, max: 100 }),
        faker.image.url(),
        "2025.01.14"
      )
  );
  return result;
}
