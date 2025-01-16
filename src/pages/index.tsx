import styled from "styled-components";
import { BoardList } from "../containers/BoardList";

const SHome = styled.div`
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;
export default function Home() {
  return (
    <>
      <SHome>
        <BoardList></BoardList>
      </SHome>
    </>
  );
}
