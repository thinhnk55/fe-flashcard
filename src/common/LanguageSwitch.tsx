import { Icon } from "@iconify/react/dist/iconify.js";
import i18next from "i18next";
import { useState } from "react";

const LanguageSwitch: React.FC = () => {
  const [language, setLanguage] = useState(i18next.language);
  const toggleLanguage = () => {
    const newLanguage = i18next.language === "vi" ? "en" : "vi";
    localStorage.setItem("language", newLanguage);
    i18next.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <button onClick={toggleLanguage}>
      <Icon
        icon={
          language === "en" ? "emojione:flag-for-vietnam" : "circle-flags:uk"
        }
        width={36}
        height={36}
      />
    </button>
  );
};

export default LanguageSwitch;
