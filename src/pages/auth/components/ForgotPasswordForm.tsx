import { Logo } from "../../../common/Logo";
import { EmailInput } from "./EmailInput";
import { FormEvent, useEffect, useState } from "react";
import { validateEmail } from "../../../utils/util";
import { useTranslation } from "react-i18next";
import { CommonButton } from "../../../common/CommonButton";
import { Link, useNavigate } from "react-router-dom";
import {
  OtpEmailRequest,
  OtpEmailResponse,
  sendOtpToEmail,
} from "../../../logic/auth/api/otpEmail";
import {
  reset_password_waiting,
  useResetPasswordState,
} from "../../../logic/auth/recoil/resetpassword";

export const ForgotPasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const [resetPasswordData, setResetPasswordData] = useResetPasswordState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(resetPasswordData.username)) {
      setError("reset_password.error.email_invalid");
      return;
    }
    setIsLoading(true);
    try {
      const request: OtpEmailRequest = {
        username: resetPasswordData.username,
      };
      const response: OtpEmailResponse = await sendOtpToEmail(request);
      if (response.e === 0) {
        setError(null);
        setResetPasswordData({
          ...resetPasswordData,
          waiting: reset_password_waiting,
          checked: true,
        });
        navigate("/reset");
      } else if (response.e === 10) {
        setError("reset_password.error.email_not_found");
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
        label={t("forgot_password.username.label")}
        placeholder={t("forgot_password.username.placeholder")}
        id="forgot_password_email"
        value={resetPasswordData.username}
        onChange={(value) =>
          setResetPasswordData((prev) => ({ ...prev, username: value }))
        }
        required={true}
      />
      <ResetPasswordError message={error} />
      <ResetPasswordButton isLoading={isLoading} />
      <ResetPasswordBackToLogin />
    </form>
  );
};

const ResetPasswordButton: React.FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  const { t } = useTranslation();
  return (
    <CommonButton type="submit" isLoading={isLoading}>
      {t("forgot_password.submit.label")}
    </CommonButton>
  );
};

const ResetPasswordError: React.FC<{ message: string | null }> = ({
  message,
}) => {
  const { t } = useTranslation();
  if (!message) return null;
  return <span className="text-red-500">{t(message)}</span>;
};

const ResetPasswordBackToLogin: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Link to="/login">
      <b className="text-text-500 underline">
        {t("forgot_password.login.label")}
      </b>
    </Link>
  );
};
