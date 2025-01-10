import { createRoot } from "react-dom/client";
import "./index.css";
import "./services/i18n/index.ts";
import { RecoilRoot } from "recoil";
import { App } from "./app/App.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </>
);
