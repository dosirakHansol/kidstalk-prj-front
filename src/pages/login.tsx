import styled from "styled-components";
import { Login } from "../containers/Login";
const SLoginPage = styled.div`
  background-color: white;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export default function LoginPage() {
  return (
    <SLoginPage>
      <Login></Login>
    </SLoginPage>
  );
}
