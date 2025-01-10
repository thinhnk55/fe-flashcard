import { Header } from "../../common/Header";
import { HomeIntro } from "./components/HomeIntro";

const Home: React.FC = () => {
  return (
    <div className="bg-white flex justify-center">
      <div className="bg-background-100 flex flex-col gap-1 w-screen max-w-[800px] min-w-[375px] min-h-screen shadow-lg">
        <Header />
        <div className="h-[calc(100vh-68px)] flex justify-center items-center bg-white drop-shadow">
          <HomeIntro />
        </div>
      </div>
    </div>
  );
};
export default Home;
