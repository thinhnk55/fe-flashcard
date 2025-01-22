import axios from "axios";
const URL: string = "https://auth-dot-app-demo-447811.as.r.appspot.com/";

const isMock = false;

export interface OtpEmailRequest {
  username: string;
}

export interface OtpEmailResponse {
  e: number;
}

export const sendOtpToEmail = async (
  data: OtpEmailRequest
): Promise<OtpEmailResponse> => {
  try {
    if (isMock) {
      return sendOtpToEmailMock(data);
    }
    const api = axios.create({
      baseURL: URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await api.post<OtpEmailResponse>("auth/otp/email", data);
    return response.data;
  } catch (error) {
    console.error("sendOtpToEmail failed:", error);
    return { e: 0 };
  }
};

export const sendOtpToEmailMock = async (
  data: OtpEmailRequest
): Promise<OtpEmailResponse> => {
  try {
    console.log("sendOtpToEmailMock Data: ", JSON.stringify(data));
    const response: OtpEmailResponse = {
      e: 0,
    };
    return Promise.resolve(response);
  } catch (error) {
    console.error("sendOtpToEmailMock failed:", error);
    return { e: 1 };
  }
};
