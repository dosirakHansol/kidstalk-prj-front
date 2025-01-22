import styled from "styled-components";
import { Typography, Form, Input, Button } from "antd";

const SBoard = styled.div`
  width: 100%;

  padding: 30px;
`;

export const Topic = () => {
  return (
    <SBoard>
      <Typography.Title level={3}>토픽 만들기</Typography.Title>
      <Form layout="vertical">
        <Form.Item label="주제명">
          <Input />
        </Form.Item>
        <Form.Item label="주제에 대한 설명">
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
