import styled from "styled-components";
import { Footer } from "antd/es/layout/layout";
import {
  HistoryOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const footerStyle: React.CSSProperties = {
  color: "#fff",
  backgroundColor: "#DBC4F0",
  width: "100%",
  textAlign: "center",
  display: "flex",
  justifyContent: "space-between",
};

const IconStyle: React.CSSProperties = {
  display: "inline-block",
  fontSize: "25px",
};
export const CFooter = () => {
  return (
    <Footer style={footerStyle}>
      <Link href="/">
        <HistoryOutlined style={IconStyle} />
      </Link>
      <Link href="/board/create">
        <PlusCircleOutlined style={IconStyle} />
      </Link>
      <Link href="/member/info">
        <UserOutlined style={IconStyle} />
      </Link>
    </Footer>
  );
};
