import User from "../Shared/User/User";

const Home = () => {
  return (
      <div className=" col-span-6 ">
        <div className="card w-5/6 mx-auto bg-[#242526] shadow-2xl">
          <div className="card-body">
            
            <User/>
            
            <p>If a dog chews shoes whose shoes does he choose? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam sapiente assumenda, voluptatem atque iste dicta molestias repudiandae deleniti veritatis temporibus harum aspernatur, impedit modi ab libero nam accusamus inventore quam cum. Adipisci ad officiis exercitationem dolores sequi eos architecto fugiat fugit quo porro! Nam hic voluptas dolorum, porro ab velit.</p>
          </div>
          <figure>
            <img 
              src="/public/assets/tushar.jpg"
              alt="Shoes"
            />
          </figure>
        </div>
      </div>
  );
};

export default Home;
