import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { LoginData } from "../api/login";
import { RegisterData } from "../api/register";
import { ResetPasswordData } from "../api/resetpassword";

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

export const convertLoginDataToAuth = (auth: Auth, data: LoginData) => {
  return {
    ...auth,
    username: data.username,
    password: "",
    role: data.role,
    status: data.status,
    token: data.token,
    token_expired: data.token_expired,
    created_time: data.created_time,
    access_token: data.access_token,
  };
};

export const convertRegisterDataToAuth = (auth: Auth, data: RegisterData) => {
  return {
    ...auth,
    username: data.username,
    password: "",
    role: data.role,
    status: data.status,
    token: data.token,
    token_expired: data.token_expired,
    created_time: data.created_time,
    access_token: data.access_token,
  };
};

export const convertResetPassworDataToAuth = (
  auth: Auth,
  data: ResetPasswordData
) => {
  return {
    ...auth,
    username: data.username,
    role: data.role,
    status: data.status,
    token: data.token,
    token_expired: data.token_expired,
    created_time: data.created_time,
    access_token: data.access_token,
  };
};

// Initial state for the Auth atom
export const initialAuthState: Auth = {
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

export const useAuthState = () => {
  const [data, setData] = useRecoilState(authAtom);
  useEffect(() => {
    const storedData = localStorage.getItem(auth_storage_key);
    if (storedData) {
      const data = JSON.parse(storedData);
      setData(data);
    }
  }, [setData]);
  useEffect(() => {
    localStorage.setItem(auth_storage_key, JSON.stringify(data));
  }, [data]);

  return [data, setData] as const;
};
