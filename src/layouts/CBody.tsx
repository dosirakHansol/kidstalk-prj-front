import { Content } from "antd/es/layout/layout";
import styled from "styled-components";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 100,
  lineHeight: "120px",
  color: "#fff",
  // overflowY: "scroll",
  width: "100%",
};

type IBodyProps = {
  children: JSX.Element;
};
export const CBody = ({ children }: IBodyProps) => {
  return <Content style={contentStyle}>{children}</Content>;
};
