import User from "../../Components/Shared/User/User";
import { RxCross2 } from "react-icons/rx";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" col-span-6 ">
      <div className="card w-[90%] md:w-5/6 mx-auto shadow-2xl">
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
            If a dog chews shoes whose shoes does he choose? Lorem, ipsum dolor
            sit amet consectetur adipisicing elit. Veniam sapiente assumenda,
            voluptatem atque iste dicta molestias repudiandae deleniti veritatis
            temporibus harum aspernatur, impedit modi ab libero nam accusamus
            inventore quam cum. Adipisci ad officiis exercitationem dolores
            sequi eos architecto fugiat fugit quo porro! Nam hic voluptas
            dolorum, porro ab velit.
          </p>
        </div>
        <figure className="border-b-2 pb-8">
          <img src="/public/assets/tushar.png" alt="post Photo" />
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
  );
};

export default Home;
