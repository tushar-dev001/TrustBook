import { BsPencilSquare } from "react-icons/bs";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import profile from "../../../public/assets/tushar.jpg";
import { toast } from "react-toastify";

const groupData = {
  groupName: "",
  groupTagline: "",
};

const GroupList = () => {
  const db = getDatabase();
  const [groupInfo, setGroupInfo] = useState(groupData);
  const [groupDetails, setGroupDetails] = useState([]);
  const [groupMemberList, setGroupMemberList] = useState([]);
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
    const groupsRef = ref(db, "groups");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // if (userTotalInfo.uid !== item.val().groupAdminId) {
        arr.push({ ...item.val(), groupId: item.key });
        // }
      });
      setGroupDetails(arr);
    });
  }, []);

  useEffect(() => {
    const groupsRef = ref(db, "groupsRequest");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().userId === userTotalInfo.uid) {
          arr.push(item.val().groupInfoId);
        }
      });
      setGroupMemberList(arr);
    });
  }, []);

  const handleJoinGroup = (info) => {
    set(push(ref(db, "groupsRequest")), {
      groupAdminId: info.groupAdminId,
      groupAdminName: info.groupAdminName,
      groupInfoId: info.groupId,
      groupInfoName: info.groupInfoName,
      userId: userTotalInfo.uid,
      userName: userTotalInfo.displayName,
      time: Date.now().toString(),
    }).then(() => {
      toast("Group join request Successfully!");
    });
  };

  const handleCancelGroup = (cancelGroup) => {
    console.log(cancelGroup);
    const groupsRef = ref(db, "groupsRequest");
    let gid = "";
    onValue(groupsRef, (snapshot) => {
      snapshot.forEach((item) => {
        console.log(item.val());
        if (
          item.val().userId == userTotalInfo.uid &&
          cancelGroup.groupInfoId == item.val().groupInfoId
        ) {
          gid = item.key;
        }
      });
    });
    remove(ref(db, "groupsRequest/" + gid)).then(() => {
      toast("Group join request Cancel Successfully!");
    });
    };

  return (
    <div>
      <div
        onClick={() => window.my_modal_2.showModal()}
        className="flex items-center cursor-pointer"
      >
        <BsPencilSquare className="text-2xl font-bold mr-4 my-6" />
        <p className="text-2xl font-bold">Create Group</p>
      </div>
      <form>
        <input className="p-2 rounded-3xl" type="search" name="" id="" />
        <button
          className="px-4 py-2 ml-2 btn btn-primary"
          type="submit"
        >
          Search
        </button>
      </form>

      {/* <!-- Modal toggle --> */}
      {/* <button  className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Toggle modal
</button> */}

      {/* <!-- Main modal --> */}
      <dialog id="my_modal_2" className="modal">
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

      {groupDetails.length > 0 ? (
        groupDetails.map((group) => (
          <>
            <div className=" px-5 mt-5 ">
              {/* <div className="flex items-center space-x-4">
                <img src={profile} alt="profile" />

                <div className="font-medium dark:text-white">
                  <h4>{group.groupInfoName}</h4>
                  <p>{group.groupInfoTagline}</p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {group.groupAdminName}
                  </div>
                </div>
              </div> */}

              <div className="flex items-center lg:ml-2 lg:mt-2 gap-4">
                <div>
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 lg:w-20 rounded-full">
                      <img src={profile} />
                    </div>
                  </label>
                </div>

                <div>
                  <h3 className="text-xl font-pop font-semibold">
                    {group.groupInfoName}
                  </h3>
                  <p className="text-md">{group.groupInfoTagline}</p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {group.groupAdminName}
                  </div>
                  {/* <div className="mt-2 flex gap-2">
                    <button className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 ">
                      JOIN
                    </button>
                  </div> */}
                </div>
              </div>

              <div  className="mt-2 flex gap-2 ml-16">
                {groupMemberList.indexOf(group.groupId) !== -1 ? (
                  <>
                    <button
                    onClick={() => handleCancelGroup(group)}
                      type="button"
                      className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                  onClick={() => handleJoinGroup(group)}
                    type="button"
                    className="btn btn-primary"
                  >
                    Join
                  </button>
                )}
              </div>
            </div>
          </>
        ))
      ) : (
        <div
          className="flex items-center p-4 mb-4 mt-3 mx-7 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 mr-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">No Groups Available!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupList;
