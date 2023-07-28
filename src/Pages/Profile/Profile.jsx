import { Link } from "react-router-dom";
import HomeNavbar from "../../Components/Navbar/HomeNavbar";
import { BsFillCameraFill } from "react-icons/bs";
import { TbStepInto } from "react-icons/tb";
import { MdSchool } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import ProfilePostInputBar from "../../Components/ProfilePostInputBar/ProfilePostInputBar";
import { RxCross2 } from "react-icons/rx";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import User from "../../Components/Shared/User/User";
import coverPhoto from "../../../public/assets/cover.jpg";
import profilePhoto from "../../../public/assets/tushar.jpg";
// images part
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { activeUser } from "../../Slices/UserSlices";

const Profile = () => {
  const [image, setImage] = useState();
  const [profile, setProfile] = useState("");
  const [cropData, setCropData] = useState("#");
  // const [cropper, setCropper] = useState()
  const cropperRef = createRef();
  const auth = getAuth()
  const dispatch = useDispatch()

  const userTotalInfo = useSelector((state) => state.userData.userInfo);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  console.log(auth.currentUser);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(storage, `profilepic/${userTotalInfo.uid}`);
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        setImage("")
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
        }).then(()=>{
          console.log("Photo Uploaded");
          dispatch(activeUser(auth.currentUser))
        localStorage.setItem('userInfo', JSON.stringify(auth.currentUser))
        })
        });
      });
    }
  };

  // useEffect(()=>{
  //   setProfile(userTotalInfo.photoURL)
  // }, [])

  return (
    <>
      {/* Navbar */}
      <div className="hidden md:block">
        <HomeNavbar />
      </div>

      {/* Profile photo and name design start */}
      <div className="shadow-xl bg-[#242526]">
        <div className="w-full">
          <img
            className="md:w-[940px] md:h-[350px] h-24 w-full mx-auto object-cover"
            src={coverPhoto}
            alt="cover Images"
          />
        </div>
        <div className="max-w-[880px] mx-auto md:flex justify-between items-center border-b p-2 md:p-0 md:pb-4">
          <div className="-mt-8 md:mt-12 md:flex items-center gap-10">
            <div className="">
              <img
                onClick={() => window.my_modal_2.showModal()}
                className="w-20 h-20 md:w-40 md:h-40 rounded-full relative object-cover transition-transform transform hover:scale-105 duration-300 ease-in-out hover:opacity-100 cursor-pointer"
                src={userTotalInfo.photoURL}
                alt="Profile Images"
              />
              <BsFillCameraFill className="absolute mt-[-60px] ml-[125px] text-4xl hidden md:block" />
            </div>
            <div className="font-pop">
              <h2 className="font-extrabold text-4xl">{userTotalInfo.displayName}</h2>
              <p className="text-sm mb-3 md:mb-0">
                100B followers . 0 following
              </p>
            </div>
          </div>

          <div className="gap-4 flex flex-wrap md:flex-nowrap">
            <button className="btn btn-secondary">Edit</button>
            <button className="btn btn-secondary">Add Story</button>
          </div>
        </div>

        {/* Modal start */}
        {/* Open the modal using ID.showModal() method */}
        <dialog id="my_modal_2" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Upload Image</h3>
            {image ? (
              <div className="img-preview"></div>
            ) : userTotalInfo.photoURL ? (
              <img
                className="w-40 h-40 rounded-full mx-auto"
                src={userTotalInfo.photoURL}
                alt=""
              />
            ) : (
              <img src={profilePhoto} alt="" />
            )}
            {/* aeta ekhane css korle hobena. index.css file a css korte hobe */}
            <input
              type="file"
              onChange={onChange}
              className="file-input file-input-bordered w-full max-w-xs my-5"
            />{" "}
            <br />
            {image && (
              <Cropper
                ref={cropperRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
            )}
            <br />
            <button onClick={getCropData} className="btn btn-primary">
              Uploaded
            </button>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        {/* Modal end */}

        <div className="max-w-[880px] mx-auto pl-2 md:pl-0 ">
          <ul className="flex gap-3 md:gap-7 py-6 flex-wrap md:flex-nowrap">
            <Link to="#post">
              {" "}
              <li>Post</li>
            </Link>
            <Link to="#">
              {" "}
              <li>About</li>
            </Link>
            <Link to="#">
              {" "}
              <li>Followers</li>
            </Link>
            <Link to="#">
              {" "}
              <li>Photos</li>
            </Link>
            <Link to="#">
              {" "}
              <li>Videos</li>
            </Link>
            <Link to="#">
              {" "}
              <li className="hidden md:block">Groups</li>
            </Link>
          </ul>
        </div>
      </div>
      {/* Profile photo and name design start */}

      {/* Profile home section design start */}
      <div className="md:flex justify-center gap-5 mt-6 mb-36 ">
        <div className="md:w-[360px] bg-[#242526] py-7 px-5">
          <h3>Intro</h3>
          <p>
            React Developer | MERN full Stack Developer (jr.) | Still learning
          </p>
          <button className="w-full bg-slate-800 p-4 rounded-xl mt-5">
            Edit bio
          </button>

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
                <AiFillGithub className="text-2xl font-bold bg-slate-500 rounded-full mr-3" />
              </div>
              <div className="flex items-center break-all">
                <p className="">https://github.com/tushari789 </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="md:w-[500px] justify-start">
          <div className="mt-5 md:mt-0">
            <ProfilePostInputBar />
          </div>

          {/* Profile Post design start */}
          <div className=" col-span-6 bg-[#242526] mt-10 p-2 md:p-0">
            <div className="card w-full  mx-auto shadow-2xl">
              <div className="">
                <div className="flex items-center justify-between">
                  <div>
                    <User />
                  </div>
                  <div className="flex align-center gap-4">
                    <RxCross2 />
                    <BiDotsVerticalRounded />
                  </div>
                </div>

                <p className="font-pop text-base">
                  If a dog chews shoes whose shoes does he choose? Lorem, ipsum
                  dolor sit amet consectetur adipisicing elit. Veniam sapiente
                  assumenda, voluptatem atque iste dicta molestias repudiandae
                  deleniti veritatis temporibus harum aspernatur, impedit modi
                  ab libero nam accusamus inventore quam cum. Adipisci ad
                  officiis exercitationem dolores sequi eos architecto fugiat
                  fugit quo porro! Nam hic voluptas dolorum, porro ab velit.
                </p>
              </div>
              <figure className="border-b-2 pb-8">
                <img src={profilePhoto} alt="Shoes" />
              </figure>
              <div className="pb-5 flex justify-around">
                <div className="flex items-center gap-2 mt-5 text-lg font-medium">
                  <AiFillLike />
                  <p className="font-pop ">Like</p>
                </div>
                <div className="flex items-center gap-2 mt-5 text-lg font-medium">
                  <GoComment />
                  <p className="font-pop ">Comment</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-span-6 bg-[#242526] mt-10 p-2 md:p-0">
            <div className="card w-full  mx-auto shadow-2xl">
              <div className="">
                <div className="flex items-center justify-between">
                  <div>
                    <User />
                  </div>
                  <div className="flex align-center gap-4">
                    <RxCross2 />
                    <BiDotsVerticalRounded />
                  </div>
                </div>

                <p className="font-pop text-base">
                  If a dog chews shoes whose shoes does he choose? Lorem, ipsum
                  dolor sit amet consectetur adipisicing elit. Veniam sapiente
                  assumenda, voluptatem atque iste dicta molestias repudiandae
                  deleniti veritatis temporibus harum aspernatur, impedit modi
                  ab libero nam accusamus inventore quam cum. Adipisci ad
                  officiis exercitationem dolores sequi eos architecto fugiat
                  fugit quo porro! Nam hic voluptas dolorum, porro ab velit.
                </p>
              </div>
              <figure className="border-b-2 pb-8">
                <img src={profilePhoto} alt="Shoes" />
              </figure>
              <div className="pb-5 flex justify-around">
                <div className="flex items-center gap-2 mt-5 text-lg font-medium">
                  <AiFillLike />
                  <p className="font-pop ">Like</p>
                </div>
                <div className="flex items-center gap-2 mt-5 text-lg font-medium">
                  <GoComment />
                  <p className="font-pop ">Comment</p>
                </div>
              </div>
            </div>
          </div>
          {/* Profile Post design end */}
        </div>
      </div>
      {/* Profile home section design end */}
    </>
  );
};

export default Profile;
