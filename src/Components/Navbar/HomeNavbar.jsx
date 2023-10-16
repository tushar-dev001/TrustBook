
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { MdGroups2 } from "react-icons/md";
import { BsMessenger } from "react-icons/bs";
import DarkMode from "../DarkMode/DarkMode";
import Logout from "../Logout/Logout";
import { useSelector } from "react-redux";

const HomeNavbar = () => {

  const userTotalInfo = useSelector((state) => state.userData.userInfo);


  return (
    <div className="sm:navbar bg-primary flex md:flex-row flex-col items-center fixed z-10 -mt-5 w-full">
      {/* Navbar left part  */}
      <div className="md:navbar-start">
        <Link
          className="btn btn-ghost normal-case text-xl text-white"
          to="/home"
        >
          TrustBook
        </Link>
      </div>

      {/* Navbar middle part  */}
      <div className="navbar-center bg-primary md:pt-2">
        <ul className="menu menu-horizontal px-1 text-white lg:gap-12">
          <li className="text-3xl lg:text-4xl">
            <Link to="/home">
              <AiFillHome />
            </Link>
          </li>
          <li className="text-3xl lg:text-4xl">
            <Link to="/friendspart">
              <FaUserFriends />
            </Link>
          </li>
          <li className="text-3xl lg:text-4xl">
            <Link to="/notification">
              <IoIosNotifications />
            </Link>
          </li>
          <li className="text-3xl lg:text-4xl">
            <Link to="/groups">
              <MdGroups2 />
            </Link>
          </li>
          <li className="text-3xl lg:text-4xl mr-2">
            <Link to="/message">
              <BsMessenger />
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar right part  */}
      <div className="bg-primary md:p-2.5 gap-2 md:navbar-end md:gap-4 flex md:align-center">
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 lg:w-14 rounded-full">
                <img src={userTotalInfo.photoURL} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-44 lg:w-96"
            >
              <li>
                <Link to="/profile" className="justify-between lg:text-xl">
                  Profile
                  <span className="badge lg:text-xl">New</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className="lg:text-xl">
                  Settings
                </Link>
              </li>
              <li>
                  <Logout />
              </li>
            </ul>
          </div>
        </div>
        <div>
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
