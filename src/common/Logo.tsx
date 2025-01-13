import { useNavigate } from "react-router-dom";
export const Logo: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <span
      className="font-inknut text-xl md:text-4xl text-primary-400 font-bold cursor-pointer"
      onClick={handleClick}
    >
      Flashcard
    </span>
  );
};
