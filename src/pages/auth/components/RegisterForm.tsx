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
  handleRegister,
  RegisterRequest,
  RegisterResponse,
} from "../../../logic/auth/api/register";
import { convertRegisterDataToAuth } from "../../../logic/auth/recoil";

export const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const [auth, setAuth] = useAuthState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(auth.username)) {
      setError("register.error.email_invalid");
      return;
    }
    if (!validateLength(auth.password, 6, 50)) {
      setError("register.error.password_invalid");
      return;
    }
    if (auth.password !== confirmedPassword) {
      setError("register.error.password_not_matched");
      return;
    }
    setIsLoading(true);
    try {
      const RegisterRequest: RegisterRequest = {
        username: auth.username,
        password: auth.password,
      };
      const response: RegisterResponse = await handleRegister(RegisterRequest);
      if (response.e == 0) {
        console.log("Register Response:", response);
        if (response.d) {
          const newAuth = convertRegisterDataToAuth(auth, response.d);
          setAuth(newAuth);
        }
        setError(null);
        navigate("/");
      } else if (response.e == 10) {
        setError("register.error.email_existing");
      } else {
        setError("register.error.system_error");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? "register.error.system_error"
          : "register.error.system_error"
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
        value={auth.username}
        onChange={(value) => setAuth((prev) => ({ ...prev, username: value }))}
        required
      />
      <PasswordInput
        label={t("register.password.label")}
        placeholder={t("register.password.placeholder")}
        id="password"
        value={auth.password}
        onChange={(value) => setAuth((prev) => ({ ...prev, password: value }))}
        required
      />
      <PasswordInput
        label={t("register.confirm_password.label")}
        placeholder={t("register.confirm_password.placeholder")}
        id="confirm_password"
        value={confirmedPassword}
        onChange={(value) => setConfirmedPassword(value)}
        required
      />
      <RegisterError message={error} />
      <RegisterButton isLoading={isLoading} />
      <RegisterRedirect />
    </form>
  );
};

const RegisterButton: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const { t } = useTranslation();
  return (
    <CommonButton type="submit" isLoading={isLoading}>
      {t("register.submit.label")}
    </CommonButton>
  );
};

const RegisterError: React.FC<{ message: string | null }> = ({ message }) => {
  const { t } = useTranslation();
  if (!message) return null;
  return <span className="text-red-500">{t(message)}</span>;
};

const RegisterRedirect: React.FC = () => {
  const { t } = useTranslation();
  return (
    <span className="text-text-950">
      {t("register.redirect.message")}{" "}
      <Link to="/login">
        <b className="text-text-500 underline">
          {t("register.redirect.action")}
        </b>
      </Link>
    </span>
  );
};
