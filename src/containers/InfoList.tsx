import { Button } from "antd";
import styled from "styled-components";

const SInfoList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 5px;
  & > button {
    margin: 5px 0px;
  }
`;

const buttonStyle: React.CSSProperties = {
  justifyContent: "start",
};
const menus = [
  { title: "토픽 만들기", path: "/Home" },
  { title: "게시글 작성하기", path: "/Home" },
  { title: "내가 가입한 토픽 보기", path: "/Home" },
];
export const InfoList = () => {
  return (
    <SInfoList>
      {menus.map((menu, index) => (
        <Button key={index} style={buttonStyle}>
          {menu.title}
        </Button>
      ))}
    </SInfoList>
  );
};
