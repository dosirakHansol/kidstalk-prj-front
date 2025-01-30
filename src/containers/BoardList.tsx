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
import { useQuery } from "@tanstack/react-query";
import { requestList } from "../api/board";
import Link from "next/link";
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

const BoardBody = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-align: left;
  margin-top: 10px;
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
`;
const LikesForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > span {
    margin-left: 5px;
  }
`;

const cardStyle: React.CSSProperties = {
  marginBottom: "5px",
};

export const BoardList = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [page, setPage] = useState(0);
  const { data, error, isLoading } = useQuery({
    queryKey: ["boardList", page],
    queryFn: () => requestList(page),
  });
  useEffect(() => {
    const boardList = requestBoard(1);

    setBoards(boardList);

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
              <LikesForm>
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

              <BoardBody>{board.description}</BoardBody>
              <BoardImageForm>
                <Carousel draggable>
                  {board.fileList?.map((image: any) => (
                    <BoardImage
                      key={image.id}
                      alt="example"
                      src={
                        "http://localhost:4040/" +
                        image.filePath.replace(
                          "/Users/kwonjeonghyeon/source-code/kids-talk-prj-back/uploads",
                          ""
                        )
                      }
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
