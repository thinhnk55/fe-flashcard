import LoadingSpinner from "../../common/LoadingSpinner";
import { lazyLoad } from "../../utils/lazyload";

export const Home = lazyLoad(
  () => import("./home"),
  (module) => module.default,
  { fallback: <LoadingSpinner /> }
);
