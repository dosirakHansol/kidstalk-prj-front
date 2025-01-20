import { useQuery } from "@tanstack/react-query";
import { IBasicUser, IUserLogin } from "../domains/User/user";
import useApi from "./client";
import { RequestMethod } from "./Request";
import { ResponseSuccess } from "./Response";

const BASE_ENDPOINT = (path: string) => `/member/${path}`;

const SIGN_UP = BASE_ENDPOINT("signup");
const SIGN_IN = BASE_ENDPOINT("signin");

export const signUp = async (user: IBasicUser): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  return await fetchData(SIGN_UP, RequestMethod.POST, false, user);
};

export const signIn = async (user: IUserLogin): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  return await fetchData(SIGN_IN, RequestMethod.POST, false, user);
};
