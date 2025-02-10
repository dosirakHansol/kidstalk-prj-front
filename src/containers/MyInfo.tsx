import styled from "styled-components";
import { Button, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { useDispatch } from "react-redux";
import { getUserInfoCookie } from "../api/cookies";

const SMyInfo = styled.div`
  background: linear-gradient(45deg, #fb8638, #0dbb0d);
  /* background-color: #87a2ff; */
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const InfoMain = styled.div`
  display: flex;
  width: 50%;

  justify-content: center;
  align-items: center;
  & > * {
    /* display: block; */
    margin: 0px 5px;
  }
`;

const InfoButton = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > button {
    margin: 0px 5px;
  }
`;
const SubInfoForm = styled.div`
  display: flex;

  justify-content: space-around;
  align-items: center;
`;
const CountFrom = styled.div`
  width: 100%;
`;
const titleStyle: React.CSSProperties = {
  color: "#fff",
};
const countTitleStyle: React.CSSProperties = {
  color: "#eee",
};

const countStyle: React.CSSProperties = {
  color: "#eee",
  margin: 0,
};

export const MyInfo = ({ infoCountData, onClickLogout }: any) => {
  const { userId } = getUserInfoCookie();
  return (
    <SMyInfo>
      <InfoForm>
        <InfoMain>
          <Avatar size="large" icon={<UserOutlined />} />
          <Typography.Title style={titleStyle} level={4}>
            {userId} 님
          </Typography.Title>
        </InfoMain>
        <InfoButton>
          <Button color="purple" variant="filled">
            수정하기
          </Button>
          <Button
            color="danger"
            variant="filled"
            onClick={(e) => onClickLogout(e)}
          >
            로그아웃
          </Button>
        </InfoButton>
      </InfoForm>
      <SubInfoForm>
        <CountFrom>
          <Typography.Title level={5} style={countTitleStyle}>
            게시글 수
          </Typography.Title>
          <Typography.Title level={4} style={countStyle}>
            {infoCountData?.userBoardCount}
          </Typography.Title>
        </CountFrom>
        <CountFrom>
          <Typography.Title level={5} style={countTitleStyle}>
            좋아요 수
          </Typography.Title>
          <Typography.Title level={4} style={countStyle}>
            {infoCountData?.userBoardLikeCount}
          </Typography.Title>
        </CountFrom>
        <CountFrom>
          <Typography.Title level={5} style={countTitleStyle}>
            댓글
          </Typography.Title>
          <Typography.Title level={4} style={countStyle}>
            {infoCountData?.userCommentCount}
          </Typography.Title>
        </CountFrom>
      </SubInfoForm>
    </SMyInfo>
  );
};
