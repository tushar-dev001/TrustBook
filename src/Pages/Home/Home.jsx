import User from "../../Components/Shared/User/User";
import { RxCross2 } from "react-icons/rx";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import profile from "../../../public/assets/tushar.jpg";

// import { RxCross2 } from "react-icons/rx";
// import { BiDotsVerticalRounded } from "react-icons/bi";
// import { AiFillLike } from "react-icons/ai";
// import { GoComment } from "react-icons/go";
// import User from "../../Components/Shared/User/User";
import ProfilePostInputBar from "../../Components/ProfilePostInputBar/ProfilePostInputBar";
import { useEffect, useState } from "react";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const db = getDatabase();

  useEffect(() => {
    const postsRef = dbRef(db, "posts");
    // Listen for changes in the 'posts' path
    onValue(postsRef, (snapshot) => {
      const postData = [];
      snapshot.forEach((childSnapshot) => {
        // Push post data to postData array
        postData.push({
          id: childSnapshot.key,
          text: childSnapshot.val().text,
          imageUrl: childSnapshot.val().imageUrl,
          userId: childSnapshot.val().userId,
        });
      });

      // Update the 'posts' state with fetched data
      setPosts(postData);
    });
  }, [db]); // Dependency array ensures the effect runs whenever 'db' changes

  return (
    <div className=" col-span-6 ">
      <div className="mt-5 md:mt-0">
        <ProfilePostInputBar />
      </div>

      {posts.map((post) => (
        <div key={post.id} className="card w-[90%] md:w-5/6 mx-auto shadow-2xl">
          <div className="md:card-body">
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
              {post.text}
            </p>
          </div>
          <figure className="border-b-2 pb-8">
            <img src={post.imageUrl} />
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
      ))}
    </div>
  );
};

export default Home;
