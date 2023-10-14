import React, { useEffect, useState } from "react";
import UserWithBtn from "../../Components/Shared/UserWithBtn/UserWithBtn";
import profile from "../../../public/assets/tushar.jpg";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useSelector } from "react-redux";

const BlockUser = () => {
  const [block, setBlock] = useState([]);
  const db = getDatabase();
  const userTotalInfo = useSelector((state) => state.userData.userInfo);

  useEffect(() => {
    const blockRef = ref(db, "block");
    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // if (
        //   userTotalInfo.uid === item.val().senderId ||
        //   userTotalInfo.uid === item.val().receverId
        // ) {
          arr.push({ ...item.val(), blockId: item.key });
        // }
      });
      setBlock(arr);
      console.log(block);
    });
  }, []);

  const handleUnblock =(unfriend)=>{
    console.log(unfriend);
    remove(ref(db, "block/" + unfriend.blockId)).then(()=>{
      console.log("unblock Confirm");
    })

  }

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

      {/* user design */}
      {
      block.length >0
      ?
      block.map((blockUser) => (
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
              {userTotalInfo.uid === blockUser.blockReceivedId ? (
                <h3 className="text-md font-pop text-lg font-semibold">
                  {blockUser.blockSenderName}
                </h3>
              ) : (
                <h3 className="text-md font-pop text-lg font-semibold">
                  {blockUser.blockReceivedName}
                </h3>
              )}
              <div className="mt-2 flex gap-2">
                {blockUser.blockSenderId === userTotalInfo.uid &&
                <button onClick={()=>handleUnblock(blockUser)} className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 ">
                Unblock
              </button>
                }
                
              </div>
            </div>
          </div>
        </>
      ))
    :
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
          <span>No Block User available.</span>
        </div>
    }
    </div>
  );
};

export default BlockUser;
