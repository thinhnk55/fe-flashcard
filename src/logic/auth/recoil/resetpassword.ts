import { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

export interface ResetPasswordData {
  username: string;
  otp: string;
  password: string;
  waiting: number;
  checked: boolean;
}

export const initialresetPasswordState: ResetPasswordData = {
  username: "",
  otp: "",
  password: "",
  waiting: 0,
  checked: false,
};

export const reset_password_storage_key = "reset_password";
export const reset_password_waiting = 60;

export const loadresetPasswordFromLocalStorage = () => {
  try {
    const storedData = localStorage.getItem(reset_password_storage_key);
    if (storedData) {
      const data = JSON.parse(storedData) as ResetPasswordData;
      return data;
    } else {
      return initialresetPasswordState;
    }
  } catch (error) {
    console.error("Failed to parse auth data from localStorage:", error);
    return initialresetPasswordState;
  }
};

export const resetPasswordAtom = atom<ResetPasswordData>({
  key: "resetPasswordAtom",
  default: loadresetPasswordFromLocalStorage(),
});

export const useResetPasswordState = () => {
  const [data, setData] = useRecoilState(resetPasswordAtom);
  useEffect(() => {
    // console.log("useresetPasswordState updated", JSON.stringify(data));
    localStorage.setItem(reset_password_storage_key, JSON.stringify(data));
  }, [data]);
  return [data, setData] as const;
};
