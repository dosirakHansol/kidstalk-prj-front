import styled from "styled-components";
import { Typography, Form, Input, Button } from "antd";

const SBoard = styled.div`
  width: 100%;
  padding: 30px;
`;

type FieldType = {
  name?: string;
  description?: string;
};
export const Topic = ({ onFinish, onFinishFailed, isLoading }: any) => {
  return (
    <SBoard>
      <Typography.Title level={3}>토픽 만들기</Typography.Title>
      <Form
        disabled={isLoading}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="주제명"
          name="name"
          rules={[{ required: true, message: "주제를 입력해 주세요" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          name="description"
          label="주제에 대한 설명"
          rules={[{ required: true, message: "내용을 설명해 주세요" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Button
          color="primary"
          variant="filled"
          htmlType="submit"
          size="large"
          block
        >
          작성하기
        </Button>
      </Form>
    </SBoard>
  );
};
