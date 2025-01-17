// Importing only what's necessary from Recoil
import { atom } from "recoil";
import { LoginData } from "./api/login";
import { RegisterData } from "./api/register";

// Define the Auth interface for user authentication details
export interface Auth {
  username: string;
  password: string;
  role: number;
  status: number;
  token: string;
  token_expired: number;
  created_time: number;
  access_token: string;
}

export const convertLoginDataToAuth = (auth: Auth, loginData: LoginData) => {
  return {
    ...auth,
    role: loginData.role,
    status: loginData.status,
    token: loginData.token,
    token_expired: loginData.token_expired,
    created_time: loginData.created_time,
    access_token: loginData.access_token,
  };
};

export const convertRegisterDataToAuth = (
  auth: Auth,
  loginData: RegisterData
) => {
  return {
    ...auth,
    role: loginData.role,
    status: loginData.status,
    token: loginData.token,
    token_expired: loginData.token_expired,
    created_time: loginData.created_time,
  };
};

// Initial state for the Auth atom
const initialAuthState: Auth = {
  username: "",
  password: "",
  role: 0,
  status: 0,
  token_expired: 0,
  token: "",
  created_time: 0,
  access_token: "",
};

export const auth_storage_key = "auth_data";

export const loadAuthFromLocalStorage = () => {
  try {
    const storeAuthData = localStorage.getItem(auth_storage_key);
    if (storeAuthData) {
      const storedAuth = JSON.parse(storeAuthData) as Auth;
      return storedAuth;
    } else {
      return initialAuthState;
    }
  } catch (error) {
    console.error("Failed to parse auth data from localStorage:", error);
    return initialAuthState;
  }
};

// Recoil atom for managing Auth state
export const authAtom = atom<Auth>({
  key: "authAtom", // Unique key for the atom
  default: loadAuthFromLocalStorage(), // Default state
});

export interface ForgotPasswordData {
  username: string;
  otp: string;
  password: string;
  waiting: number;
}

const initialForgotPasswordState: ForgotPasswordData = {
  username: "",
  otp: "",
  password: "",
  waiting: 0,
};

export const forgot_password_storage_key = "forgot_password";
export const forgot_password_waiting = 60;

export const loadForgotPasswordFromLocalStorage = () => {
  try {
    const storedData = localStorage.getItem(forgot_password_storage_key);
    if (storedData) {
      const data = JSON.parse(storedData) as ForgotPasswordData;
      return data;
    } else {
      return initialForgotPasswordState;
    }
  } catch (error) {
    console.error("Failed to parse auth data from localStorage:", error);
    return initialForgotPasswordState;
  }
};

export const forgotPasswordAtom = atom<ForgotPasswordData>({
  key: "forgotPasswordAtom",
  default: loadForgotPasswordFromLocalStorage(),
});
