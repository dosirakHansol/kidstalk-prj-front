import useApi from "./client";
import { RequestMethod } from "./Request";
import { ResponseSuccess } from "./Response";

const BASE_ENDPOINT = (path: string) => `/like${path}`;

const CREATE_OR_REMOVE = BASE_ENDPOINT("/board");

export const requestLike = async (body: any): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  console.log(body.type);
  if (body.type) {
    return await fetchData(CREATE_OR_REMOVE, RequestMethod.DELETE, {
      boardId: body.boardId,
    });
  }
  return await fetchData(CREATE_OR_REMOVE, RequestMethod.POST, {
    boardId: body.boardId,
  });
};
