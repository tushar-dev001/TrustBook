import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import{ useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "@mui/material";
import {activeUser} from '../../Slices/UserSlices.js'
import { useDispatch } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar.jsx";



const provider = new GoogleAuthProvider();
const auth = getAuth();

const Login = () => {
  const [forgotInputValues, setForgotInputValues] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [error, setError] = useState("");
  const notify = toast();
  const navigate = useNavigate();
  let dispatch = useDispatch()

  const handleInputFocuse = () => {
    setIsInputFocused(false);
  };
  const handleInputBlur = () => {
    setIsInputFocused(true);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
        navigate('/home')
    } else {
    console.log("user nai");
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    form.reset();
    // console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(activeUser(userCredential.user))
        localStorage.setItem('userInfo', JSON.stringify(userCredential.user))
        const user = userCredential.user;
        // console.log(user.emailVerified);

        if (!user.emailVerified) {
          toast("Please first verify your mail and try again");
        } else {
          toast("Login Successfully");
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        }

        // setInputValue('')
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        console.log(errorCode);
        const errorMessage = error.message;
      });
  };

  const handleGoogle = () => {
    console.log("ami google");
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast("Google Login Successfully");
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleForgotEmailSubmit = () => {
    console.log(forgotInputValues);
    sendPasswordResetEmail(auth, forgotInputValues)
      .then((user) => {
        console.log(user);
        console.log("email sent");
        toast("Please check your email and verify your mail");
      })
      .catch((error) => {
        const errorCode = error.errorCode;
        const errorMessege = error.message;
      });
  };

  return (
    <>
      {/* navbar design start */}
      <Navbar/>
      {/* navbar design end */}
      {/* login design start */}
      <div className="hero lg:min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold font-pop">Please Login now!</h1>

            <img
              className="w-[150px] mt-5 cursor-pointer mx-auto"
              onClick={handleGoogle}
              src="assets/google.png"
              alt=""
            />
          </div>
          <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-pop">Email</span>
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  onFocus={handleInputFocuse}
                  onBlur={handleInputBlur}
                  className="input input-bordered"
                  required
                />
                {error === "auth/user-not-found" && isInputFocused && (
                  <Alert severity="error" className="font-pop">User not found</Alert>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-pop">Password</span>
                </label>

                <input
                  type="text"
                  name="password"
                  placeholder="password"
                  onFocus={handleInputFocuse}
                  onBlur={handleInputBlur}
                  className="input input-bordered"
                  required
                />
                {error === "auth/wrong-password" && isInputFocused && (
                  <Alert severity="error" className="font-pop">Wrong Password</Alert>
                )}
                <label className="label flex-col">
                  <Link
                    href="#"
                    onClick={() => window.my_modal_2.showModal()}
                    className="label-text-alt link link-hover font-pop"
                  >
                    Forgot password?
                  </Link>

                  {/* forgot modal start */}
                  <div>
                    <dialog id="my_modal_2" className="modal">
                      <form
                        onSubmit={handleForgotEmailSubmit}
                        method="dialog"
                        className="modal-box"
                      >
                        <h3 className="font-bold font-pop text-lg">Find Your Account</h3>
                        <p className="py-4 font-pop">
                          Please enter your email address or mobile number to
                          search for your account.
                        </p>
                        <input
                          onChange={(e) => setForgotInputValues(e.target.value)}
                          type="text"
                          placeholder="Email or Phone Number"
                          className="input input-bordered w-full max-w-xs"
                        />
                        <br />
                        <button className="btn btn-primary mt-4">Submit</button>
                      </form>
                      <form method="dialog" className="modal-backdrop">
                        <button className="font-pop">close</button>
                      </form>
                    </dialog>
                  </div>
                  {/* forgot modal end */}

                  <Link to="/" className="label-text-alt link link-hover font-pop">
                    Don't have an account?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary font-pop">
                  Login to Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* login design end */}
    </>
  );
};

export default Login;
