import { useRecoilState } from "recoil";
import { useEffect } from "react";
import {
  auth_storage_key,
  authAtom,
  forgot_password_storage_key,
  forgotPasswordAtom,
} from "./recoil";

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

export const useForgotPasswordState = () => {
  const [data, setData] = useRecoilState(forgotPasswordAtom);
  useEffect(() => {
    const storedData = localStorage.getItem(forgot_password_storage_key);
    if (storedData) {
      const data = JSON.parse(storedData);
      setData(data);
    }
  }, [setData]);
  useEffect(() => {
    localStorage.setItem(forgot_password_storage_key, JSON.stringify(data));
  }, [data]);
  return [data, setData] as const;
};
