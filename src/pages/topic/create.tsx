import styled from "styled-components";
import { Topic } from "../../containers/Topic";

const SCreateBoardPage = styled.div`
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;

export default function CreateBoardPage() {
  return (
    <SCreateBoardPage>
      <Topic></Topic>
    </SCreateBoardPage>
  );
}
