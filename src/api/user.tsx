import { useQuery } from "@tanstack/react-query";
import { IBasicUser } from "../data/user";

const BASE_URL = (path: string) => `http://localhost:4040/member/${path}`;

const SIGN_UP = BASE_URL("signup");

export const signUp = async (user: IBasicUser): Promise<IBasicUser> => {
  const response = await fetch(SIGN_UP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  console.log(response);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
