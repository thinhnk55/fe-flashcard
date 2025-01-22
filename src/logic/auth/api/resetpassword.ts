import axios from "axios";
const URL: string = "https://auth-dot-app-demo-447811.as.r.appspot.com/";

const isMock = false;

export interface ResetPasswordRequest {
  username: string;
  otp: string;
  password: string;
}

export interface ResetPasswordResponse {
  e: number;
  d?: ResetPasswordResponseData;
}

export interface ResetPasswordResponseData {
  username: string;
  role: number;
  status: number;
  token: string;
  token_expired: number;
  created_time: number;
  access_token: string;
}

export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  try {
    if (isMock) {
      return resetPasswordMock(data);
    }
    const api = axios.create({
      baseURL: URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await api.post<ResetPasswordResponse>(
      "auth/password/reset",
      data
    );
    return response.data;
  } catch (error) {
    console.error("sendOtpToEmail failed:", error);
    return { e: 0 };
  }
};

export const resetPasswordMock = async (
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  try {
    console.log("sendOtpToEmailMock Data: ", JSON.stringify(data));
    const response: ResetPasswordResponse = {
      e: 0,
    };
    return Promise.resolve(response);
  } catch (error) {
    console.error("sendOtpToEmailMock failed:", error);
    return { e: 1 };
  }
};
