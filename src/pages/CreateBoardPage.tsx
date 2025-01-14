import styled from "styled-components";
import { Board } from "../containers/Board";
const SCreateBoardPage = styled.div`
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;
export const CreateBoardPage = () => {
  return (
    <SCreateBoardPage>
      <Board></Board>
    </SCreateBoardPage>
  );
};
