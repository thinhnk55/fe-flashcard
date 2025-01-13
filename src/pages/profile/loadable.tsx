import { lazyLoad } from "../../utils/lazyload";

export const ProfilePage = lazyLoad(
  () => import("./profile"),
  (module) => module.default
);
