import styled from "styled-components";
import { SignUp } from "../containers/SignUp";
import { IBasicUser } from "../domains/User/user";
import { FormProps } from "antd";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/user";

const SSignUpPage = styled.div`
  background-color: white;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function SignUpPage() {
  const mutation = useMutation<IBasicUser, Error, IBasicUser>({
    mutationFn: signUp,
    onSuccess: () => {
      console.log("cockck");
    },
    onError: (error: any) => {
      console.log("error", error);
    },
  });
  const onFinish: FormProps["onFinish"] = (values: any) => {
    mutation.mutate(values);
  };

  return (
    <SSignUpPage>
      <SignUp onFinish={onFinish} onFinishFailed={onFinishFailed}></SignUp>
    </SSignUpPage>
  );
}
