
import { Outlet } from "react-router-dom";
import HomeNavbar from "../Components/Navbar/HomeNavbar";
import LeftSiteBar from "../Components/LeftSiteBar/LeftSiteBar";
import RightSideBar from "../Components/RightSideBar/RightSideBar";

const RootLayOut = () => {
  return (
    <div>
      <HomeNavbar />
      <div className="grid  sm:grid-cols-12 gap-5 mx-auto mt-5 ">
        <div className="hidden md:block col-span-3">
        <LeftSiteBar />
        </div>
        <div className=" col-span-6 ">
          <Outlet />
        </div>
        <div className="hidden md:block col-span-3 ">
          <RightSideBar/>
        </div>
      </div>
    </div>
  );
};

export default RootLayOut;
