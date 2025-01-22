import { Button, Typography, Form, Input, Flex } from "antd";
import type { FormProps } from "antd";
import Link from "next/link";
import styled from "styled-components";

const SLogin = styled.div`
  width: 100%;
  padding: 30px;
`;

const buttonStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
};

type FieldType = {
  userId?: string;
  password?: string;
};

export const Login = ({ onFinish, onFinishFailed, isLoading }: any) => {
  return (
    <SLogin>
      <Typography.Title level={3}>Sign in</Typography.Title>
      <Form
        name="basic"
        disabled={isLoading}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="아이디"
          name="userId"
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
          <Link href="/sign-up" style={buttonStyle}>
            <Button color="cyan" variant="filled" block>
              회원가입
            </Button>
          </Link>
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
    </SLogin>
  );
};
