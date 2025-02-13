import styled from "styled-components";
import { Login } from "../containers/SignIn";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/user";
import { FormProps, message } from "antd";
import { IUserLogin } from "../domains/User/user";
import { useRouter } from "next/router";
import { isExistAccessCookie, setAuthCookieAndUserInfo } from "../api/cookies";
import { useDispatch } from "react-redux";
import { successAuth } from "../store/authSlice";
import { useEffect } from "react";
import { ResponseSuccess } from "../api/Response";
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

  const mutation = useMutation<ResponseSuccess, Error, any>({
    mutationFn: signIn,
    onSuccess: (data) => {
      // console.log(data.data);
      setAuthCookieAndUserInfo(
        data.data.accessToken,
        data.data.refreshToken,
        data.data.userNo,
        data.data.userId,
        data.data.userName
      );
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
      <Login
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // isLoading={mutation.isPending || mutation.isSuccess}
        isLoading={false}
      ></Login>
    </SLoginPage>
  );
}
