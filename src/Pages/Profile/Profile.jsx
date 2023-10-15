
import HomeNavbar from "../../Components/Navbar/HomeNavbar";
import { BsFillCameraFill } from "react-icons/bs";
import coverPhoto from "../../../public/assets/cover.jpg";
import profilePhoto from "../../../public/assets/tushar.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
// images part
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { activeUser } from "../../Slices/UserSlices";
import { data } from "autoprefixer";
import About from "./About";
import Post from "./Post";
import { getDatabase, onValue } from "firebase/database";

const Profile = () => {
  const [profile, setProfile] = useState();
  const [profileImage, setProfileImage] = useState();
  const [coverImage, setCoverImage] = useState();
  const [profileCropData, setProfileCropData] = useState("#");
  const [coverCropData, setCoverCropData] = useState("#");
  // const [cropper, setCropper] = useState()
  const cropperProfileRef = createRef();
  const cropperCoverRef = createRef();
  const auth = getAuth();
  const dispatch = useDispatch();

  const userTotalInfo = useSelector((state) => state.userData.userInfo);

  // profile part start

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
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  // profile part end

  // Cover part start

  const onChangeCover = (e) => {
    e.preventDefault();
    let Coverfiles;
    if (e.dataTransfer) {
      Coverfiles = e.dataTransfer.files;
    } else if (e.target) {
      Coverfiles = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setCoverImage(reader.result);
    };
    reader.readAsDataURL(Coverfiles[0]);
  };
  // cover part end

  // profile photo start
  const getProfileData = () => {
    if (typeof cropperProfileRef.current?.cropper !== "undefined") {
      setProfileCropData(
        cropperProfileRef.current?.cropper.getCroppedCanvas().toDataURL()
      );
      const storage = getStorage();
      const storageRef = ref(storage, `profilepic/${userTotalInfo.uid}`);
      const message4 = cropperProfileRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then(() => {
        setProfileImage("");
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            console.log("Photo Uploaded");
            dispatch(activeUser(auth.currentUser));
            localStorage.setItem("userInfo", JSON.stringify(auth.currentUser));
          });
        });
      });
    }
  };
  // profile photo end

  // cover photo start
  const getCoverData = () => {
    if (typeof cropperCoverRef.current?.cropper !== "undefined") {
      setCoverCropData(
        cropperCoverRef.current?.cropper.getCroppedCanvas().toDataURL()
      );
      const storage = getStorage();
      const storageRef = ref(storage, `coverpic/${userTotalInfo.uid}`);
      const message4 = cropperCoverRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        setCoverImage("");
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            console.log("Photo Uploaded");
            dispatch(activeUser(auth.currentUser));
            localStorage.setItem("userInfo", JSON.stringify(auth.currentUser));
          });
        });
      });
    }
  };
  // cover photo end

  useEffect(() => {
    setProfile(userTotalInfo.photoURL);
  }, [data]);


  // const [postView, setPostView] = useState([]);
  // const db = getDatabase();
  // useEffect(() => {
  //   const starCountRef = ref(db, "post" );
  //   onValue(starCountRef, (snapshot) => {
  //       let arr =[]
  //       snapshot.forEach((item)=>{
  //           arr.push(item.val())
  //       })
  //       setPostView(arr)

  //   });
  //   console.log(postView);
  // }, []);


  return (
    <>
      {/* Navbar */}
      <div className="hidden md:block">
        <HomeNavbar />
      </div>

      {/* Profile photo and name design start */}
      <div className="shadow-xl ">
        {/* cover photo part start */}
        <div className="w-full relative">
          <img
            className="md:w-[940px] md:h-[350px] h-24 w-full mx-auto object-cover"
            src={coverPhoto}
            alt="cover Images"
          />
          <div
            onClick={() => window.cover_photo_modal.showModal()}
            className="mt-[-60px] lg:ml-[965px]  justify-between items-center absolute"
          >
            <button className="btn glass hidden lg:flex ">
              <BsFillCameraFill className=" mr-4 text-4xl hidden md:block" />{" "}
              Edit Cover Photo
            </button>
            <BsFillCameraFill className=" mr-auto text-2xl ml-[218px] mt-7  rounded-full p-1 md:hidden" />
          </div>
        </div>

        {/* Cover part Modal start */}
        {/* Open the modal using ID.showModal() method */}
        <dialog id="cover_photo_modal" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Upload Image</h3>
            {coverImage ? (
              <div className="cover-img-preview"></div>
            ) : userTotalInfo.photoURL ? (
              <img
                className="w-40 h-40 rounded-full mx-auto"
                src={profile}
                alt=""
              />
            ) : (
              <img src={userTotalInfo.photoURL} alt="" />
            )}
            {/* aeta ekhane css korle hobena. index.css file a css korte hobe */}
            <input
              type="file"
              onChange={onChangeCover}
              className="file-input file-input-bordered w-full max-w-xs my-5"
            />{" "}
            <br />
            {coverImage && (
              <Cropper
                ref={cropperCoverRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={profileImage}
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
            <button onClick={getCoverData} className="btn btn-primary">
              Uploaded
            </button>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        {/* cover part Modal end */}

        {/* cover photo part end */}

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
              <h2 className="font-extrabold text-4xl">
                {userTotalInfo.displayName}
              </h2>
              <p className="text-sm mb-3 md:mb-0">
                10B followers . 0 following
              </p>
            </div>
          </div>

          <div className="gap-4 flex flex-wrap md:flex-nowrap">
            <button
              onClick={()=>document.getElementById('my_modal_4').showModal()}
              className="btn btn-secondary"
            >
              Edit
            </button>
            <button className="btn btn-secondary">Add Story</button>
          </div>
          {/* Edit button modal start */}
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-2xl">Edit your profile</h3>
              <form>
                {/* TODO: update name and photo change */}
                <input className="p-4 my-5" type="text" placeholder="Name" />
                {/* photo upload start */}
                <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Upload Image</h3>
            {profileImage ? (
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
            {profileImage && (
              <Cropper
                ref={cropperProfileRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={profileImage}
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
            <button onClick={getProfileData} className="btn btn-primary">
              Uploaded
            </button>
          </form>
                {/* photo upload end */}

              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          {/* Edit button modal end */}
        </div>

        {/* Modal start */}
        {/* Open the modal using ID.showModal() method */}
        <dialog id="my_modal_2" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Upload Image</h3>
            {profileImage ? (
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
            {profileImage && (
              <Cropper
                ref={cropperProfileRef}
                style={{ height: 400, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={profileImage}
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
            <button onClick={getProfileData} className="btn btn-primary">
              Uploaded
            </button>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        {/* Modal end */}

        {/* <div className="max-w-[880px] mx-auto pl-2 md:pl-0 ">
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
        </div> */}
        <Tabs className="md:max-w-[880px] mx-auto pl-2 md:pl-0 pb-5">
          <TabList className="flex gap-3 md:gap-7 py-6 flex-wrap md:flex-nowrap">
            <Tab>Post</Tab>
            <Tab>Abut</Tab>
            <Tab>Followers</Tab>
            <Tab>Photos</Tab>
            <Tab>Videos</Tab>
            <Tab>Groups</Tab>
          </TabList>

          <TabPanel>
            <Post></Post>
          </TabPanel>
          <TabPanel>
            <About></About>
          </TabPanel>
          <TabPanel>
            <h2>Followers Part coming soon...</h2>
          </TabPanel>
          <TabPanel>
            <h2>Photos Part coming soon...</h2>
          </TabPanel>
          <TabPanel>
            <h2>Videos Part coming soon...</h2>
          </TabPanel>
          <TabPanel className="hidden md:block">
            <h2>Groups Part coming soon...</h2>
          </TabPanel>
        </Tabs>
      </div>
      {/* Profile photo and name design start */}

  
    </>
  );
};

export default Profile;
