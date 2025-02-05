import axios from "axios";

const URL: string = "https://auth-dot-app-demo-447811.as.r.appspot.com/";
export interface RegisterRequest {
  username: string;
  password: string;
}

export interface RegisterResponse {
  e: number;
  d?: RegisterResponseData;
}

export interface RegisterResponseData {
  username: string;
  role: number;
  status: number;
  token: string;
  token_expired: number;
  created_time: number;
  access_token: string;
}

export const handleRegister = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const api = axios.create({
      baseURL: URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await api.post<RegisterResponse>("auth/register", data);
    return response.data;
  } catch (error) {
    console.error("handleRegister failed:", error);
    return { e: 1 };
  }
};
