import styled from "styled-components";
import { Typography, Form, Input, Upload, Button, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const SBoard = styled.div`
  width: 100%;

  padding: 30px;
`;

export const Board = () => {
  return (
    <SBoard>
      <Typography.Title level={3}>글 쓰기</Typography.Title>
      <Form layout="vertical">
        <Form.Item label="토픽">
          <Select
            placeholder="토픽"
            style={{ flex: 1, textAlign: "left" }}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
            ]}
          />
        </Form.Item>
        <Form.Item label="제목">
          <Input />
        </Form.Item>
        <Form.Item label="내용">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="첨부 이미지"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card" multiple>
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
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
