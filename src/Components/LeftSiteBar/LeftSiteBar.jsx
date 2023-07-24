import User from "../Shared/User/User";
import { FaUserFriends, FaUserTimes } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { AiFillYoutube, AiFillSetting } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const LeftSiteBar = () => {
  return (
    <div className="col-span-3">
      <NavLink to="/profile">
        <div className="ml-5">
          <User />
        </div>
      </NavLink>

      <NavLink to="/friends">
        <div className="flex ml-5 mt-2 items-center gap-4 hover:bg-slate-700 hover:rounded-lg hover:ease-in-out duration-300 hover:text-[#D9DBE0]">
          <div>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar text-4xl"
            >
              <FaUserFriends className="text-[#3393F7]" />
            </label>
          </div>
          <div>
            <h3 className="lg:text-xl font-pop font-semibold ">Friends</h3>
          </div>
        </div>
      </NavLink>

      <NavLink to="/mygroups">
        <div className="flex ml-5 mt-2 items-center gap-4 hover:bg-slate-700 hover:rounded-lg hover:ease-in-out duration-300 hover:text-[#D9DBE0]">
          <div>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar text-4xl"
            >
              <MdGroups />
            </label>
          </div>
          <div>
            <h3 className="lg:text-xl font-pop font-semibold">My groups</h3>
          </div>
        </div>
      </NavLink>

      <NavLink to="/block">
        <div className="flex ml-5 mt-2 items-center gap-4 hover:bg-slate-700 hover:rounded-lg hover:ease-in-out duration-300 hover:text-[#D9DBE0] hover:text-[#D9DBE0]">
          <div>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar text-4xl"
            >
              <FaUserTimes />
            </label>
          </div>
          <div>
            <h3 className="lg:text-xl font-pop font-semibold">Block User</h3>
          </div>
        </div>
      </NavLink>

      <NavLink to="/watch">
        <div className="flex ml-5 mt-2 items-center gap-4 hover:bg-slate-700 hover:rounded-lg hover:ease-in-out duration-300 hover:text-[#D9DBE0]">
          <div>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar text-4xl"
            >
              <AiFillYoutube />
            </label>
          </div>
          <div>
            <h3 className="lg:text-xl font-pop font-semibold">Watch</h3>
          </div>
        </div>
      </NavLink>

      <NavLink to="/settings">
        <div className="flex ml-5 mt-2 items-center gap-4 hover:bg-slate-700 hover:rounded-lg hover:ease-in-out duration-300 hover:text-[#D9DBE0]">
          <div>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar text-4xl"
            >
              <AiFillSetting />
            </label>
          </div>
          <div>
            <h3 className="lg:text-xl font-pop font-semibold">Settings</h3>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default LeftSiteBar;
