import { GoogleAuthProvider, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "@mui/material";

const provider = new GoogleAuthProvider();
const auth = getAuth();

const Login = () => {
  const [forgotInputValues, setForgotInputValues] = useState('')
  const notify = toast();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    form.reset()
    toast("Login Successfully")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  };

  const handleGoogle = () => {
    console.log("ami google");
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleForgotEmailSubmit = () => {
    console.log(forgotInputValues);
    sendPasswordResetEmail(auth, forgotInputValues)
    .then((user)=>{
      console.log(user);
      console.log('email sent');
    })
    .catch((error)=>{
      const errorCode = error.errorCode
      const errorMessege = error.message

    })
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Please Login now!</h1>

          <img
            className="w-[150px] mt-5 cursor-pointer"
            onClick={handleGoogle}
            src="assets/google.png"
            alt=""
          />
        </div>
        <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label flex-col">
                <Link
                  href="#"
                  onClick={() => window.my_modal_2.showModal()}
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </Link>

                {/* forgot modal start */}
                <div>
                  <dialog id="my_modal_2" className="modal">
                    <form onSubmit={handleForgotEmailSubmit} method="dialog" className="modal-box">
                      <h3 className="font-bold text-lg">Find Your Account</h3>
                      <p className="py-4">
                        Please enter your email address or mobile number to
                        search for your account.
                      </p>
                      <input onChange={(e)=>setForgotInputValues(e.target.value)} type="text" placeholder="Email or Phone Number"  className="input input-bordered w-full max-w-xs" />
                      <br />
                      <button className="btn btn-primary mt-4">Submit</button>

                    </form>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>
                {/* forgot modal end */}

                <Link to="/" className="label-text-alt link link-hover">
                  Don't have an account?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login to Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
