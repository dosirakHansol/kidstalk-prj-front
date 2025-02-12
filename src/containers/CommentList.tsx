import styled from "styled-components";
import TextArea from "antd/es/input/TextArea";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useRef } from "react";
import { Avatar, Button, List } from "antd";
import { useRouter } from "next/router";
const CommentForm = styled.div`
  margin-top: 5px;
`;

const CommentInputForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SCommentList = styled.div`
  text-align: left;
`;

const CreateAvatar = styled.div`
  /* flex: 1; */
`;
const CreateTextArea = styled.div`
  flex: 5;
  padding: 0px 5px;
`;
const CreateSubmit = styled.div`
  /* flex: 2; */
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

export const CommentList = ({ onChange, onSubmit, data, commentList }: any) => {
  const router = useRouter();
  const { type } = router.query;
  const commentRef: any = useRef();
  console.log(commentList);
  useEffect(() => {
    if (type === "comment") {
      commentRef.current.focus();
    }
  }, [type]);

  return (
    <CommentForm>
      <CommentInputForm>
        <CreateAvatar>
          <Avatar shape="square" size="small" icon={<UserOutlined />} />
        </CreateAvatar>
        <CreateTextArea>
          <TextArea
            ref={commentRef}
            rows={1}
            placeholder="댓글을 입력하세요"
            // maxLength={6}
            defaultValue={data}
            onChange={onChange}
          />
        </CreateTextArea>
        <CreateSubmit>
          <Button
            color="orange"
            type="primary"
            variant="solid"
            onClick={(e) => onSubmit(e)}
          >
            등록
          </Button>
        </CreateSubmit>
      </CommentInputForm>
      <SCommentList>
        {commentList && (
          <List
            itemLayout="horizontal"
            dataSource={commentList}
            renderItem={(item: any, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                    />
                  }
                  title={<a href="https://ant.design">익명</a>}
                  description={item?.description}
                />
              </List.Item>
            )}
          />
        )}
      </SCommentList>
    </CommentForm>
  );
};
