import styled from "styled-components";
import { SignUp } from "../containers/SignUp";
import { IBasicUser } from "../domains/User/user";
import { FormProps, message } from "antd";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../api/user";
import { useRouter } from "next/router";
import { ResponseSuccess } from "../api/Response";

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
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const mutation = useMutation<ResponseSuccess, Error, IBasicUser>({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
      messageApi.open({
        type: "success",
        content: data.message,
        onClose: () => router.push("/sign-in"),
      });
    },
    onError: (error: Error) => {
      console.log(error.message);
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });
  const onFinish: FormProps["onFinish"] = (values: any) => {
    mutation.mutate(values);
  };

  return (
    <SSignUpPage>
      {contextHolder}
      <SignUp
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isLoading={mutation.isPending || mutation.isSuccess}
      ></SignUp>
    </SSignUpPage>
  );
}
