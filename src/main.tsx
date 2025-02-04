import { createRoot } from "react-dom/client";
import "./index.css";
import "./services/i18n/index.ts";
import { RecoilRoot } from "recoil";
import { App } from "./app/App.tsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <>
    <RecoilRoot>
      <GoogleOAuthProvider clientId="964566180182-474bijs8fr6a3n6f1l9nk7v2u8nu6er9.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </RecoilRoot>
  </>
);
