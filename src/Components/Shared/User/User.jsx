
import profile from "../../../../public/assets/tushar.jpg"

const User = () => {
  return (
    <div className="flex items-center gap-4 hover:bg-slate-700 hover:rounded-lg hover:ease-in-out duration-300 hover:text-[#D9DBE0]">
        <div >
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 lg:w-10 rounded-full">
              <img src={profile} />
            </div>
          </label>
        </div>

        <div>
          <h3 className="text-md font-pop font-semibold">Tushar Imran</h3>
        </div>
      </div>
  )
}

export default User