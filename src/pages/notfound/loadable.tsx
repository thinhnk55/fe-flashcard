import { lazyLoad } from "../../utils/lazyload";

export const PageNotFound = lazyLoad(
  () => import("./notfound"),
  (module) => module.default
);
