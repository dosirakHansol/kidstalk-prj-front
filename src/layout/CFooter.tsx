import styled from "styled-components";
import { Footer } from "antd/es/layout/layout";
import { Menu } from "antd";
const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));

export const CFooter = () => {
  return <Footer style={footerStyle}>footer</Footer>;
};
