import { createBrowserRouter } from "react-router-dom";
import { Home } from "../../pages/home/loadable";
import { PageNotFound } from "../../pages/notfound/loadable";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
