import { ITopic } from "../domains/Topic/topic";
import useApi from "./client";
import { RequestMethod } from "./Request";
import { ResponseSuccess } from "./Response";

const BASE_ENDPOINT = (path: string) => `/topic${path}`;

const CREATE = BASE_ENDPOINT("/create");
const SELECT = BASE_ENDPOINT("?page=0");
export const createTopic = async (form: ITopic): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  return await fetchData(CREATE, RequestMethod.POST, form);
};

export const fetchTopic = async (): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  const response = await fetchData(SELECT, RequestMethod.GET);

  return response;
};
