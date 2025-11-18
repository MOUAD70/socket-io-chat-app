import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const GlobalLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default GlobalLayout;
