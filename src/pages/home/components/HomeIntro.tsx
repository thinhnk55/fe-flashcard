import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const HomeIntro: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-4 p-4 items-center">
      <span className="text-4xl">{t("home.intro.message")}</span>
      <Link to={"/login"}>
        <button className="flex flex-row items-center text-white text-4xl  bg-primary-600 rounded-md px-8 py-4">
          <span>{t("home.intro.button.try_now")}</span>
        </button>
      </Link>
    </div>
  );
};
