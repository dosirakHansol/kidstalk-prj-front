import { useQuery } from "@tanstack/react-query";
import { Card, Carousel, Image, Avatar, Button, List } from "antd";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { requestDetail } from "../api/board";
import TextArea from "antd/es/input/TextArea";

const SBoardDetail = styled.div`
  width: 100%;
  /* height: 100%; */
  padding: 10px;
`;

const BoardForm = styled.div`
  height: 100%;
  background: #eee;

  border: none;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.3);
`;
const BoardTitle = styled.div`
  padding: 10px 5px;
  text-align: left;
  background-color: orange;
  border: none;
`;
const BoardContent = styled.div`
  padding: 10px;
  text-align: left;
  color: black;
  border: none;
`;

const BoardText = styled.div`
  white-space: pre-wrap;
`;
const BoardFileForm = styled.div`
  /* background-color: green; */
  /* padding: 10px; */
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;
const BoardFileImage = styled(Image)`
  margin-top: 10px;
  padding: 10px;
  width: 100%;
`;

const CommentForm = styled.div`
  /* background-color: dodgerblue; */
  margin-top: 5px;
`;

const CommentInputForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > *:nth-child(1) {
    margin-right: 5px;
  }
`;

const CommentList = styled.div`
  text-align: left;
`;

const dataa = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

export default function BoardDetail() {
  const router = useRouter();
  const { id, type } = router.query;

  const { data, error, isLoading } = useQuery({
    queryKey: ["boardDetail", id],
    queryFn: () => requestDetail(Number(id)),
    enabled: !!id,
  });

  const commentRef: any = useRef();
  useEffect(() => {
    if (type === "comment") {
      commentRef.current.focus();
    }
  }, [type]);
  return (
    <SBoardDetail>
      <BoardForm>
        <BoardTitle>{data?.data.board.title}</BoardTitle>
        <BoardContent>
          <BoardText>{data?.data.board.description}</BoardText>
          <BoardFileForm>
            <Carousel draggable>
              {data?.data.board.boardFile.map((file: any) => (
                <BoardFileImage
                  key={file.sort}
                  src={"http://localhost:4040" + file.filePath}
                />
              ))}
            </Carousel>
          </BoardFileForm>
        </BoardContent>
        <CommentForm></CommentForm>
      </BoardForm>
      <CommentForm>
        <CommentInputForm>
          <Avatar shape="square" size="small" icon={<UserOutlined />} />
          <TextArea
            ref={commentRef}
            rows={1}
            placeholder="댓글을 입력하세요"
            maxLength={6}
          />
          <Button color="orange" type="primary" variant="solid">
            등록
          </Button>
        </CommentInputForm>
        <CommentList>
          <List
            itemLayout="horizontal"
            dataSource={dataa}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                    />
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </CommentList>
      </CommentForm>
    </SBoardDetail>
  );
}
