import { createBrowserRouter } from "react-router-dom";
import { Home } from "../../pages/home/loadable";
import { PageNotFound } from "../../pages/notfound/loadable";
import { LoginPage } from "../../pages/auth/loadable";
import RegisterPage from "../../pages/auth/register";
import ProfilePage from "../../pages/profile/profile";
import ForgotPasswordPage from "../../pages/auth/forgotpassword";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
