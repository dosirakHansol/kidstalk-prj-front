import { getCookie, setCookie, deleteCookie } from "cookies-next/client";

const ACCESS_TOKEN_KEY = "kids_access";
const REFRESH_TOKEN_KEY = "kids_refresh";
const KIDS_USER_PK = "kids_user_pk";
const KIDS_USER_ID = "kids_user_id";
const KIDS_USER_NAME = "kids_user_name";

export const setAuthCookieAndUserInfo = (
  accessToken: string,
  refreshToken: string,
  userPk: number,
  userId: string,
  userName: string
) => {
  resetAuthCookie();
  setCookie(ACCESS_TOKEN_KEY, accessToken);
  setCookie(REFRESH_TOKEN_KEY, refreshToken);
  setCookie(KIDS_USER_PK, userPk);
  setCookie(KIDS_USER_ID, userId);
  setCookie(KIDS_USER_NAME, userName);
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

export const getUserInfoCookie = () => {
  const userPk = getCookie(KIDS_USER_PK);
  const userId = getCookie(KIDS_USER_ID);
  const userName = getCookie(KIDS_USER_NAME);

  return { userPk, userId, userName };
};

export const resetAuthCookie = () => {
  deleteCookie(ACCESS_TOKEN_KEY);
  deleteCookie(REFRESH_TOKEN_KEY);
  deleteCookie(KIDS_USER_PK);
  deleteCookie(KIDS_USER_ID);
  deleteCookie(KIDS_USER_NAME);
};
