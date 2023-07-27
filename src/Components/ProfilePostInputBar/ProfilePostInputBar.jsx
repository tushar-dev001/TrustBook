import React from 'react'
import {IoMdPhotos} from 'react-icons/io'
import {RiVideoFill} from 'react-icons/ri'

const ProfilePostInputBar = () => {
  return (
    <div className='w-[500px] h-[125px] rounded-lg bg-[#242526] '>
        <div className='p-4 flex items-center gap-3 border-b '>
              <img
                className="w-10 h-10 rounded-full relative object-cover transition-transform transform hover:scale-105 duration-300 ease-in-out hover:opacity-100 cursor-pointer"
                src="/public/assets/tushar.jpg"
                alt=""
              />

              <input type="text" placeholder="What's on your mind?" className='p-2 bg-slate-600 border rounded-full w-full' />
        </div>

        <div className='flex justify-around mt-3'>
            <div className='flex items-center gap-2'>
                <IoMdPhotos className='text-2xl'/>
                <h4 className='font-pop text-lg'>Photo</h4>
            </div>
            <div className='flex items-center gap-2'>
                <RiVideoFill className='text-2xl'/>
                <h4 className='font-pop text-lg'>Reels</h4>
            </div>
        </div>
    </div>
  )
}

export default ProfilePostInputBar