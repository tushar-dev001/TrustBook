import { TbStepInto } from "react-icons/tb";
import { MdSchool } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";




const About = () => {
  return (
    <>
            {/* Profile home section design start */}
      <div className=" justify-center gap-5 mt-6 mb-36 w-full">
        <div className=" w-full py-7 px-5">
          <h3>Intro</h3>
          <p>
            React Developer | MERN full Stack Developer (jr.) | Still learning
          </p>
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="w-full btn btn-primary p-4 rounded-xl mt-5"
          >
            Edit bio
          </button>

          {/* bio modal start */}
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-2xl">Edit your bio</h3>
              <form>
                <input type="text" name="intro" placeholder="Change your Intro" className="p-4 my-5 rounded-lg"/> <br />
                <input type="text" name="intro" placeholder="Studies at..." className="p-4 mb-5 rounded-lg"/> <br />
                <input type="submit" value="Update" className="btn btn-primary"/>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          {/* bio modal end */}

          <ul className="font-pop">
            <li className="flex items-center mt-4 flex-wrap md:flex-nowrap">
              <TbStepInto className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />{" "}
              <p className="font-extrabold">Profile</p>.{" "}
              <p className="font-semibold">Entrepreneur</p>
            </li>

            <li className="flex items-center mt-4">
              <div>
                <MdSchool className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />
              </div>
              <div className="flex items-center">
                <p className="">
                  <span className="font-extrabold">Studies to </span> MERN
                  Full-Stack Web Developer at Creative IT Institute{" "}
                </p>
              </div>
            </li>

            <li className="flex items-center mt-4">
              <div>
                <MdSchool className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />
              </div>
              <div className="flex items-center">
                <p className="">
                  <span className="font-extrabold">Studies to</span>M.G Heigh
                  School
                </p>
              </div>
            </li>

            <li className="flex items-center mt-4">
              <div>
                <MdSchool className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />
              </div>
              <div className="flex items-center">
                <p className="">
                  <span className="font-extrabold">Studies at</span>at Bogura
                  Government College, Bogura
                </p>
              </div>
            </li>

            <li className="flex items-center mt-4">
              <div>
                <MdSchool className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />
              </div>
              <div className="flex items-center">
                <p className="">
                  <span className="font-extrabold">Studies at</span> Web
                  Designer| Developer and App Designer| Developer at Creative IT
                  Institute{" "}
                </p>
              </div>
            </li>

            <li className="flex items-center mt-4">
              <div>
                <AiFillGithub className="text-2xl font-bold rounded-full mr-3" />
              </div>
              <div className="flex items-center break-all">
                <p className="">https://github.com/tushari789 </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="md:w-[500px] justify-start">
         
        </div>
      </div>
      {/* Profile home section design end */}
    </>
  )
}

export default About