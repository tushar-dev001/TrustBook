
import { Link } from "react-router-dom";
import DarkMode from "../DarkMode/DarkMode";

const Navbar = () => {
  return (
    <div className="navbar bg-primary text-white flex flex-wrap md:flex-none">
      <div className="flex-1">
        <button className="btn btn-ghost normal-case text-xl">TrustBook</button>
      </div>
      <div className="md:flex-none p-2 pr-5 gap-4 flex flex-wrap">
        <Link to="/login">
          <button className="btn btn-secondary text-white">Login</button>
        </Link>
        <Link to="/">
          <button className="btn btn-secondary text-white">Register</button>
        </Link>

        <DarkMode />
      </div>
    </div>
  );
};

export default Navbar;
