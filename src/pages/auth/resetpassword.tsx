import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResetPasswordForm } from "./components/ResetPasswordForm";
import { useAuthState } from "../../logic/auth/recoil/auth";

const ResetPasswordPage: React.FC = () => {
  const [auth] = useAuthState();
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  }, [auth.token, navigate]);

  return (
    <div className="bg-white flex justify-center">
      <div className="bg-background-100 flex flex-col justify-center items-center w-screen max-w-[800px] min-w-[375px] min-h-screen shadow-lg p-1">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
