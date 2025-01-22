import { ITopic } from "../domains/Topic/topic";
import useApi from "./client";
import { RequestMethod } from "./Request";
import { ResponseSuccess } from "./Response";

const BASE_ENDPOINT = (path: string) => `/topic${path}`;

const CREATE = BASE_ENDPOINT("/create");

export const createTopic = async (form: ITopic): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  return await fetchData(CREATE, RequestMethod.POST, form);
};
