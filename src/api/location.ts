import useApi from "./client";
import { RequestMethod } from "./Request";
import { ResponseSuccess } from "./Response";

const BASE_ENDPOINT = (path: string) => `/location${path}`;

const ALL = BASE_ENDPOINT("/all");

export const requestLocations = async (): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  return await fetchData(ALL, RequestMethod.GET);
};
