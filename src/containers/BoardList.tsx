import styled from "styled-components";
import { Card, Avatar, Carousel, Spin, Image } from "antd";
import { useEffect, useState } from "react";
import {
  CommentOutlined,
  ShareAltOutlined,
  LikeFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { requestBoard } from "../data/test/board";
import { Board } from "../domains/Board/board";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { requestList } from "../api/board";
import Link from "next/link";
import { requestLike } from "../api/like";
import { useInView } from "react-intersection-observer";
import { produce } from "immer";

const SBoardList = styled.div`
  width: 100%;
  height: 100%;
  & a {
    text-decoration: none; /* 밑줄 제거 */
    color: inherit; /* 부모 요소의 색상 상속 */
  }
`;

const BoardUserForm = styled.div`
  display: flex;
  align-items: center;
`;
const BoardUserAvatar = styled(Avatar)``;
const BoardUserInfo = styled.div`
  margin-left: 10px;
`;
const BoardUserCreatedAt = styled.span`
  display: block;
  color: #aaa;
  margin-left: 5px;
`;

const BoardTitle = styled.div`
  text-align: left;
  margin-top: 10px;
  font-weight: 600;
`;
const BoardBody = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  text-align: left;
  margin-top: 5px;
  white-space: pre-wrap;
`;
const BoardImageForm = styled.div`
  margin: 10px 0px 0px 0px;
  width: 100%;
  height: auto;
  padding: 5px;
`;
const BoardImage = styled(Image)`
  border-radius: 5px;
  min-height: 100px;
  max-height: 400px;
  width: 100%;
  object-fit: cover;
  padding: 5px;
`;
const LikesForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.on {
    color: dodgerblue;
  }
  & > span {
    margin-left: 5px;
  }
`;

const cardStyle: React.CSSProperties = {
  marginBottom: "5px",
};

export const BoardList = () => {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["boardList", page],
  //   queryFn: () => requestList(page),
  // });

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
      console.log("들어옴");
      !isFetching && hasNextPage && fetchNextPage();
    }

    console.log(data);
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

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
            <Card
              style={cardStyle}
              loading={isLoading}
              key={board.id}
              actions={[
                <LikesForm
                  className={board.isLiked ? "on" : ""}
                  onClick={() => onSubmitLiked(board.isLiked, board.id)}
                >
                  <LikeFilled key={`like_${board.id}`} />
                  <span>{board.likesCount}</span>
                </LikesForm>,
                <Link href={`/board/${board.id}?type=comment`}>
                  <CommentOutlined key={`message_${board.id}`} />
                </Link>,
                <ShareAltOutlined key={`share_${board.id}`} />,
              ]}
            >
              <Link href={`/board/${board.id}`}>
                <BoardUserForm>
                  <BoardUserAvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  <BoardUserInfo>{board.member.name}</BoardUserInfo>
                  <BoardUserCreatedAt>1일전</BoardUserCreatedAt>
                </BoardUserForm>
                <BoardTitle>{board.title}</BoardTitle>
                <BoardBody>{board.description}</BoardBody>
              </Link>
              <BoardImageForm>
                <Carousel draggable>
                  {board.fileList?.map((image: any) => (
                    <BoardImage
                      key={image.id}
                      alt="example"
                      src={"http://localhost:4040" + image.filePath}
                    />
                  ))}
                </Carousel>
              </BoardImageForm>
            </Card>
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
