import { Button, Typography, Form, Input, Flex } from "antd";
import type { FormProps } from "antd";
import styled from "styled-components";
type FieldType = {
  username?: string;
  password?: string;
};
const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const SForm = styled.div`
  width: 100%;
  padding: 30px;
`;

export const Login = () => {
  return (
    <SForm>
      <Typography.Title level={3}>Sign up</Typography.Title>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="아이디"
          name="username"
          rules={[{ required: true, message: "아이디를 입력해 주세요" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해 주세요" }]}
        >
          <Input.Password />
        </Form.Item>
        <Flex vertical justify="center" align="center" gap={15}>
          <Button color="cyan" variant="filled" block>
            회원가입
          </Button>

          <Button
            color="primary"
            variant="filled"
            htmlType="submit"
            size="large"
            block
          >
            로그인
          </Button>
        </Flex>
      </Form>
    </SForm>
  );
};
