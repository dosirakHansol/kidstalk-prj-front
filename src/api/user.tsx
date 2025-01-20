import { useQuery } from "@tanstack/react-query";
import { IBasicUser } from "../domains/User/user";
import useApi from "./client";
import { RequestMethod } from "./requestMethods";

const BASE_ENDPOINT = (path: string) => `/member/${path}`;

const SIGN_UP = BASE_ENDPOINT("signup");

export const signUp = async (user: IBasicUser): Promise<IBasicUser> => {
  const { fetchData } = useApi();
  return await fetchData(SIGN_UP, RequestMethod.POST, false, user);
};
