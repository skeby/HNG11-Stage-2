import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="w-full container mx-auto px-5 py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
