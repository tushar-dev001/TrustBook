import React from 'react'

const UserWithBtn = (props) => {
  return (
    <div className="flex lg:ml-2 lg:mt-2 gap-4">
        <div >
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 lg:w-20 rounded-full">
              <img src="/public/assets/tushar.png" />
            </div>
          </label>
        </div>

        <div>
          <h3 className="text-md font-pop text-lg font-semibold">Tushar Imran</h3>
         <div className='mt-2 flex gap-2'>
         <button className='px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 '>{props.btnOne}</button>
         <button className='px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 '>{props.btnTwo}</button>
         </div>
        </div>
      </div>
  )
}

export default UserWithBtn