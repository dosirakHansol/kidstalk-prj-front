import useApi from "./client";
import { RequestMethod } from "./Request";
import { ResponseSuccess } from "./Response";

const BASE_ENDPOINT = (path: string) => `/comment${path}`;

const CREATE = BASE_ENDPOINT("/create");
const LIST = (boardId: number) => BASE_ENDPOINT(`/list?boardId=${boardId}`);

export const createComment = async (body: any): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  return await fetchData(CREATE, RequestMethod.POST, body);
};

export const requestCommentList = async (
  boardId: number
): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  return await fetchData(LIST(boardId), RequestMethod.GET);
};
