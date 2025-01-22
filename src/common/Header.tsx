import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "./LanguageSwitch";
import LetterAvatar from "./LetterAvatar";
import { useAuthState } from "../logic/auth/recoil/auth";

export const Header: React.FC = () => {
  const [auth] = useAuthState();
  const { t } = useTranslation();
  return (
    <header className="h-16 flex p-4 justify-between items-center bg-white drop-shadow">
      <Logo />
      <div className="flex gap-4">
        {auth.token ? (
          <LetterAvatar name={auth.username} />
        ) : (
          <Link to={"/login"}>
            <button className="flex flex-row items-center text-white  bg-primary-600 rounded-md p-2">
              <span>{t("header.button.login")}</span>
            </button>
          </Link>
        )}
        <LanguageSwitch />
      </div>
    </header>
  );
};
