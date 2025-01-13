import { LoadingSpinner } from "../../common/LoadingSpinner";
import { lazyLoad } from "../../utils/lazyload";

export const LoginPage = lazyLoad(
  () => import("./login"),
  (module) => module.default,
  { fallback: <LoadingSpinner /> }
);

export const RegisterPage = lazyLoad(
  () => import("./register"),
  (module) => module.default,
  { fallback: <LoadingSpinner /> }
);
