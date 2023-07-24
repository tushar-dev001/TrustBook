
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { activeUser } from "../../Slices/UserSlices";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const auth = getAuth();

const Logout = () => {

    const navigate = useNavigate()
        const dispatch = useDispatch()
        const notify = toast();
        
        const userData = useSelector(state =>state.userData.userInfo)
      
        useEffect(()=>{
          if(!userData){
            navigate('/login')
          }
        },[])

    const handleLogout = () => {
        signOut(auth)
          .then(() => {
            localStorage.removeItem('userInfo')
            dispatch(activeUser(null))
            toast("Log out successfully");
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          })
          .catch((error) => {
            console.log("error", error);
          });
      };

  return (
    <div onClick={handleLogout}>Logout</div>
  )
}

export default Logout