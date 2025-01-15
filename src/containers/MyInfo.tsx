import styled from "styled-components";
import { Button, Typography } from "antd";
const SMyInfo = styled.div`
  /* background: linear-gradient(45deg, #e07b39, #fff); */
  background-color: #87a2ff;
  width: 100%;
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const InfoForm = styled.div`
  display: flex;
  padding: 10px 0px;
  align-items: center;
  justify-content: space-around;
  /* background-color: crimson; */
`;

const SubInfoForm = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;
const CountFrom = styled.div``;
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

export const MyInfo = () => {
  return (
    <SMyInfo>
      <InfoForm>
        <Typography.Title style={titleStyle} level={4}>
          givejeong 님
        </Typography.Title>
        <Button color="purple" variant="filled">
          수정하기
        </Button>
      </InfoForm>
      <SubInfoForm>
        <CountFrom>
          <Typography.Title level={5} style={countTitleStyle}>
            게시글 수
          </Typography.Title>
          <Typography.Title level={4} style={countStyle}>
            123
          </Typography.Title>
        </CountFrom>
        <CountFrom>
          <Typography.Title level={5} style={countTitleStyle}>
            좋아요 글
          </Typography.Title>
          <Typography.Title level={4} style={countStyle}>
            123
          </Typography.Title>
        </CountFrom>
        <CountFrom>
          <Typography.Title level={5} style={countTitleStyle}>
            좋아요 토픽
          </Typography.Title>
          <Typography.Title level={4} style={countStyle}>
            123
          </Typography.Title>
        </CountFrom>
      </SubInfoForm>
    </SMyInfo>
  );
};
