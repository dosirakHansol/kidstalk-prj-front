import { Card, Avatar, Carousel, Image, Button } from "antd";
import styled from "styled-components";
import Link from "next/link";
import {
  CommentOutlined,
  ShareAltOutlined,
  LikeFilled,
} from "@ant-design/icons";
import { getUserInfoCookie } from "../api/cookies";
const BoardUserForm = styled.div`
  display: flex;
  align-items: center;
`;
const BoardUserAvatar = styled(Avatar)``;
const BoardUserInfo = styled.div`
  margin-left: 10px;
`;
const BoardUserCreatedAt = styled.span`
  display: block;
  color: #aaa;
  margin-left: 5px;
`;
const BoardUserUpdate = styled.div`
  margin-left: 5px;
`;

const BoardTitle = styled.div`
  text-align: left;
  margin-top: 10px;
  font-weight: 600;
`;
const BoardBody = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  text-align: left;
  margin-top: 5px;
  white-space: pre-wrap;
`;
const BoardImageForm = styled.div`
  margin: 10px 0px 0px 0px;
  width: 100%;
  height: auto;
  padding: 5px;
`;
const BoardImage = styled(Image)`
  border-radius: 5px;
  min-height: 100px;
  max-height: 400px;
  width: 100%;
  object-fit: cover;
  padding: 5px;
`;
const LikesForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.on {
    color: dodgerblue;
  }
  & > span {
    margin-left: 5px;
  }
`;

const cardStyle: React.CSSProperties = {
  marginBottom: "5px",
};

export const CBoard = ({ board, isLoading, onSubmitLiked }: any) => {
  const { userPk } = getUserInfoCookie();
  return (
    <Card
      style={cardStyle}
      loading={isLoading}
      key={board.id}
      actions={[
        <LikesForm
          className={board.isLiked ? "on" : ""}
          onClick={() => onSubmitLiked(board.isLiked, board.id)}
        >
          <LikeFilled key={`like_${board.id}`} />
          <span>{board.likesCount}</span>
        </LikesForm>,
        <Link href={`/board/${board.id}?type=comment`}>
          <CommentOutlined key={`message_${board.id}`} />
        </Link>,
        <ShareAltOutlined key={`share_${board.id}`} />,
      ]}
    >
      <Link href={`/board/${board.id}`}>
        <BoardUserForm>
          <BoardUserAvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <BoardUserInfo>{board.member.name}</BoardUserInfo>
          <BoardUserCreatedAt>1일전</BoardUserCreatedAt>

          {userPk && board.member.id === Number(userPk) && (
            <BoardUserUpdate>
              <Link href={"/board/edit?board_id=" + board.id}>
                <Button color="orange" variant="filled">
                  수정하기
                </Button>
              </Link>
            </BoardUserUpdate>
          )}
        </BoardUserForm>
        <BoardTitle>{board.title}</BoardTitle>
        <BoardBody>{board.description}</BoardBody>
      </Link>
      <BoardImageForm>
        <Carousel draggable>
          {board.fileList?.map((image: any) => (
            <BoardImage
              key={image.id}
              alt="example"
              src={"http://localhost:4040" + image.filePath}
            />
          ))}
        </Carousel>
      </BoardImageForm>
    </Card>
  );
};
