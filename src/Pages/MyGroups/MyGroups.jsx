import { useEffect, useState } from "react";

import profile from "../../../public/assets/tushar.jpg";
import { useSelector } from "react-redux";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyGroups = () => {
  const [myGroups, setMyGroups] = useState([]);
  const [myGroupsRequest, setMyGroupsRequest] = useState([]);
  const [myGroupMembers, setMyGroupMembers] = useState([]);

  const db = getDatabase();
  const userTotalInfo = useSelector((state) => state.userData.userInfo);

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

  const handleGroupInfo = (groupInfo) => {
    console.log(groupInfo);
    window.my_group_modal.showModal();
    const groupsRef = ref(db, "groupsRequest");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          userTotalInfo.uid === item.val().groupAdminId &&
          item.val().groupInfoId === groupInfo.groupInfoId
        ) {
          arr.push({ ...item.val(), rejectGroupId: item.key });
        }
      });
      setMyGroupsRequest(arr);
    });
  };

  const handleRejectGroup = (rejectGroup) => {
    console.log(rejectGroup.rejectGroupId);
    remove(ref(db, "groupsRequest/" + rejectGroup.rejectGroupId)).then(() => {
      toast("Group Request Cancel Successfully!");
    });
  };

  const handleGroupAccept = (acceptGroup) => {
    set(push(ref(db, "groupMembers")), {
      ...acceptGroup,
    }).then(() => {
      remove(ref(db, "groupsRequest")).then(() => {
        toast("Group Request Accept Successfully!");
      });
    });
  };

  const handleMembers = (members) => {
    console.log(members);
    window.member_list.showModal();
    const groupsRef = ref(db, "groupMembers");
    onValue(groupsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        if (
          userTotalInfo.uid === item.val().groupAdminId &&
          item.val().groupInfoId === members.groupInfoId
        ) {
          arr.push({ ...item.val(), membersId: item.key });
        }
      });
      setMyGroupMembers(arr);
    });
  };

  const handleGroupRemove = (groupRemove) => {
    console.log(groupRemove);
    remove(ref(db, "groupMembers/" + groupRemove.membersId)).then(() => {
      toast("Member Remove Successfully!");
    });
  };

  const handleMembersDelete =(groupDelete)=>{
    console.log(groupDelete);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        remove(ref(db, 'groups/' + groupDelete.groupInfoId))
        Swal.fire(
          'Deleted!',
          'Your Group deleted successfully!.',
          'success'
        )
      }
    })

  }

  return (
    <div>
      <form className="flex md:block justify-center items-center">
        <input className="p-2 rounded-3xl" type="search" name="" id="" />
        <button
          className="px-4 py-2 ml-2 btn btn-primary"
          type="submit"
        >
          Search
        </button>
      </form>

      {/* users design */}
      {myGroups.length > 0 ? (
        myGroups.map((myGroup) => (
          <div key={myGroup.uid} className="flex lg:ml-2 lg:mt-2 gap-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 lg:w-20 rounded-full">
                <img src={profile} />
              </div>
            </label>

            <div>
              <h3 className=" font-pop text-xl font-semibold">
                {myGroup.groupInfoName}
              </h3>
              <p className="text-lg">Tagline:{myGroup.groupInfoTagline}</p>
              <p>Admin: {myGroup.groupAdminName}</p>
              <div className="mt-2 flex gap-2">
                <button
                  // onClick={() => window.my_group_modal.showModal()}
                  onClick={() => handleGroupInfo(myGroup)}
                  className="px-4 py-2 btn btn-primary "
                >
                  Info
                </button>

                <button
                  onClick={() => handleMembers(myGroup)}
                  className="px-4 py-2 btn btn-primary "
                >
                  Members
                </button>
                <button
                  onClick={() => handleMembersDelete(myGroup)}
                  className="px-4 py-2 btn btn-primary "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
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
      {/* Click on Info button and open a modal part start */}
      {/* <dialog id="my_group_modal" className="modal">
        <form method="dialog" className="modal-box sm:flex sm:justify-center ">
          
          <div className="">
            <h3 className="font-pop lg:font-semibold lg:text-lg ">
              Member Request
            </h3>

            <div className="flex lg:ml-2 lg:mt-2 gap-4">
              <div>
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 lg:w-20 rounded-full">
                    <img src={profile} />
                  </div>
                </label>
              </div>

              <div>
                <h3 className=" font-pop text-xl font-semibold">
                  Tushar Imran
                </h3>
                <p className="text-lg">Tagline: myGroup.groupInfoTagline</p>
                <p>Admin: myGroup.groupAdminName</p>
                <div className="mt-2 flex gap-2">
                  <button className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 ">
                    Accept
                  </button>
                  <button className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 ">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog> */}
      {/* Click on Info button and open a modal part end */}

      {/* Group Modal start */}
      <dialog id="my_group_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Member Request</h3>
          <p className="py-4">
            {/* Profile List start */}
            {myGroupsRequest.map((groupReq) => (
              <>
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={profile}
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium  truncate dark:text-white">
                          {groupReq.userName}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          Wants to be your friend
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold  dark:text-white">
                        <div>
                          <button
                            onClick={() => handleGroupAccept(groupReq)}
                            type="button"
                            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Accept
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => handleRejectGroup(groupReq)}
                            type="button"
                            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </>
            ))}

            {/* Profile List end */}
          </p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* Group Modal end */}
      {/* Member list modal start */}
      <dialog id="member_list" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Member List</h3>
          <p className="py-4">
            {/* Profile List start */}
            {myGroupMembers.map((groupReq) => (
              <>
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={profile}
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium  truncate dark:text-white">
                          {groupReq.userName}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          Wants to be your friend
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base font-semibold  dark:text-white">
                        <div>
                          <button
                            onClick={() => handleGroupRemove(groupReq)}
                            type="button"
                            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </>
            ))}

            {/* Profile List end */}
          </p>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {/* Member list modal end */}
    </div>
  );
};

export default MyGroups;
