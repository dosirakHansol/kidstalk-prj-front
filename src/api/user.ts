import { IBasicUser, IUserLogin } from "../domains/User/user";
import useApi from "./client";
import { RequestMethod } from "./Request";
import { ResponseSuccess } from "./Response";

const BASE_ENDPOINT = (path: string) => `/member${path}`;

const SIGN_UP = BASE_ENDPOINT("/signup");
const SIGN_IN = BASE_ENDPOINT("/signin");
const INFO_COUNT = BASE_ENDPOINT("/info/count");

export const signUp = async (user: IBasicUser): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  return await fetchData(SIGN_UP, RequestMethod.POST, user);
};

export const signIn = async (user: IUserLogin): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  return await fetchData(SIGN_IN, RequestMethod.POST, user);
};
export const requestUserInfoCount = async (): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  return await fetchData(INFO_COUNT, RequestMethod.GET);
};
