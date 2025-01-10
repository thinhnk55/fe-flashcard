import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "./LanguageSwitch";

export const Header: React.FC = () => {
  const { t } = useTranslation();
  return (
    <header className="h-16 flex p-4 justify-between items-center bg-white drop-shadow">
      <Logo />
      <div className="flex gap-4">
        <LanguageSwitch />
        <Link to={"/login"}>
          <button className="flex flex-row items-center text-white  bg-primary-600 rounded-md p-2">
            <span>{t("header.button.login")}</span>
          </button>
        </Link>
      </div>
    </header>
  );
};
