import useApi from "./client";
import { RequestMethod } from "./Request";
import { ResponseSuccess } from "./Response";

const BASE_ENDPOINT = (path: string) => `/board${path}`;

const CREATE = BASE_ENDPOINT("/create");
const LIST = (page: number) => BASE_ENDPOINT(`?page=${page}`);

export const requestCreate = async (board: any): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  return await fetchData(CREATE, RequestMethod.POST, board);
};

export const requestList = async (page: number): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  return await fetchData(LIST(page), RequestMethod.GET);
};
