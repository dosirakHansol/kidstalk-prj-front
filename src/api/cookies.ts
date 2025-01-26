import { getCookie, setCookie, deleteCookie } from "cookies-next/client";

const ACCESS_TOKEN_KEY = "kids_access";
const REFRESH_TOKEN_KEY = "kids_refresh";

export const setAuthCookie = (accessToken: string, refreshToken: string) => {
  resetAuthCookie();
  setCookie(ACCESS_TOKEN_KEY, accessToken);
  setCookie(REFRESH_TOKEN_KEY, refreshToken);
};

export const isExistAccessCookie = () => {
  const accessCookie = getCookie(ACCESS_TOKEN_KEY);
  return accessCookie ? true : false;
};

export const getAccessCookie = () => {
  return getCookie(ACCESS_TOKEN_KEY);
};

export const getRefreshCookie = () => {
  return getCookie(REFRESH_TOKEN_KEY);
};

export const resetAuthCookie = () => {
  deleteCookie(ACCESS_TOKEN_KEY);
  deleteCookie(REFRESH_TOKEN_KEY);
};
