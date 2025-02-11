import styled from "styled-components";
import { Board } from "../../containers/Board";
import { BoardEdit } from "../../containers/BoardEdit";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { requestDetail } from "../../api/board";
const SCreateBoardPage = styled.div`
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;
export default function CreateBoardPage() {
  const router = useRouter();
  const { board_id: boardId } = router.query;
  const {
    data: boardData,
    isLoading: boardIsLoading,
    error: boardError,
  } = useQuery({
    queryKey: ["boardData"],
    queryFn: () => requestDetail(Number(boardId)),
    enabled: !!boardId,
  });

  return (
    <SCreateBoardPage>
      {boardData && !boardIsLoading && (
        <BoardEdit
          boardId={boardId}
          prevBoard={boardData.data.board}
        ></BoardEdit>
      )}
    </SCreateBoardPage>
  );
}
