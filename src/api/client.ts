import { RequestMethod } from "./Request";

const BASE_URL = "http://localhost:4040";

const useApi = () => {
  const fetchData = async (
    endpoint: string,
    method: RequestMethod,
    auth: boolean,
    body?: any
  ) => {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(errorBody.message);
    }

    return response.json();
  };
  return { fetchData };
};

export default useApi;
