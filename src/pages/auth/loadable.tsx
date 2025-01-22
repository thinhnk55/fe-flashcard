import { lazyLoad } from "../../utils/lazyload";
import LoadingPage from "../notfound/loading";

export const LoginPage = lazyLoad(
  () => import("./login"),
  (module) => module.default,
  { fallback: <LoadingPage /> }
);

export const RegisterPage = lazyLoad(
  () => import("./register"),
  (module) => module.default,
  { fallback: <LoadingPage /> }
);

export const ForgotPasswordPage = lazyLoad(
  () => import("./forgotpassword"),
  (module) => module.default,
  { fallback: <LoadingPage /> }
);

export const ResetPasswordPage = lazyLoad(
  () => import("./resetpassword"),
  (module) => module.default,
  { fallback: <LoadingPage /> }
);
