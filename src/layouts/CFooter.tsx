import styled from "styled-components";
import { Footer } from "antd/es/layout/layout";
import {
  HistoryOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";

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
      <HistoryOutlined style={IconStyle} />

      <HeartOutlined style={IconStyle} />

      <UserOutlined style={IconStyle} />
    </Footer>
  );
};
