import {
  GoogleAuthProvider,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import{  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "@mui/material";
import {activeUser} from '../../Slices/UserSlices.js'
import { useDispatch } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Swal from "sweetalert2";



const provider = new GoogleAuthProvider();
const auth = getAuth();
const initialState = {
  email: "",
  password: "",
  error: "",
};
const Login = () => {
  const [values, setValues] = useState(initialState);
  const [forgotInputValues, setForgotInputValues] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  let dispatch = useDispatch()


  const handleInputFocuse = () => {
    setIsInputFocused(false);
  };
  const handleInputBlur = () => {
    setIsInputFocused(true);
  };


// user jodi login thake taile logout kora chara ae page a aste parbena
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // console.log(user);
  //     if(user){
  //       navigate('/home')
  //     }else{
  //       console.log("user nai");
  //     }
  //   } 
  // });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    form.reset();
    // console.log(email, password);

    if (!email) {
      setValues({
        ...values,
        error: "Enter Your Email",
      });
      return;
    }

    let pattern =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ ||
      !pattern.test(password);

    if (!password) {
      setValues({
        ...values,
        error: "Enter Your Valid Password",
      });
      return;
    }
    setValues({
      error: "",
    });

    // form.reset()


    setLoader(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(activeUser(userCredential.user))
        localStorage.setItem('userInfo', JSON.stringify(userCredential.user))
        const user = userCredential.user;
        // console.log(user.emailVerified);

        if (!user.emailVerified) {
          toast("Please first verify your mail and try again");
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Login Successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            navigate("/home");
          }, 1500);
        }

        // setInputValue('')
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        console.log(errorCode);
      });
  };

  const handleGoogle = () => {
    console.log("ami google");
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Google Login Successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
          navigate("/home");
        }, 1500);
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
        
        const errorMessage = error.message;
        console.log(errorMessage);
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

                {
                    values.error.includes("Email") && (
                      <div
                        className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                        role="alert"
                      >
                        <svg
                          className="flex-shrink-0 inline w-4 h-4 mr-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                          <span className="font-medium">{values.error}</span>
                        </div>
                      </div>
                    )
                    // <h3>{}</h3>
                  }
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  onFocus={handleInputFocuse}
                  onBlur={handleInputBlur}
                  className="input input-bordered"
                  // required
                />
                {error === "auth/user-not-found" && isInputFocused && (
                  <Alert severity="error" className="font-pop">User not found</Alert>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-pop">Password</span>
                </label>

                {
                    values.error.includes("Password") && (
                      <div
                        className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                        role="alert"
                      >
                        <svg
                          className="flex-shrink-0 inline w-4 h-4 mr-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                          <span className="font-medium">{values.error}</span>
                        </div>
                      </div>
                    )
                    // <h3>{}</h3>
                  }

                <input
                  type="text"
                  name="password"
                  placeholder="••••••••"
                  onFocus={handleInputFocuse}
                  onBlur={handleInputBlur}
                  className="input input-bordered"
                  // required
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

                  {
                    loader
                    ?
                    <button type="submit" disabled className="btn btn-primary font-pop">
                  Loading...
                </button>
                    :
                    <button type="submit" className="btn btn-primary font-pop">
                  Login to Continue
                </button>
                  }

                {/* <button type="submit" className="btn btn-primary font-pop">
                  Login to Continue
                </button> */}
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
