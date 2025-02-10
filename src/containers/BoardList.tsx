import styled from "styled-components";
import { Card, Spin } from "antd";
import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { requestList } from "../api/board";

import { requestLike } from "../api/like";
import { useInView } from "react-intersection-observer";
import { produce } from "immer";
import { CBoard } from "../components/CBoard";

const SBoardList = styled.div`
  width: 100%;
  height: 100%;
  & a {
    text-decoration: none; /* 밑줄 제거 */
    color: inherit; /* 부모 요소의 색상 상속 */
  }
`;

export const BoardList = () => {
  const queryClient = useQueryClient();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["boardList"],
    queryFn: requestList,
    initialPageParam: 0, // [[1,2,3,4,5],[6,7,8,9,10]] 2차원배열로 들어옴
    //  백엔드에 마지막 글인경우, nextCursor가 -1로 나오도록 하기
    getNextPageParam: (lastPage, pages) => {
      // console.log(JSON.stringify(lastPage!.data.boards));

      // console.log("pages", pages);
      return lastPage.data.boards.length === 0 ? undefined : pages.length;
    },
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0.9,
    delay: 0.6,
  });

  useEffect(() => {
    // 화면에 밑에 ref부분이 보이면

    if (inView) {
      if (!isFetching && !isFetchingNextPage && hasNextPage) {
        console.log("들어옴");
      }

      !isFetching && !isFetchingNextPage && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const mutation = useMutation({
    mutationKey: ["boardLike"],
    mutationFn: requestLike,
    onSuccess: (response, request) => {
      if (response.message === "게시글 좋아요 취소 성공") {
        queryClient.setQueryData(["boardList"], (prevData: any) => {
          return produce(prevData, (draft: any) => {
            draft.pages.map((group: any, groupIndex: any) => {
              group.data.boards.map((board: any, boardIndex: any) => {
                if (board.id === request.boardId) {
                  board.isLiked = !board.isLiked;
                  board.likesCount = Number(board.likesCount) - 1;
                }
              });
            });
          });
        });
      }

      if (response.message === "게시글 좋아요 성공") {
        queryClient.setQueryData(["boardList"], (prevData: any) => {
          queryClient.setQueryData(["boardList"], (prevData: any) => {
            return produce(prevData, (draft: any) => {
              draft.pages.map((group: any, groupIndex: any) => {
                group.data.boards.map((board: any, boardIndex: any) => {
                  if (board.id === request.boardId) {
                    board.isLiked = !board.isLiked;
                    board.likesCount = Number(board.likesCount) + 1;
                  }
                });
              });
            });
          });
        });
      }
    },
  });

  const onSubmitLiked = (isLiked: boolean, boardId: number) => {
    console.log(isLiked);
    mutation.mutate({
      type: isLiked,
      boardId: boardId,
    });
  };

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries<any>(["boardList"]);
    };
  }, []);

  return (
    <SBoardList>
      <Card>
        {data?.pages.map((group: any) =>
          group.data.boards.map((board: any) => (
            <CBoard
              isLoading={isLoading}
              board={board}
              onSubmitLiked={onSubmitLiked}
            />
          ))
        )}

        {hasNextPage && (
          <Spin
            indicator={
              <LoadingOutlined
                ref={ref}
                style={{ fontSize: 48, marginTop: 10 }}
                spin
              />
            }
          />
        )}
      </Card>
    </SBoardList>
  );
};
