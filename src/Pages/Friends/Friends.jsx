import { useEffect, useState } from "react";
import profile from "../../../public/assets/tushar.jpg";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
const Friends = () => {
  const [friends, setFriends] = useState([]);
  const db = getDatabase();
  const userTotalInfo = useSelector((state) => state.userData.userInfo);

  useEffect(() => {
    const friendsRef = ref(db, "friends");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          userTotalInfo.uid === item.val().senderId ||
          userTotalInfo.uid === item.val().receverId
        ) {
          arr.push({ ...item.val(), userId: item.key });
        }
      });
      setFriends(arr);
    });
  }, []);

  const handleUnfriend = (unfriend) => {
    remove(ref(db, "friends/" + unfriend.userId)).then(() => {
      console.log("unfriend Confirm");
    });
  };

  const handleBlock = (block) => {
    console.log(block);
    // console.log(userTotalInfo.uid == block.senderId);
    // console.log(userTotalInfo.uid == block.receverId);
    // console.log(block);
    if (userTotalInfo.uid === block.senderId) {
      set(push(ref(db, "block")), {
        blockReceivedId: block.receverId,
        blockReceivedName: block.receverName,
        blockSenderId: block.senderId,
        blockSenderName: block.senderName,
      }).then(() => {
        remove(ref(db, "friends/" + block.userId)).then(() => {
          console.log("Block successfully");
        });
      });
    } else {
      set(push(ref(db, "block")), {
        blockReceivedId: block.senderId,
        blockReceivedName: block.senderName,
        blockSenderId: block.receverId,
        blockSenderName: block.receverName,
      }).then(() => {
        remove(ref(db, "friends/" + block.userId)).then(() => {
          console.log("Block successfully");
        });
      });
    }
  };

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
      {/* user list */}
      {friends.length > 0 ? (
        friends.map((friend) => (
          <>
            <div className="flex lg:ml-2 lg:mt-2 gap-4">
              <div>
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 lg:w-20 rounded-full">
                    <img src={profile} />
                  </div>
                </label>
              </div>

              <div>
                {userTotalInfo.uid === friend.senderId ? (
                  <h3 className="text-md font-pop text-lg font-semibold">
                    {friend.receverName}
                  </h3>
                ) : (
                  <h3 className="text-md font-pop text-lg font-semibold">
                    {friend.senderName}
                  </h3>
                )}
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleUnfriend(friend)}
                    className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 "
                  >
                    Unfriend
                  </button>
                  <button
                    onClick={() => handleBlock(friend)}
                    className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 "
                  >
                    Block
                  </button>
                </div>
              </div>
            </div>
          </>
        ))
      ) : (
        <div className="alert alert-info mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>No Friends available.</span>
        </div>
      )}
    </div>
  );
};

export default Friends;
