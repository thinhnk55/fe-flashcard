import { LoadingSpinner } from "../../common/LoadingSpinner";
const LoadingPage: React.FC = () => {
  return (
    <div className="bg-white flex justify-center">
      <div className="bg-background-100 flex flex-col justify-center items-center w-screen max-w-[800px] min-w-[375px] min-h-screen shadow-lg p-1">
        <LoadingSpinner className="w-16 h-16" />
      </div>
    </div>
  );
};
export default LoadingPage;
