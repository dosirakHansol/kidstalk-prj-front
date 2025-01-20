import { Button, Typography, Form, Input, Flex, Select } from "antd";
import { RegisterProps } from "../domains/User/user";
import styled from "styled-components";

const SForm = styled.div`
  width: 100%;
  padding: 30px;
`;

const locations = [
  { key: "jeju", name: "제주" },
  { key: "deagu", name: "대구" },
  { key: "seoul", name: "서울" },
];

export const SignUp = ({
  onFinish,
  onFinishFailed,
  isLoading,
}: RegisterProps) => {
  return (
    <SForm>
      <Typography.Title level={3}>Sign up</Typography.Title>
      <Form
        disabled={isLoading}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="아이디"
          name="userId"
          rules={[{ required: true, message: "아이디를 입력해 주세요" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="닉네임"
          name="name"
          rules={[{ required: true, message: "닉네임을 입력해 주세요" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해 주세요" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
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
          <Button
            color="cyan"
            variant="filled"
            block
            htmlType="submit"
            disabled={isLoading}
          >
            회원가입
          </Button>
        </Flex>
      </Form>
    </SForm>
  );
};
