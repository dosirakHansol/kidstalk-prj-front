import { useQuery } from "@tanstack/react-query";
import { Card } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { requestDetail } from "../api/board";

const SBoardDetail = styled.div`
  width: 100%;
  /* height: 100%; */
  padding: 10px;
`;

const BoardForm = styled.div`
  height: 100%;
  background: #eee;

  border: none;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.3);
`;
const BoardTitle = styled.div`
  padding: 10px 5px;
  text-align: left;
  background-color: orange;
  border: none;
`;
const BoardContent = styled.div`
  padding: 10px;
  text-align: left;
  color: black;
  border: none;
`;

const BoardText = styled.div``;
const BoardFileForm = styled.div`
  /* background-color: green; */
  /* padding: 10px; */
  display: flex;
  flex-direction: column;
`;
const BoardFileImage = styled.img`
  margin-top: 5px;
  width: 100%;
`;
export default function BoardDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error, isLoading } = useQuery({
    queryKey: ["boardDetail", id],
    queryFn: () => requestDetail(Number(id)),
    enabled: !!id,
  });
  return (
    <SBoardDetail>
      <BoardForm>
        <BoardTitle>{data?.data.board.title}</BoardTitle>
        <BoardContent>
          <BoardText>{data?.data.board.description}</BoardText>
          <BoardFileForm>
            {data?.data.board.boardFile.map((file: any) => (
              <BoardFileImage
                src={
                  "http://localhost:4040/" +
                  file.filePath.replace(
                    "/Users/kwonjeonghyeon/source-code/kids-talk-prj-back/uploads",
                    ""
                  )
                }
              />
            ))}
          </BoardFileForm>
        </BoardContent>
      </BoardForm>
    </SBoardDetail>
  );
}
