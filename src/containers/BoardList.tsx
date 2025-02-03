import styled from "styled-components";
import { Card, Avatar, Carousel } from "antd";
import { useEffect, useState } from "react";
import {
  CommentOutlined,
  ShareAltOutlined,
  LikeFilled,
} from "@ant-design/icons";
import { requestBoard } from "../data/test/board";
import { Board } from "../domains/Board/board";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { requestList } from "../api/board";
import Link from "next/link";
import { requestLike } from "../api/like";
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
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-align: left;
  margin-top: 5px;
`;
const BoardImageForm = styled.div`
  margin: 10px 0px 0px 0px;
  width: 100%;
  height: auto;
  padding: 5px;
`;
const BoardImage = styled.img`
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
  const { data, error, isLoading } = useQuery({
    queryKey: ["boardList", page],
    queryFn: () => requestList(page),
  });
  const mutation = useMutation({
    mutationKey: ["boardLike"],
    mutationFn: requestLike,
    onSuccess: (response, request) => {
      console.log(response);

      console.log(request);

      if (response.message === "게시글 좋아요 취소 성공") {
        queryClient.setQueryData(["boardList", page], (prevData: any) => {
          return {
            ...prevData,
            data: {
              ...prevData,
              boards: prevData.data.boards.map((prev: any) =>
                prev.id === request.boardId
                  ? {
                      ...prev,
                      isLiked: !prev.isLiked,
                      likesCount: Number(prev.likesCount) - 1,
                    }
                  : prev
              ),
            },
          };
        });
      }
      //localhost:4040//kidstalk_d859e2ad-d8c1-4966-b988-3e0434ecbfa0_1738303308923.png
      http: if (response.message === "게시글 좋아요 성공") {
        queryClient.setQueryData(["boardList", page], (prevData: any) => {
          return {
            ...prevData,
            data: {
              ...prevData,
              boards: prevData.data.boards.map((prev: any) =>
                prev.id === request.boardId
                  ? {
                      ...prev,
                      isLiked: !prev.isLiked,
                      likesCount: Number(prev.likesCount) + 1,
                    }
                  : prev
              ),
            },
          };
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
    // console.log(boards);
  }, []);
  return (
    <SBoardList>
      <Card>
        {data?.data?.boards.map((board: any) => (
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
              <CommentOutlined key={`message_${board.id}`} />,
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
            </Link>
          </Card>
        ))}
      </Card>
      {/* <Card>
        {boards.map((board: Board, index: number) => (
          <Card
            key={index}
            actions={[
              <LikeFilled key="like" />,
              <CommentOutlined key="message" />,
              <ShareAltOutlined key="share" />,
            ]}
          >
            <BoardUserForm>
              <BoardUserAvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <BoardUserInfo>nickname</BoardUserInfo>
              <BoardUserCreatedAt>1일전</BoardUserCreatedAt>
            </BoardUserForm>

            <BoardBody>{board.content}</BoardBody>
            <BoardImageForm>
              <Carousel draggable>
                <BoardImage alt="example" src={board.imagePath} />
              </Carousel>
            </BoardImageForm>
          </Card>
        ))}
      </Card> */}
    </SBoardList>
  );
};
