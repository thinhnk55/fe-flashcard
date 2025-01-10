import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { routerConfig } from "./routes/routes";

export const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        containerId="topRight"
        position="top-right"
        autoClose={3000}
      />
      <RouterProvider router={routerConfig} />
    </>
  );
};
