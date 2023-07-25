import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import User from "../Shared/User/User";
import UserWithBtn from "../Shared/UserWithBtn/UserWithBtn";

const RightSideBar = () => {
  return (
    <div>
      {/* Your group part start */}
      <div className="flex justify-around items-center lg:text-lg font-bold font-pop">
        <h4>Your Groups</h4>
        <BiDotsVerticalRounded />
      </div>

      <div className="mt-2 lg:ml-16 border-b border-b-slate-300">
        <User />
        <User />
        <User />
        <div className="flex items-center ml-3 my-3 gap-4">
          <div className="text-2xl">
            <BsPencilSquare />
          </div>
          <h4 className="font-pop lg:text-lg font-bold">Create Group</h4>
        </div>
      </div>

      {/* Your group part end */}

      {/* Your Friend request part start */}

      <div className="flex justify-between lg:justify-around items-center lg:text-lg font-bold mt-3 font-pop">
        <h4>Friend Requests</h4>
        <p>See All</p>
      </div>

      <div className="mt-2 lg:ml-16 mb-4 border-b border-b-slate-300 pb-4">
        <UserWithBtn btnOne="Confirm" btnTwo="Delete"/>
      </div>
      {/* Your Friend request part end */}

      {/* Contact part start */}

      <div className="flex justify-around items-center lg:text-lg font-bold font-pop">
        <h4>Contacts</h4>
        <BiDotsVerticalRounded />
      </div>

      <div className="mt-2 lg:ml-16 border-b border-b-slate-300">
        <User />
        <User />
        <User />
      </div>

      {/* Contact part end */}
    </div>
  );
};

export default RightSideBar;
