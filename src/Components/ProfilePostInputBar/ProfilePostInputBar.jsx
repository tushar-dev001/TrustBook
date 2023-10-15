import { useState } from "react";
import { getDatabase, push, ref as dbRef } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

const ProfilePostInputBar = () => {
  const userTotalInfo = useSelector((state) => state.userData.userInfo);
  const db = getDatabase();
  const [textData, setTextData] = useState("");
  const [image, setImage] = useState(null);
  const auth = getAuth();
  const userId = userTotalInfo.uid;
  // const storage = getStorage();
  // const storageReference = storageRef(storage, "path/to/file");

  const handleTextDataChange = (e) => {
    setTextData(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handlePost = () => {
    if (image && textData) {
      // const storage = getStorage();
      // const storageReference  = storageRef(storage, `images/${image.name}`);
      // const storageReference = storageRef(storage, "path/to/file"); const storage = getStorage();
      const storage = getStorage();
      const storageReference = storageRef(storage, "images");

      uploadBytes(storageReference, image).then((snapshot) => {
        console.log("Image uploaded successfully!");
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          const postsRef = dbRef(db, "posts");
          push(postsRef, {
            text: textData,
            imageUrl: downloadURL,
            userId: userId,
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
