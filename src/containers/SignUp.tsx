import { Button, Typography, Form, Input, Flex, Select } from "antd";
import { FormProps } from "antd";

import styled from "styled-components";
type FieldType = {
  username?: string;
  nickname?: string;
  password?: string;
  location?: string;
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

const locations = [
  { key: "jeju", name: "제주" },
  { key: "deagu", name: "대구" },
  { key: "seoul", name: "서울" },
];
export const SignUp = () => {
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
          label="닉네임"
          name="nickname"
          rules={[{ required: true, message: "닉네임을 입력해 주세요" }]}
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
        <Form.Item<FieldType>
          name="location"
          label="지역"
          rules={[{ required: true, message: "지역을 선택해 주세요" }]}
        >
          <Select>
            {locations.map((location, index) => (
              <Select.Option
                key={location.key}
                value={location.key}
                className={index === 0 ? "selected" : ""}
              >
                {location.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Flex vertical justify="center" align="center" gap={15}>
          <Button color="cyan" variant="filled" block htmlType="submit">
            회원가입
          </Button>
        </Flex>
      </Form>
    </SForm>
  );
};
