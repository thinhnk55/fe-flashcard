import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CommonButton } from "../../../common/CommonButton";
import { Logo } from "../../../common/Logo";
import { EmailInput } from "./EmailInput";
import { PasswordInput } from "./PasswordInput";
import { useTranslation } from "react-i18next";
import { validateEmail, validateLength } from "../../../utils/util";
import { useAuthState } from "../../../logic/auth/hook";
import {
  handleLogin,
  LoginRequest,
  LoginResponse,
} from "../../../logic/auth/api/login";
import { convertLoginDataToAuth } from "../../../logic/auth/recoil";

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [auth, setAuth] = useAuthState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(auth.username)) {
      setError("login.error.email_invalid");
      return;
    }
    if (!validateLength(auth.password, 6, 50)) {
      setError("login.error.password_invalid");
      return;
    }
    setIsLoading(true);
    try {
      const loginRequest: LoginRequest = {
        username: auth.username,
        password: auth.password,
      };
      const response: LoginResponse = await handleLogin(loginRequest);
      if (response.e == 0) {
        console.log("Login Response:", response);
        if (response.d) {
          const newAuth = convertLoginDataToAuth(auth, response.d);
          setAuth(newAuth);
        }
        setError(null);
        navigate("/");
      } else if (response.e == 10) {
        setError("login.error.email_not_found");
      } else if (response.e == 11) {
        setError("login.error.password_incorrect");
      } else {
        setError("common.error.system_error");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? "common.error.system_error"
          : "common.error.system_error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-start items-center bg-white w-full max-w-96 p-8 gap-4 drop-shadow rounded-md border border-primary-500"
    >
      <Logo />
      <EmailInput
        label={t("login.username.label")}
        placeholder={t("login.username.placeholder")}
        value={auth.username}
        onChange={(value) => setAuth((prev) => ({ ...prev, username: value }))}
        required
      />
      <div className="w-full flex flex-col gap-1">
        <PasswordInput
          label={t("login.password.label")}
          placeholder={t("login.password.placeholder")}
          id="password"
          value={auth.password}
          onChange={(value) =>
            setAuth((prev) => ({ ...prev, password: value }))
          }
          required
        />
        <LoginForgotPassword />
      </div>
      <LoginError message={error} />
      <LoginButton isLoading={isLoading} />
      <LoginRedirect />
    </form>
  );
};
const LoginForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Link to="/forgot">
      <b className="text-sm text-text-500 underline">
        {t("login.forgot_password.label")}
      </b>
    </Link>
  );
};

const LoginButton: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const { t } = useTranslation();
  return (
    <CommonButton type="submit" isLoading={isLoading}>
      {t("login.submit.label")}
    </CommonButton>
  );
};

const LoginError: React.FC<{ message: string | null }> = ({ message }) => {
  const { t } = useTranslation();
  if (!message) return null;
  return <span className="text-red-500">{t(message)}</span>;
};

const LoginRedirect: React.FC = () => {
  const { t } = useTranslation();
  return (
    <span className="text-text-950">
      {t("login.redirect.message")}{" "}
      <Link to="/register">
        <b className="text-text-500 underline">{t("login.redirect.action")}</b>
      </Link>
    </span>
  );
};
