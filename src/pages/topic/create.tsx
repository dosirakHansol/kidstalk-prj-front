import styled from "styled-components";
import { Topic } from "../../containers/Topic";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isExistAccessCookie } from "../../api/cookies";
import { createTopic } from "../../api/topic";
import { useMutation } from "@tanstack/react-query";
import { ITopic } from "../../domains/Topic/topic";
import { FormProps, message } from "antd";

const SCreateBoardPage = styled.div`
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
`;

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

export default function CreateTopicPage() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const mutation = useMutation({
    mutationFn: createTopic,
    onSuccess: (data: any) => {
      console.log(data);
      messageApi.open({
        type: "success",
        content: data.message,
        duration: 1,
        onClose: () => router.push("/"),
      });
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  const onFinish: FormProps["onFinish"] = (values: ITopic) => {
    console.log(values);
    mutation.mutate(values);
  };
  useEffect(() => {
    if (!isExistAccessCookie()) {
      router.push("/sign-in");
    }
  }, []);

  return (
    <SCreateBoardPage>
      {contextHolder}
      <Topic
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        isLoading={mutation.isPending || mutation.isSuccess}
      ></Topic>
    </SCreateBoardPage>
  );
}
