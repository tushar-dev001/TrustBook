import { TbStepInto } from "react-icons/tb";
import { MdSchool } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const About = () => {
  // const [bio, setBio] = useState("");
  // const [editMode, setIsEditMode] = useState(false)
  // const db = getDatabase();

  const [profile, setProfile] = useState("");
  const [intro, setIntro] = useState("");
  const [presentStudy, setPresentStudy] = useState("");
  const [schoolStudy, setSchoolStudy] = useState("");
  const [collegeStudy, setCollegeStudy] = useState("");
  const [universityStudy, setUniversityStudy] = useState("");
  const db = getDatabase();
  const bioRef = ref(db, "bio");

  const handleEditBio = (event) => {
    event.preventDefault();

    const updatedBio = {
      profileMode: profile,
      introName: intro,
      PresentStudy: presentStudy,
      schoolStudy: schoolStudy,
      collegeStudy: collegeStudy,
      universityStudy: universityStudy,
    };

    // Update bio data in Firebase
    update(bioRef, updatedBio)
      .then(() => {
        console.log("Bio updated successfully!");
        // setProfile("")
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your bio has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error updating bio: ", error);
      });
  };

  useEffect(() => {
    // Fetch bio data from Firebase and update the state variables
    onValue(bioRef, (snapshot) => {
      const bioData = snapshot.val();
      if (bioData) {
        setProfile(bioData.profileMode);
        setIntro(bioData.introName);
        setPresentStudy(bioData.PresentStudy);
        setSchoolStudy(bioData.schoolStudy);
        setCollegeStudy(bioData.collegeStudy);
        setUniversityStudy(bioData.universityStudy);
      }
    });
  }, []);

  return (
    <>
      {/* Profile home section design start */}
      <div className=" justify-center gap-5 mt-6 mb-36 w-full">
        <div className=" w-full py-7 px-5">
          <h3>Intro</h3>
          <p>{intro}</p>
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
              <form onSubmit={handleEditBio}>
                <input
                  type="text"
                  name="profile"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  placeholder="Change your Profile Mode"
                  className="p-4 my-5 rounded-lg"
                />{" "}
                <br />
                <input
                  type="text"
                  name="intro"
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  placeholder="Change your Intro"
                  className="p-4 my-5 rounded-lg"
                />{" "}
                <br />
                <input
                  type="text"
                  name="PresentStudy"
                  value={presentStudy}
                  onChange={(e) => setPresentStudy(e.target.value)}
                  placeholder="Studies at present..."
                  className="p-4 mb-5 rounded-lg"
                />
                <input
                  type="text"
                  name="schoolStudy"
                  value={schoolStudy}
                  onChange={(e) => setSchoolStudy(e.target.value)}
                  placeholder="Studies to school ..."
                  className="p-4 mb-5 ml-3 rounded-lg"
                />
                <input
                  type="text"
                  name="collegeStudy"
                  value={collegeStudy}
                  onChange={(e) => setCollegeStudy(e.target.value)}
                  placeholder="Studies to College..."
                  className="p-4 mb-5  rounded-lg"
                />
                <input
                  type="text"
                  name="universityStudy"
                  value={universityStudy}
                  onChange={(e) => setUniversityStudy(e.target.value)}
                  placeholder="Studies at University..."
                  className="p-4 mb-5 ml-3 rounded-lg"
                />
                <br />
                <input
                  type="submit"
                  value="Update"
                  className="btn btn-primary"
                />
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
              <p className="font-semibold">{profile}</p>
            </li>

            <li className="flex items-center mt-4">
              <div>
                <MdSchool className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />
              </div>
              <div className="flex items-center">
                <p className="">
                  <span className="font-extrabold">Studies to present: </span>
                  {presentStudy}
                </p>
              </div>
            </li>

            <li className="flex items-center mt-4">
              <div>
                <MdSchool className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />
              </div>
              <div className="flex items-center">
                <p className="">
                  <span className="font-extrabold">Studies to school: </span>
                  {schoolStudy}
                </p>
              </div>
            </li>

            <li className="flex items-center mt-4">
              <div>
                <MdSchool className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />
              </div>
              <div className="flex items-center">
                <p className="">
                  <span className="font-extrabold">
                    Studies at College at:{" "}
                  </span>
                  {collegeStudy}
                </p>
              </div>
            </li>

            <li className="flex items-center mt-4">
              <div>
                <MdSchool className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />
              </div>
              <div className="flex items-center">
                <p className="">
                  <span className="font-extrabold">
                    Studies at University:{" "}
                  </span>
                  {universityStudy}
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

        <div className="md:w-[500px] justify-start"></div>
      </div>
      {/* Profile home section design end */}
    </>
  );
};

export default About;
