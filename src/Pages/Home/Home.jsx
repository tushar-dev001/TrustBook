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
import { getDatabase, ref as dbRef, onValue, remove } from "firebase/database";
import Swal from "sweetalert2";

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
          userName: childSnapshot.val().userName,
        });
      });

      // Update the 'posts' state with fetched data
      setPosts(postData);
    });
  }, [db]); // Dependency array ensures the effect runs whenever 'db' changes

  const handleDeletePost = (post) => {
    console.log(post.id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          remove(dbRef(db, "posts/" + post.id));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" col-span-6 mt-24">
      <div className="mt-5 md:mt-0">
        <ProfilePostInputBar />
      </div>

      {posts.map((post) => (
        <div key={post.id} className="card w-[90%] md:w-5/6 mx-auto shadow-2xl">
          <div className="md:card-body">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 hover:bg-slate-700 hover:rounded-lg hover:ease-in-out duration-300 hover:text-[#D9DBE0]">
                  <div>
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 lg:w-10 rounded-full">
                        <img src={profile} />
                      </div>
                    </label>
                  </div>

                  <div>
                    <h3 className="text-md font-pop font-semibold">
                      {post.userName}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex align-center gap-4">
                <RxCross2
                  className="btn btn-circle btn-outline btn-sm"
                  onClick={() => handleDeletePost(post)}
                />
                <BiDotsVerticalRounded className="text-3xl font-extrabold" />
              </div>
            </div>

          </div>
            <p className="font-pop text-base px-3 mb-4">{post.text}</p>
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
