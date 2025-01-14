import styled from "styled-components";
import { Card } from "antd";
import { useEffect, useState } from "react";

import { requestBoard } from "../data/test/board";
import { Board } from "../data/board";
const SBoardList = styled.div`
  width: 100%;
  height: 100%;
`;
const BoardImage = styled.img`
  height: 300px;
  width: auto;
  object-fit: cover;
`;
const CreatedAt = styled.span`
  display: block;
  color: #aaa;
  text-align: left;
  margin-bottom: 10px;
`;
export const BoardList = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    console.log("sdafasd");
    const boardList = requestBoard(1);
    setBoards(boardList);
    console.log(boards);
  }, []);
  return (
    <SBoardList>
      <Card>
        {boards.map((board: Board, index: number) => (
          <Card
            style={{ marginBottom: 16 }}
            type="inner"
            title={board.title}
            extra={<a href="#">More</a>}
            key={index}
            cover={<BoardImage alt="example" src={board.imagePath} />}
          >
            <CreatedAt>{board.createdAt}</CreatedAt>
            {board.content}
          </Card>
        ))}
      </Card>
    </SBoardList>
  );
};
