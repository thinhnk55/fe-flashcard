import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
const PageNotFound: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="h-screen flex justify-center items-center bg-background-200">
      <div className="flex flex-col items-center justify-center border p-16 gap-8 rounded-md drop-shadow-sm bg-background-50">
        <Link to={"/"}>
          <button className="flex flex-row items-center text-xl text-white gap-2 bg-primary-600 p-4 rounded-md">
            <Icon icon="ic:round-home" width={24} height={24} />
            <span>{t("notfound.message")}</span>
          </button>
        </Link>
        <div className="text-9xl font-extrabold text-text-600">404</div>
        <p className="text-xl font-bold text-text-600">{t("notfound.error")}</p>
      </div>
    </div>
  );
};

export default PageNotFound;
