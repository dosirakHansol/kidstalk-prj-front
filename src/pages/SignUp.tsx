import styled from "styled-components";
import { SignUp } from "../containers/SignUp";
const SSignUpPage = styled.div`
  background-color: white;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const SignUpPage = () => {
  return (
    <SSignUpPage>
      <SignUp></SignUp>
    </SSignUpPage>
  );
};
