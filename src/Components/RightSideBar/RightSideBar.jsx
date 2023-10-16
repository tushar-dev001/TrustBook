import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";
import profile from '../../../public/assets/tushar.jpg'



const groupData = {
  groupName: "",
  groupTagline: "",
};

const RightSideBar = () => {
  const [friends, setFriends] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);
  const [myGroups, setMyGroups] = useState([]);
  const [groupInfo, setGroupInfo] = useState(groupData);
  const db = getDatabase();
  const userTotalInfo = useSelector((state) => state.userData.userInfo);


  const handleGroupInputChange = (e) => {
    setGroupInfo({
      ...groupInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateGroup = () => {
    set(push(ref(db, "groups")), {
      groupInfoName: groupInfo.groupName,
      groupInfoTagline: groupInfo.groupTagline,
      groupAdminName: userTotalInfo.displayName,
      groupAdminId: userTotalInfo.uid,
    }).then(() => {
      console.log("Group created");
    });

    setGroupInfo({
      groupName: "",
      groupTagline: "",
    });
  };

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
  // const displayedFriends = friends.slice(0, 3);


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

  // const displayedFriendRequest = friendRequest.slice(0, 2);


  
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
  



  useEffect(() => {
    const groupsRef = ref(db, "groups/");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (userTotalInfo.uid === item.val().groupAdminId) {
          arr.push({ ...item.val(), groupInfoId: item.key });
        }
      });
      setMyGroups(arr);
    });
  }, []);
  // const displayedGroups = myGroups.slice(0, 3);
  



  return (
    <div>
      {/* Your group part start */}
      <div className="flex justify-around items-center lg:text-lg font-bold font-pop mt-24 ">
        <h4>Your Groups</h4>
        <BiDotsVerticalRounded />
      </div>

        
      <div className="mt-2 lg:ml-16 border-b border-b-slate-300 h-44 overflow-hidden overflow-y-scroll">
    {myGroups.map((myGroup, index) =>(
        <div key={index} className="flex lg:ml-2 lg:mt-2 gap-4 btn btn-outline btn-lg my-4 ">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 lg:w-20 rounded-full">
                <img src={profile} />
              </div>
            </label>

            <div >
              <h3 className=" font-pop text-xl font-semibold">
                {myGroup.groupInfoName}
              </h3>
            </div>
          </div>
        ))}
        <div
         
          className="flex items-center ml-3 my-3 gap-4 cursor-pointer"
        >
        </div>
      </div>
          <div  onClick={() => window.my_modal_3.showModal()} className="mt-2 lg:ml-16 border-b border-b-slate-300 py-4 flex items-center gap-3 cursor-pointer">
          <BsPencilSquare className="text-2xl"/>
          <h4 className="font-pop lg:text-lg font-bold">Create Group</h4>
          </div>
      {/* <!-- Main modal --> */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
        
          <h3 className="font-bold text-3xl">Create Your Group</h3>
          <div>
            <input
              className="mt-4 p-4 rounded-xl"
              type="text"
              name="groupName"
              value={groupInfo.groupName}
              onChange={handleGroupInputChange}
              placeholder="Enter Your Group Name"
            />{" "}
            <br />
            <input
              className="my-4 p-4 rounded-xl"
              type="text"
              onChange={handleGroupInputChange}
              value={groupInfo.groupTagline}
              name="groupTagline"
              placeholder="Enter Your Group Tagline"
            />{" "}
            <br />
            {/* <input onClick={handleGroupInputChange}
              className="btn btn-primary "
              type="submit"
              value="Create Group"
            /> */}
            <button className="btn btn-primary" onClick={handleCreateGroup}>Create</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Your group part end */}

      {/* Your Friend request part start */}

      <div className="flex justify-between lg:justify-around items-center lg:text-lg font-bold mt-3 font-pop">
        <h4>Friend Requests</h4>
        <p>See All</p>
      </div>

      <div className="mt-2 lg:ml-16 mb-4 border-b border-b-slate-300 pb-4 h-44 overflow-hidden overflow-y-scroll">
        {
            friendRequest.map((fReq) => (
              <>
                <div key={fReq.uid} className="flex lg:ml-2 lg:mt-2 gap-4">
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
        }
      </div>
      {/* Your Friend request part end */}

      {/* Contact part start */}
      <div className="flex justify-around items-center lg:text-lg font-bold font-pop">
        <h4>Contacts</h4>
        <BiDotsVerticalRounded />
      </div>

     

      <div className="mt-2 lg:ml-16 border-b border-b-slate-300 h-60 overflow-hidden overflow-y-scroll">
      {friends.map((friend, index) => (
        <div key={index} className="flex lg:ml-2 lg:mt-2 gap-4 cursor-pointer btn btn-outline btn-lg mb-4">
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
        </div>
      </div>
      ))}
      </div>

      {/* Contact part end */}
    </div>
  );
};

export default RightSideBar;
