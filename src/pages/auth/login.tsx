import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { LoginForm } from "./components/LoginForm";
import { useAuthState } from "../../logic/auth/hook";

const LoginPage: React.FC = () => {
  const [auth] = useAuthState(); // Access auth state
  const navigate = useNavigate(); // Hook for navigating programmatically

  // Redirect to the homepage if the user is logged in
  useEffect(() => {
    if (auth.token) {
      navigate("/"); // Redirect to homepage
    }
  }, [auth.token, navigate]); // Only run when auth.isLoggedIn changes

  return (
    <div className="bg-white flex justify-center">
      <div className="bg-background-100 flex flex-col justify-center items-center w-screen max-w-[800px] min-w-[375px] min-h-screen shadow-lg p-1">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;