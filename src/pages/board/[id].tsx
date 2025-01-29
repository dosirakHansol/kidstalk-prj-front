import styled from "styled-components";
import BoardDetail from "../../containers/BoardDetail";

const SBoardDetailPage = styled.div`
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;
export default function BoardDetailPage() {
  return (
    <SBoardDetailPage>
      <BoardDetail></BoardDetail>
    </SBoardDetailPage>
  );
}
