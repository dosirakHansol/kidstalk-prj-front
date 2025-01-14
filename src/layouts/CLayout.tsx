import { CBody } from "./CBody";
import { CFooter } from "./CFooter";
import { CHeader } from "./CHeader";
import { Layout } from "antd";
import styled from "styled-components";
const SLayout = styled.div`
  background-color: white;
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const SAntdLayout = styled(Layout)`
  border-radius: 0px;
  overflow: hidden;
  width: calc(60% - 8px);
  max-width: calc(60% - 8px);
  height: 100%;
  @media (max-width: 600px) {
    width: 100%;
    max-width: 100%;
  }
`;

type ILayout = {
  children: JSX.Element;
};
export const CLayout = ({ children }: ILayout) => {
  return (
    <SLayout>
      <SAntdLayout>
        <CHeader />
        <CBody>{children}</CBody>
        <CFooter />
      </SAntdLayout>
    </SLayout>
  );
};
