import useApi from "./client";
import { RequestMethod } from "./Request";
import { ResponseSuccess } from "./Response";

const BASE_ENDPOINT = (path: string) => `/board${path}`;

const CREATE = BASE_ENDPOINT("/create");
const LIST = (page: number, writerId?: number) =>
  BASE_ENDPOINT(
    writerId ? `?page=${page}&writerId=${writerId}` : `?page=${page}`
  );
const DETAIL = (id: number) => BASE_ENDPOINT(`/${id}`);
const COUNT = (writerId?: number) =>
  BASE_ENDPOINT(writerId ? `/count/all?writerId=${writerId}` : `/count/all`);

export const requestCreate = async (board: any): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  return await fetchData(CREATE, RequestMethod.POST, board);
};

export const requestList = async (
  params: any,
  writerId: any
): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();
  const boardCount = await fetchData(COUNT(writerId), RequestMethod.GET);
  console.log(JSON.stringify(params));
  console.log(LIST(params.pageParam, writerId));
  const boardList = await fetchData(
    LIST(params.pageParam, writerId),
    RequestMethod.GET
  );
  // console.log({
  //   ...boardList,
  //   data: {
  //     ...boardList.data,
  //     totalCount: boardCount.data.listCount,
  //     currentPage: pageParam,
  //     totalPage: Math.ceil(boardCount.data.listCount / 10),
  //   },
  // });
  return {
    ...boardList,
    data: {
      ...boardList.data,
      totalCount: boardCount.data.listCount,
      currentPage: params.pageParam,
      totalPage: Math.ceil(boardCount.data.listCount / 10),
    },
  };
};

export const requestDetail = async (id: number): Promise<ResponseSuccess> => {
  const { fetchData } = useApi();

  return await fetchData(DETAIL(id), RequestMethod.GET);
};
