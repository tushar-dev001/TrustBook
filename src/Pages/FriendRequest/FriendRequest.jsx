import { useEffect, useState } from "react";
import profile from "../../../public/assets/tushar.jpg";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const [friendRequest, setFriendRequest] = useState([]);
  const db = getDatabase();
  const userTotalInfo = useSelector((state) => state.userData.userInfo);

  useEffect(() => {
    const friendRequestRef = ref(db, "friendRequest");
    onValue(friendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userTotalInfo.uid === item.val().receverId) {
          arr.push({...item.val(), userId:item.key});
        }
      });
      setFriendRequest(arr);
    });
    console.log(friendRequest);
  }, []);

  const handleDeleteFriendRequest =(friendDelete)=>{
    console.log(friendDelete);
    remove(ref(db, "friendRequest/" + friendDelete.userId)).then(()=>{
    })
  }

  const  handleAcceptFriendRequest =(acceptFriend)=>{
    console.log(acceptFriend);
    set(push(ref(db, 'friends')), {
      ...acceptFriend
    }).then(()=>{
      remove(ref(db, "friendRequest/" + acceptFriend.userId)).then(()=>{
        console.log("delete successfully");
      })
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

      {/* user list */}
      {friendRequest.length > 0 ? (
        friendRequest.map((fReq) => (
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
                <h3 className="text-md font-pop text-lg font-semibold">
                  {fReq.senderName}
                </h3>
                <div className="mt-2 flex gap-2">
                  <button onClick={()=>handleAcceptFriendRequest(fReq)} className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 ">
                    Accept
                  </button>
                  <button onClick={()=>handleDeleteFriendRequest(fReq)} className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 ">
                    Delete
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
          <span>No Friend Request available.</span>
        </div>
      )}
    </div>
  );
};

export default FriendRequest;
