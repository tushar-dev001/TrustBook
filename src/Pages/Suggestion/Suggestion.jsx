import { useEffect, useState } from "react";
import UserWithBtn from "../../Components/Shared/UserWithBtn/UserWithBtn";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "../../firebase/firebase.config";
import { useSelector } from "react-redux";

const Suggestion = () => {
  const [userList, setUserList] = useState([]);
  const db = getDatabase();
  const userTotalInfo = useSelector((state) => state.userData.userInfo);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // akhon je login ache tar sathe jodi user list er uid mile jai taile take user list a dekhabena.
        if (userTotalInfo.uid !== item.key) {
          arr.push(item.val());
        }
      });
      setUserList(arr);
    });
  }, []);

  return (
    <div>
      <form>
        <input className="p-2 rounded-3xl" type="search" name="" id="" />
        <button
          className="px-4 py-2 ml-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100"
          type="submit"
        >
          Search
        </button>
      </form>

      {userList.map((user) => (
        <>
          <div className="flex lg:ml-2 lg:mt-2 gap-4">
            <div>
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 lg:w-20 rounded-full">
                  <img src="/public/assets/tushar.png" />
                </div>
              </label>
            </div>

            <div>
              <h3 className="text-md font-pop text-lg font-semibold">
                {user.username}
              </h3>
              <p className="font-pop text-sm">{user.email}</p>
              <div className="mt-2 flex gap-2">
                <button className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 ">
                  Add Request
                </button>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Suggestion;
