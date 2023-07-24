import React from 'react'

const UserWithBtn = () => {
  return (
    <div className="flex lg:ml-5 gap-4">
        <div >
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 lg:w-20 rounded-full">
              <img src="/public/assets/tushar.jpg" />
            </div>
          </label>
        </div>

        <div>
          <h3 className="text-md font-pop text-lg font-semibold">Tushar Imran</h3>
         <div className='mt-2'>
         <button className='btn btn-secondary'>Confirm</button>
         <button className='btn btn-secondary md:mt-2 ml-4'>Delete</button>
         </div>
        </div>
      </div>
  )
}

export default UserWithBtn