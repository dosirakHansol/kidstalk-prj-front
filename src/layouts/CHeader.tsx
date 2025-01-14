import styled from "styled-components";
import { Header } from "antd/es/layout/layout";
import { Button } from "antd";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#f6edf3f8",
  display: "flex",
  justifyContent: "center",
  padding: 0,
};
const HeaderItem = styled.div`
  color: #040408;
  width: 100%;
`;
export const CHeader = () => {
  return (
    <Header style={headerStyle}>
      <HeaderItem></HeaderItem>
      <HeaderItem>Logo</HeaderItem>
      <HeaderItem>
        <Button color="cyan" variant="solid">
          Log in
        </Button>
      </HeaderItem>
    </Header>
  );
};
