import styled from "styled-components";
import { BoardList } from "../containers/BoardList";

const SHomePage = styled.div`
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;
export const HomePage = () => {
  return (
    <SHomePage>
      <BoardList></BoardList>
    </SHomePage>
  );
};
