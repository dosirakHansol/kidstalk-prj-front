import styled from "styled-components";
import { Header } from "antd/es/layout/layout";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isExistAccessCookie } from "../api/cookies";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { successAuth } from "../store/authSlice";
const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#D4E2D4",
  display: "flex",
  justifyContent: "center",
  padding: 0,
};
const HeaderItem = styled.div`
  flex: 1;
  color: #040408;
  width: 100%;
`;

const buttonStyle: React.CSSProperties = {
  boxShadow: "none",
};
export const CHeader = () => {
  const router = useRouter();
  const { pathname } = router;
  const dispatch = useDispatch();
  const isSuccess = useSelector((state: RootState) => state.auth.isSuccess);
  useEffect(() => {
    if (isExistAccessCookie()) {
      dispatch(successAuth());
    }
  }, []);
  return (
    <Header style={headerStyle}>
      <HeaderItem></HeaderItem>
      <HeaderItem>Logo</HeaderItem>
      <HeaderItem>
        {pathname === "/sign-in" ? (
          <Link href="/">
            <Button color="primary" variant="solid" style={buttonStyle}>
              Home
            </Button>
          </Link>
        ) : (
          !isSuccess && (
            <Link href="/sign-in">
              <Button color="cyan" variant="solid" style={buttonStyle}>
                Log in
              </Button>
            </Link>
          )
        )}
      </HeaderItem>
    </Header>
  );
};
