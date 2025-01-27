import styled from "styled-components";
import { Card, Avatar } from "antd";
import { useEffect, useState } from "react";
import {
  CommentOutlined,
  ShareAltOutlined,
  LikeFilled,
} from "@ant-design/icons";
import { requestBoard } from "../data/test/board";
import { Board } from "../domains/Board/board";
const SBoardList = styled.div`
  width: 100%;
  height: 100%;
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
export const BoardList = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const boardList = requestBoard(1);

    setBoards(boardList);

    // console.log(boards);
  }, []);
  return (
    <SBoardList>
      <Card>
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
              <BoardImage alt="example" src={board.imagePath} />
            </BoardImageForm>
          </Card>
        ))}
      </Card>
    </SBoardList>
  );
};
