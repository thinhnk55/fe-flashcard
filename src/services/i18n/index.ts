import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/ns1.json";
import vi from "./locales/vi/ns1.json";

export const defaultNS = "ns1";

const savedLanguage = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  lng: savedLanguage,
  fallbackLng: "en",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    vi: {
      ns1: vi,
    },
    en: {
      ns1: en,
    },
  },
});

export default i18n;

export const translate = (
  key: string,
  options?: Record<string, unknown>
): string => {
  return i18n.t(key, options);
};
