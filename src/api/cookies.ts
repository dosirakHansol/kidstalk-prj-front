import { getCookie, setCookie } from "cookies-next/client";

const ACCESS_TOKEN_KEY = "kids_access";
const REFRESH_TOKEN_KEY = "kids_refresh";

export const setAuthCookie = (accessToken: string, refreshToken: string) => {
  setCookie(ACCESS_TOKEN_KEY, accessToken);
  setCookie(REFRESH_TOKEN_KEY, refreshToken);
};

export const isExistAccessCookie = () => {
  const accessCookie = getCookie(ACCESS_TOKEN_KEY);
  console.log("access", accessCookie);
  return accessCookie ? true : false;
};
