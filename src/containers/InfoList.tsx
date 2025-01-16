import { Button } from "antd";
import Link from "next/link";
import styled from "styled-components";

const SInfoList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 5px;
  & button {
    margin: 5px 0px;
  }
`;

const linkStyle: React.CSSProperties = {
  display: "inline-block",
  width: "100%",
};
const buttonStyle: React.CSSProperties = {
  justifyContent: "start",
  width: "100%",
};
const menus = [
  { title: "토픽 만들기", path: "/" },
  { title: "게시글 작성하기", path: "/board/create" },
  { title: "내가 가입한 토픽 보기", path: "/my-info" },
];
export const InfoList = () => {
  return (
    <SInfoList>
      {menus.map((menu, index) => (
        <Link href={menu.path} style={linkStyle}>
          <Button key={menu.path} style={buttonStyle}>
            {menu.title}
          </Button>
        </Link>
      ))}
    </SInfoList>
  );
};
