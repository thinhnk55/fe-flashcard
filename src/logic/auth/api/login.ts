import axios from "axios";
const URL: string = "https://auth-dot-app-demo-447811.as.r.appspot.com/";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  e: number;
  d?: LoginData;
}

export interface LoginData {
  username: string;
  role: number;
  status: number;
  token: string;
  token_expired: number;
  created_time: number;
  access_token: string;
}

export const handleLogin = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  try {
    const api = axios.create({
      baseURL: URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await api.post<LoginResponse>("auth/login", data);
    return response.data;
  } catch (error) {
    console.error("handleLogin failed:", error);
    return { e: 1 };
  }
};
