import styled from "styled-components";
import { MyInfo } from "../containers/MyInfo";
import { InfoList } from "../containers/InfoList";

const SMyInfoPage = styled.div`
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;
export default function MyInfoPage() {
  return (
    <SMyInfoPage>
      <MyInfo></MyInfo>
      <InfoList />
    </SMyInfoPage>
  );
}
