import { lazyLoad } from "../../utils/lazyload";
import LoadingPage from "./loading";

export const PageNotFound = lazyLoad(
  () => import("./notfound"),
  (module) => module.default,
  { fallback: <LoadingPage /> }
);
