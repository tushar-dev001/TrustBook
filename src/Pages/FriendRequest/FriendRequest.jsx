import React from 'react'
import UserWithBtn from '../../Components/Shared/UserWithBtn/UserWithBtn'

const FriendRequest = () => {
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
      
      <UserWithBtn btnOne="Unfriend" btnTwo="Block" />
      <UserWithBtn btnOne="Unfriend" btnTwo="Block" />
      <UserWithBtn btnOne="Unfriend" btnTwo="Block" />
      <UserWithBtn btnOne="Unfriend" btnTwo="Block" />
    </div>
  )
}

export default FriendRequest