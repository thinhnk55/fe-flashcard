import axios from "axios";
const URL: string = "https://auth-dot-app-demo-447811.as.r.appspot.com/";
// const URL: string = "http://localhost:8080/";

export interface GooleLoginRequest {
  token: string;
}

export interface GoogleLoginResponse {
  e: number;
  d?: GoogleLoginResponseData;
}

export interface GoogleLoginResponseData {
  username: string;
  role: number;
  status: number;
  token: string;
  token_expired: number;
  created_time: number;
  access_token: string;
}

export const handleGooleLogin = async (
  data: GooleLoginRequest
): Promise<GoogleLoginResponse> => {
  try {
    const api = axios.create({
      baseURL: URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await api.post<GoogleLoginResponse>("auth/google", data);
    return response.data;
  } catch (error) {
    console.error("handleLogin failed:", error);
    return { e: 1 };
  }
};
