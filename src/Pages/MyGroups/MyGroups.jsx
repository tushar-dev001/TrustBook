import React from "react";
import UserWithBtn from "../../Components/Shared/UserWithBtn/UserWithBtn";
import { Link } from "react-router-dom";

const MyGroups = () => {
  return (
    <div>
      <form className="flex md:block justify-center items-center">
        <input className="p-2 rounded-3xl" type="search" name="" id="" />
        <button
          className="px-4 py-2 ml-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100"
          type="submit"
        >
          Search
        </button>
      </form>

      {/* users design */}
      <div className="flex lg:ml-2 lg:mt-2 gap-4">
        <div>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 lg:w-20 rounded-full">
              <img src="/public/assets/tushar.png" />
            </div>
          </label>
        </div>

        <div>
          <h3 className="text-md font-pop text-lg font-semibold">
            Tushar Imran
          </h3>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => window.my_modal_2.showModal()}
              className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 "
            >
              Info
            </button>
            {/* Click on Info button and open a modal part start */}

            <dialog id="my_modal_2" className="modal">
              <form
                method="dialog"
                className="modal-box sm:flex sm:justify-center "
              >
                {/* User part start */}
                <div className="">
                  <h3 className="font-pop lg:font-semibold lg:text-lg ">Member Request</h3>
                  <div className="flex lg:ml-2 lg:mt-2 gap-4">
                    <div>
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 lg:w-20 rounded-full">
                          <img src="/public/assets/tushar.png" />
                        </div>
                      </label>
                    </div>

                    <div>
                      <h3 className="text-md font-pop text-lg font-semibold">
                        Tushar Imran
                      </h3>
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
                  <div className="flex lg:ml-2 lg:mt-2 gap-4">
                    <div>
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 lg:w-20 rounded-full">
                          <img src="/public/assets/tushar.png" />
                        </div>
                      </label>
                    </div>

                    <div>
                      <h3 className="text-md font-pop text-lg font-semibold">
                        Tushar Imran
                      </h3>
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
                  <div className="flex lg:ml-2 lg:mt-2 gap-4">
                    <div>
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 lg:w-20 rounded-full">
                          <img src="/public/assets/tushar.png" />
                        </div>
                      </label>
                    </div>

                    <div>
                      <h3 className="text-md font-pop text-lg font-semibold">
                        Tushar Imran
                      </h3>
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
                  <div className="flex lg:ml-2 lg:mt-2 gap-4">
                    <div>
                      <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="w-10 lg:w-20 rounded-full">
                          <img src="/public/assets/tushar.png" />
                        </div>
                      </label>
                    </div>

                    <div>
                      <h3 className="text-md font-pop text-lg font-semibold">
                        Tushar Imran
                      </h3>
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

                {/* User part end */}
                {/* User part start */}
                 <div>
                 <h3 className="font-pop lg:font-semibold lg:text-lg lg:mt-0 mt-6">Member List</h3>
                <div className="flex lg:ml-2 lg:mt-2 gap-4">
                  <div>
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 lg:w-20 rounded-full">
                        <img src="/public/assets/tushar.png" />
                      </div>
                    </label>
                  </div>

                  <div>
                    <h3 className="text-md font-pop text-lg font-semibold">
                      Tushar Imran
                    </h3>
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
                <div className="flex lg:ml-2 lg:mt-2 gap-4">
                  <div>
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 lg:w-20 rounded-full">
                        <img src="/public/assets/tushar.png" />
                      </div>
                    </label>
                  </div>

                  <div>
                    <h3 className="text-md font-pop text-lg font-semibold">
                      Tushar Imran
                    </h3>
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
                {/* User part end */}
              </form>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>

            {/* Click on Info button and open a modal part end */}

            <button className="px-4 py-2 bg-purple-400 rounded-lg text-[#DADCE1] hover:text-[#d6d9e2] hover:bg-purple-500 hover:hover:ease-in-out duration-100 ">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
