import styled from "styled-components";
import { Login } from "../containers/SignIn";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/user";
import { FormProps, message } from "antd";
import { IUserLogin } from "../domains/User/user";
import { useRouter } from "next/router";
import { isExistAccessCookie, setAuthCookie } from "../api/cookies";
import { useDispatch } from "react-redux";
import { successAuth } from "../store/authSlice";
import { useEffect } from "react";
const SLoginPage = styled.div`
  background-color: white;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;
type FieldType = {
  userId?: string;
  password?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
export default function SignInPage() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      console.log(data.data);
      setAuthCookie(data.data.accessToken, data.data.refreshToken);
      dispatch(successAuth());
      router.push("/");
    },
    onError: (error: Error) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  useEffect(() => {
    if (isExistAccessCookie()) {
      router.push("/");
    }
  }, []);
  const onFinish: FormProps["onFinish"] = (values: IUserLogin) => {
    mutation.mutate(values);
  };

  return (
    <SLoginPage>
      {contextHolder}
      <Login onFinish={onFinish} onFinishFailed={onFinishFailed}></Login>
    </SLoginPage>
  );
}
