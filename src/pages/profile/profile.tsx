import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useAuthState } from "../../logic/auth/hook";
import { CommonButton } from "../../common/CommonButton";
import LetterAvatar from "../../common/LetterAvatar";
import { Header } from "../../common/Header";
import { useTranslation } from "react-i18next";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const [auth, setAuth] = useAuthState(); // Access auth state
  const navigate = useNavigate(); // Hook for navigating programmatically

  // Redirect to login page if the user is not logged in
  useEffect(() => {
    if (!auth.token) {
      navigate("/login"); // Redirect to login page
    }
  }, [auth.token, navigate]);

  // Logout handler
  const handleLogout = () => {
    setAuth({
      username: "",
      password: "",
      role: 0,
      status: 0,
      token_expired: 0,
      token: "",
      created_time: 0,
    }); // Reset auth state
    localStorage.removeItem("auth_data");
    navigate("/login");
  };

  return (
    <div className="bg-white flex justify-center">
      <div className="bg-background-100 flex flex-col gap-1 w-screen max-w-[800px] min-w-[375px] min-h-screen shadow-lg">
        <Header />
        <div className="h-[calc(100vh-68px)] flex justify-center items-center bg-white drop-shadow">
          <div className="flex flex-col gap-4 items-center">
            <LetterAvatar name={auth.username} style="w-16 h-16 text-2xl" />
            <CommonButton onClick={handleLogout}>
              {t("profile.button.logout")}
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
