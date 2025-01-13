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
}

export const convertLoginDataToAuth = (auth: Auth, loginData: LoginData) => {
  return {
    ...auth,
    role: loginData.role,
    status: loginData.status,
    token: loginData.token,
    token_expired: loginData.token_expired,
    created_time: loginData.created_time,
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
