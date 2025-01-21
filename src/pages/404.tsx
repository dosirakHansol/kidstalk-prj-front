import styled from "styled-components";
import { Alert, Button } from "antd";
import Link from "next/link";

const Custom404Page = styled.div`
  background-color: white;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  padding: 10px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function Custom404() {
  return (
    <Custom404Page>
      <Alert
        message="없는 페이지 입니다"
        showIcon
        description="요청하신 페이지는 없는 페이지 입니다."
        type="error"
        action={
          <Link href="/">
            <Button size="small" danger>
              홈으로 이동
            </Button>
          </Link>
        }
      />
    </Custom404Page>
  );
}
