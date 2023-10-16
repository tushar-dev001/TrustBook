import { useState } from "react";
import { getDatabase, push, ref as dbRef } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid"; // Import the uuid package
import { useSelector } from "react-redux";

const ProfilePostInputBar = () => {
  // const userTotalInfo = useSelector((state) => state.userData.userInfo);
  const db = getDatabase();
  const [textData, setTextData] = useState("");
  const [image, setImage] = useState(null);
  const auth = getAuth();
  // const userId = userTotalInfo.uid;
  // const storage = getStorage();
  // const storageReference = storageRef(storage, "path/to/file");

  const formatTimestamp = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleTextDataChange = (e) => {
    setTextData(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const userTotalInfo = useSelector((state) => state.userData.userInfo);
  const handlePost = () => {
    if (image && textData) {
      const { displayName, uid: userId } = userTotalInfo;

      const storage = getStorage();
      const uniqueFilename = `${uuidv4()}-${image.name}`; // Generate a unique filename using uuid
      const storageReference = storageRef(storage, `images/${uniqueFilename}`); // Store images in 'images' folder with unique filename

      uploadBytes(storageReference, image).then((snapshot) => {
        console.log("Image uploaded successfully!");
        return getDownloadURL(snapshot.ref)
        .then((downloadURL) => {
          const postsRef = dbRef(db, "posts");
          const timestamp = formatTimestamp(); 

          // const timestamp = `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`

          push(postsRef, {
            text: textData,
            imageUrl: downloadURL,
            userId: userId,
            userName: displayName,
            timestamp: timestamp, 
            // ... other post data
          }).then(() => {
            console.log("Post created");
            toast("Post Successfully!");
            setTextData("");
            setImage(null);
          });
        });
      });
    } else {
      console.error("Please select an image and enter text data!");
      toast.error('Please select image!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  return (
    <div className="rounded-lg">
      <div className="p-4 flex items-center gap-3 border-b">
        {/* Profile Image */}
        <input
          value={textData}
          onChange={handleTextDataChange}
          name="textPost"
          type="text"
          placeholder="What's on your mind?"
          className="p-2 border-4 rounded-full md:w-[710px] "
        />
        <input onChange={handleImageChange} type="file" name="file" id="" />
        <button className="btn btn-primary" onClick={handlePost}>
          Post
        </button>
      </div>
    </div>
  );
};

export default ProfilePostInputBar;
