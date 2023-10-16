
import { NavLink, Outlet } from "react-router-dom";
import ScrollButton from "../ScrollButton/ScrollButton";

const FriendsPartDesign = () => {
  return (
    <>
      <div className="md:grid mb-4 gap-3 justify-center flex items-center md:grid-cols-12 lg:gap-2 mx-auto mt-24">
        <div className=" col-span-4 ">
          <NavLink to="friends">

            <button className="px-4 py-2 bg-[#641AE6] rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-[#541AE6] hover:hover:ease-in-out duration-100  font-pop lg:text-lg lg:font-semibold">
              Friends
            </button>
          </NavLink>
        </div>
        <div className=" col-span-4">
        <NavLink to="suggestion">
            <button className="px-4 py-2 bg-[#641AE6] rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-[#541AE6] hover:hover:ease-in-out duration-100  font-pop lg:text-lg lg:font-semibold">
              User List
            </button>
          </NavLink>
        </div>
        <div className=" col-span-4 ">
        <NavLink to="friendRequest">
            <button className="px-4 py-2 bg-[#641AE6] rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-[#541AE6] hover:hover:ease-in-out duration-100  font-pop lg:text-lg lg:font-semibold">
              Friend Request
            </button>
          </NavLink>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default FriendsPartDesign;
