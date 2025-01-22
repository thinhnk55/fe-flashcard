import { Logo } from "../../../common/Logo";
import { FormEvent, useEffect, useState } from "react";
import { validateLength } from "../../../utils/util";
import { useTranslation } from "react-i18next";
import { CommonButton } from "../../../common/CommonButton";
import { Link, useNavigate } from "react-router-dom";
import {
  convertResetPassworDataToAuth,
  useAuthState,
} from "../../../logic/auth/recoil/auth";
import {
  OtpEmailRequest,
  OtpEmailResponse,
  sendOtpToEmail,
} from "../../../logic/auth/api/otpEmail";
import {
  reset_password_waiting,
  ResetPasswordData,
  useResetPasswordState,
} from "../../../logic/auth/recoil/resetpassword";

import { PasswordInput } from "./PasswordInput";
import OTPInput from "../../../common/OTPInput";
import {
  resetPassword,
  ResetPasswordRequest,
} from "../../../logic/auth/api/resetpassword";
import { RegisterResponse } from "../../../logic/auth/api/register";

export const ResetPasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const [auth, setAuth] = useAuthState();
  const [resetPasswordData, setResetPasswordData] = useResetPasswordState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!resetPasswordData.checked) {
      navigate("/");
    }
  }, [resetPasswordData, navigate]);

  useEffect(() => {
    if (resetPasswordData.waiting > 0) {
      const intervalId = setInterval(() => {
        setResetPasswordData((prevData) => ({
          ...prevData,
          waiting: prevData.waiting - 1,
        }));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [resetPasswordData.waiting, setResetPasswordData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateLength(resetPasswordData.password, 6, 50)) {
      setError("reset.error.password_invalid");
      return;
    }
    if (resetPasswordData.password !== confirmedPassword) {
      setError("reset.error.password_not_matched");
      return;
    }
    setIsLoading(true);
    try {
      const resetPasswordRequest: ResetPasswordRequest = {
        username: resetPasswordData.username,
        otp: resetPasswordData.otp,
        password: resetPasswordData.password,
      };
      const response: RegisterResponse = await resetPassword(
        resetPasswordRequest
      );
      if (response.e == 0) {
        console.log("ResetPassword Response:", response);
        if (response.d) {
          const newAuth = convertResetPassworDataToAuth(auth, response.d);
          setAuth(newAuth);
        }
        setError(null);
        setResetPasswordData({
          ...resetPasswordData,
          password: "",
          otp: "",
          waiting: 0,
        });
        navigate("/");
      } else if (response.e == 10) {
        setError("reset.error.otp_not_found");
      } else if (response.e == 11) {
        setError("reset.error.otp_invalid");
      } else if (response.e == 12) {
        setError("reset.error.otp_exprired");
      } else if (response.e == 13) {
        setError("reset.error.otp_used");
      } else {
        setError("common.error.system_error");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleOtpChange = (newOtp: string) => {
    const updatedData = {
      ...resetPasswordData,
      otp: newOtp,
    };
    console.log(JSON.stringify(updatedData));
    setResetPasswordData(updatedData);
  };

  const resendPassword = async () => {
    try {
      const request: OtpEmailRequest = {
        username: resetPasswordData.username,
      };
      const response: OtpEmailResponse = await sendOtpToEmail(request);
      if (response.e === 0) {
        setError(null);
        const updatedData = {
          ...resetPasswordData,
          waiting: reset_password_waiting,
        };
        console.log(JSON.stringify(updatedData));
        setResetPasswordData(updatedData);
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
      <ResetPasswordResend
        resetPasswordData={resetPasswordData}
        resendPassword={resendPassword}
      />
      <OTPInput value={resetPasswordData.otp} onChange={handleOtpChange} />
      <PasswordInput
        label={t("reset.password.label")}
        placeholder={t("reset.password.placeholder")}
        id="reset_password"
        value={resetPasswordData.password}
        onChange={(value) =>
          setResetPasswordData((prev) => ({ ...prev, password: value }))
        }
        required={true}
      />
      <PasswordInput
        label={t("reset.confirm_password.label")}
        placeholder={t("reset.confirm_password.placeholder")}
        id="resetconfirm_password"
        value={confirmedPassword}
        onChange={(value) => setConfirmedPassword(value)}
        required={true}
      />
      <ResetPasswordError message={error} />
      <ResetPasswordButton isLoading={isLoading} />
      <ResetPasswordBack />
    </form>
  );
};

interface ResetPasswordResendProps {
  resetPasswordData: ResetPasswordData;
  resendPassword: () => void;
}

const ResetPasswordResend: React.FC<ResetPasswordResendProps> = ({
  resetPasswordData,
  resendPassword,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1">
      <p className="text-text-700">
        {t("reset.email.instruction")}{" "}
        <span className="text-text-900 font-bold">
          {resetPasswordData.username}
        </span>
      </p>
      {resetPasswordData.waiting === 0 ? (
        <button
          className="text-text-500 underline cursor-pointer font-bold"
          onClick={resendPassword}
        >
          {t("reset.email.action")}
        </button>
      ) : (
        <p className="text-text-700">
          {t("reset.email.waiting_1")}{" "}
          <span className="text-text-900 font-bold">
            {resetPasswordData.waiting}
          </span>{" "}
          {t("reset.email.waiting_2")}
        </p>
      )}
    </div>
  );
};

const ResetPasswordButton: React.FC<{ isLoading: boolean }> = ({
  isLoading,
}) => {
  const { t } = useTranslation();
  return (
    <CommonButton type="submit" isLoading={isLoading}>
      {t("reset.submit.label")}
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

const ResetPasswordBack: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Link to="/forgot">
      <b className="text-text-500 underline">{t("reset.back.label")}</b>
    </Link>
  );
};
