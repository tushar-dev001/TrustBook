import User from "../Shared/User/User";
import { FaUserFriends, FaUserTimes } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { AiFillYoutube, AiFillSetting, AiOutlineUserAdd } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import profile from '../../../public/assets/tushar.jpg'

const LeftSiteBar = () => {
  const userTotalInfo = useSelector((state) => state.userData.userInfo);
  console.log(userTotalInfo);

  return (
    <div className="col-span-3">
      {/* Login user */}
      <NavLink to="/profile">
        <div className="ml-5">
          <div className="flex items-center gap-4 hover:bg-slate-700 hover:rounded-lg hover:ease-in-out duration-300 hover:text-[#D9DBE0]">
            <div>
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 lg:w-10 rounded-full">
                  <img src={userTotalInfo.photoURL} />
                </div>
              </label>
            </div>

            <div>
              <h3 className="text-md font-pop font-semibold">{userTotalInfo.displayName}</h3>
            </div>
          </div>
        </div>
      </NavLink>

      <NavLink to="friendspart/suggestion">
        <div className="flex ml-5 mt-2 items-center gap-4 hover:bg-slate-700 hover:rounded-lg hover:ease-in-out duration-300 hover:text-[#D9DBE0]">
          <div>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar text-4xl"
            >
              <AiOutlineUserAdd />
            </label>
          </div>
          <div>
            <h3 className="lg:text-xl font-pop font-semibold ">User List</h3>
          </div>
        </div>
      </NavLink>

      <NavLink to="friendspart/friends">
        <div className="flex ml-5 mt-2 items-center gap-4 hover:bg-slate-700 hover:rounded-lg hover:ease-in-out duration-300 hover:text-[#D9DBE0]">
          <div>
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar text-4xl"
            >
              <FaUserFriends />
            </label>
          </div>
          <div>
            <h3 className="lg:text-xl font-pop font-semibold ">Friends</h3>
          </div>
        </div>
      </NavLink>

      <NavLink to="groups/mygroups">
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

      <NavLink to="https://www.youtube.com/" target="_blank">
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
