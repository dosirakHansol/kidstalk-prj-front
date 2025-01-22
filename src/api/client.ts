import { getAccessCookie } from "./cookies";
import { RequestMethod } from "./Request";

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
      console.debug(errorBody);
      throw new Error(errorBody.message);
    }

    return response.json();
  };
  return { fetchData };
};

export default useApi;
