import { createBrowserRouter } from "react-router-dom";
import { Home } from "../../pages/home/loadable";
import { PageNotFound } from "../../pages/notfound/loadable";
import { ProfilePage } from "../../pages/profile/loadable";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "../../pages/auth/loadable";

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
    path: "/reset",
    element: <ResetPasswordPage />,
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
