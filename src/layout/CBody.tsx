import { Content } from "antd/es/layout/layout";
import styled from "styled-components";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
  overflowY: "scroll",
};

type IBodyProps = {
  children: JSX.Element;
};
export const CBody = ({ children }: IBodyProps) => {
  return <Content style={contentStyle}>{children}</Content>;
};
