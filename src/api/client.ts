import { useDispatch } from "react-redux";
import {
  getAccessCookie,
  getRefreshCookie,
  resetAuthCookie,
  setAuthCookieAndUserInfo,
} from "./cookies";
import { RequestMethod } from "./Request";
import { ResponseSuccess } from "./Response";
import { logoutAuth } from "../store/authSlice";
import { logoutAction } from "../store/store";

const BASE_URL = "http://localhost:4040";

const useApi = () => {
  const fetchData = async (
    endpoint: string,
    method: RequestMethod,
    body?: any
  ) => {
    const headers: any = {
      "Content-Type": "application/json",
    };
    headers["authorization"] = `Bearer ${getAccessCookie()}`;

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorBody = await response.json();

      if (response.status === 401) {
        await requestRefreshToken(headers);

        return await fetchData(`${endpoint}`, method, body);
      }
      console.debug(errorBody);
      throw new Error(errorBody.message);
    }

    return response.json();
  };
  return { fetchData };
};

const requestRefreshToken = async (headers: any) => {
  const body = {
    refreshToken: getRefreshCookie(),
  };

  const options: any = {
    method: RequestMethod.POST,
    headers,
    body: JSON.stringify(body),
  };
  const response = await fetch(`${BASE_URL}/member/refresh`, options);
  if (!response.ok) {
    const errorBody = await response.json();
    console.error(errorBody);

    logoutAction();
    throw new Error("로그인 세션 만료");
  }
  const successCookie: ResponseSuccess = await response.json();
  const { accessToken, refreshToken, userNo, userId, userName } =
    successCookie.data;

  setAuthCookieAndUserInfo(accessToken, refreshToken, userNo, userId, userName);
};

export default useApi;
