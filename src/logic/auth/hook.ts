import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { auth_storage_key, authAtom } from "./recoil";

export const useAuthState = () => {
  const [auth, setAuth] = useRecoilState(authAtom);

  // Load initial state from local storage
  useEffect(() => {
    const storeAuthData = localStorage.getItem(auth_storage_key);
    if (storeAuthData) {
      const storedAuth = JSON.parse(storeAuthData);
      setAuth(storedAuth);
    }
  }, [setAuth]);
  // Sync state to local storage whenever auth changes
  useEffect(() => {
    localStorage.setItem(auth_storage_key, JSON.stringify(auth));
  }, [auth]);

  return [auth, setAuth] as const;
};
