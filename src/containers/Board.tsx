import styled from "styled-components";
import {
  Typography,
  Form,
  Input,
  Upload,
  Button,
  Select,
  message,
  Space,
} from "antd";
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
import { useEffect, useMemo, useState } from "react";
import type { UploadFile, UploadProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchTopic } from "../api/topic";
import { ITopic } from "../domains/Topic/topic";

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

const SelectOptionForm = styled(Space)`
  display: flex;
  justify-content: space-between;
  & label {
  }
  & span {
    color: #ddd;
  }
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
  const { data, error, isLoading } = useQuery({
    queryKey: ["topicKey"],
    queryFn: fetchTopic,
  });
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
    console.log("!!!!!!!      1");
    console.log("info", info);
    console.log("useState", fileList);

    if (info.file.status === "done") {
      message.success(`${info.file.name} 파일 업로드 완료.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} 파일 업로드 실패.`);
    }
  };
  const handleBeforeUpload = async (file: any) => {
    const formData = new FormData();
    console.log("!!!!!!!      2");
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

      const responseDto = await response.json();
      const storedFilePath = responseDto.data.filePath;
      console.log(file.uid);
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
            placeholder="토픽을 선택해 주세요"
            style={{ flex: 1, textAlign: "left" }}
            options={data?.data?.topics.map((topic: ITopic, index: any) => ({
              value: topic.id,
              label: topic.name,
              label2: topic.description,
            }))}
            optionRender={(topic) => (
              <SelectOptionForm key={topic.data.id}>
                <label>{topic.data.label}</label>
                <span>{topic.data.label2}</span>
              </SelectOptionForm>
            )}
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
                multiple
                customRequest={({ file, onSuccess, onError }: any) => {
                  handleBeforeUpload(file)
                    .then((path) => {
                      onSuccess(file);
                    })
                    .catch(onError);
                }}
                maxCount={5}
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
