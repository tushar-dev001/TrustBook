import React from 'react'
import UserWithBtn from '../../Components/Shared/UserWithBtn/UserWithBtn'

const BlockUser = () => {
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
      <div className="flex lg:ml-2 lg:mt-2 gap-4">
        <div >
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 lg:w-20 rounded-full">
              <img src="/public/assets/tushar.jpg" />
            </div>
          </label>
        </div>

        <div>
          <h3 className="text-md font-pop text-lg font-semibold">Tushar Imran</h3>
         <div className='mt-2 flex gap-2'>
         <button className='px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 '>Unblock</button>
         </div>
        </div>
      </div>
      <div className="flex lg:ml-2 lg:mt-2 gap-4">
        <div >
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 lg:w-20 rounded-full">
              <img src="/public/assets/tushar.jpg" />
            </div>
          </label>
        </div>

        <div>
          <h3 className="text-md font-pop text-lg font-semibold">Tushar Imran</h3>
         <div className='mt-2 flex gap-2'>
         <button className='px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 '>Unblock</button>
         </div>
        </div>
      </div>
      <div className="flex lg:ml-2 lg:mt-2 gap-4">
        <div >
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 lg:w-20 rounded-full">
              <img src="/public/assets/tushar.jpg" />
            </div>
          </label>
        </div>

        <div>
          <h3 className="text-md font-pop text-lg font-semibold">Tushar Imran</h3>
         <div className='mt-2 flex gap-2'>
         <button className='px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 '>Unblock</button>
         </div>
        </div>
      </div>
      <div className="flex lg:ml-2 lg:mt-2 gap-4">
        <div >
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 lg:w-20 rounded-full">
              <img src="/public/assets/tushar.jpg" />
            </div>
          </label>
        </div>

        <div>
          <h3 className="text-md font-pop text-lg font-semibold">Tushar Imran</h3>
         <div className='mt-2 flex gap-2'>
         <button className='px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 '>Unblock</button>
         </div>
        </div>
      </div>
    </div>
  )
}

export default BlockUser