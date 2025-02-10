import styled from "styled-components";
import BoardDetail from "../../containers/BoardDetail";
import { CommentList } from "../../containers/CommentList";

const SBoardDetailPage = styled.div`
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  padding: 10px;
  height: 100%;
`;
export default function BoardDetailPage() {
  return (
    <SBoardDetailPage>
      <BoardDetail></BoardDetail>
      <CommentList></CommentList>
    </SBoardDetailPage>
  );
}
