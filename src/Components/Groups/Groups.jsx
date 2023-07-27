import React from "react";
import GroupList from "../../Pages/GroupList/GroupList";
import MyGroups from "../../Pages/MyGroups/MyGroups";
import { NavLink, Outlet } from "react-router-dom";

const Groups = () => {
  return (
    <>
      <div className="md:grid mb-4 gap-3 justify-center flex items-center md:grid-cols-12 lg:gap-2 mx-auto">
        <div className=" col-span-6 ">
          <NavLink to="grouplist">

            <button className="px-4 py-2 bg-[#641AE6] rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-[#541AE6] hover:hover:ease-in-out duration-100  font-pop lg:text-lg lg:font-semibold">
              Group List
            </button>
          </NavLink>
        </div>


        <div className=" col-span-6">
        <NavLink to="mygroups">
            <button className="px-4 py-2 bg-[#641AE6] rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-[#541AE6] hover:hover:ease-in-out duration-100  font-pop lg:text-lg lg:font-semibold">
              My Groups
            </button>
          </NavLink>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Groups;
