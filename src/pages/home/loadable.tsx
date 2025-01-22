import { lazyLoad } from "../../utils/lazyload";
import LoadingPage from "../notfound/loading";

export const Home = lazyLoad(
  () => import("./home"),
  (module) => module.default,
  { fallback: <LoadingPage /> }
);
