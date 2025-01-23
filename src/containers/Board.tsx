import styled from "styled-components";
import { Typography, Form, Input, Upload, Button, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import type { UploadFile, UploadProps } from "antd";

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

interface DraggableUploadListItemProps {
  originNode: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
  file: UploadFile<any>;
}

const DraggableUploadListItem = ({
  originNode,
  file,
}: DraggableUploadListItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.uid,
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "move",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      // prevent preview event when drag end
      className={isDragging ? "is-dragging" : ""}
      {...attributes}
      {...listeners}
    >
      {/* hide error tooltip when dragging */}
      {file.status === "error" && isDragging
        ? originNode.props.children
        : originNode}
    </div>
  );
};

export const Board = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const sensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setFileList((prev) => {
        const activeIndex = prev.findIndex((i) => i.uid === active.id);
        const overIndex = prev.findIndex((i) => i.uid === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const onChange: UploadProps["onChange"] = (info: {
    fileList: any;
    file: any;
  }) => {
    setFileList(info.fileList);
    console.log("info", info);
    if (info.file.status === "done") {
      message.success(`${info.file.name} 파일 업로드 완료.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} 파일 업로드 실패.`);
    }
  };
  const handleBeforeUpload = async (file: File) => {
    const formData = new FormData();

    console.log("file", file);
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:4040/file/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("파일 업로드에 실패했습니다.");
      }
      // await response.text();
      return await response.json();
      // console.log(data);
    } catch (error) {
      console.log(error);
      message.error("파일 업로드 중 오류가 발생했습니다.");
    }

    return false; // false를 반환하여 기본 업로드 동작을 방지
  };
  return (
    <SBoard>
      <Typography.Title level={3}>글 쓰기</Typography.Title>
      <Form layout="vertical">
        <Form.Item label="토픽">
          <Select
            placeholder="토픽"
            style={{ flex: 1, textAlign: "left" }}
            options={[
              { value: "1", label: "Jack" },
              { value: "4", label: "Lucy" },
              { value: "6", label: "yiminghe" },
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
          <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
            <SortableContext
              items={fileList.map((i) => i.uid)}
              strategy={verticalListSortingStrategy}
            >
              <Upload
                listType="picture-card"
                customRequest={({ file, onSuccess, onError }: any) => {
                  handleBeforeUpload(file)
                    .then((path) => {
                      console.log("path", path);
                      onSuccess(file);
                    })
                    .catch(onError);
                }}
                onChange={onChange}
                fileList={fileList}
                itemRender={(originNode, file) => (
                  <DraggableUploadListItem
                    originNode={originNode}
                    file={file}
                  />
                )}
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </SortableContext>
          </DndContext>
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
