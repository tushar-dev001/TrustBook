import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import app from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert } from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";
import { getDatabase, ref, set } from "firebase/database";

const auth = getAuth(app);

const Registration = () => {
  const [error, setError] = useState();
  const [userError, setUserError] = useState();
  const navigate = useNavigate();
  const notify = toast();
  const db = getDatabase();

  const handleSubmit = (event) => {
    // console.log(event);
    event.preventDefault();
    const form = event.target;
    const name = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);
    form.reset();

    if (!/(?=.*[0-9])/.test(password)) {
      setError("Please add one number");
      return;
    }
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError("Please add at least one special character");
      return;
    }
    if (password.length < 6) {
      setError("Please should be al least 6 character");
      return;
    }
    setError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: "https://i.ibb.co/ssPGgsM/avater.png",
        })
          .then(() => {
            //sent verification email
            sendEmailVerification(auth.currentUser).then(() => {
              console.log("sent email");
              console.log(user);

              set(ref(db, "users/" + user.user.uid), {
                username: name,
                email: email,
                profile_picture: user.user.photoURL,
              }).then(() => {
                toast("Please check your email and verify your mail");
                setTimeout(() => {
                  navigate("/login");
                }, 3000);
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        setUserError(errorCode);
        // if (errorCode == "auth/email-already-in-use") {
        //   setValues({
        //     password: "",
        //   });
        // }
      });
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
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });

  return (
    <>
      <Navbar />
      {/* Login page design start */}
      <div className="hero lg:min-h-screen lg:bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left mb-8 md:mb-0">
            <h1 className="text-5xl font-pop font-bold">
              Please Register now!
            </h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-pop">Full Name</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-pop">Email</span>
                </label>

                {userError === "auth/email-already-in-use" && (
                  <Alert severity="error" className="font-pop">
                    Email Already Use
                  </Alert>
                )}

                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-pop">Password</span>
                </label>
                <input
                  type="text"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                {error && (
                  <div className="alert alert-error mt-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}
                <label className="label">
                  <Link
                    to="/login"
                    className="label-text-alt font-pop link link-hover"
                  >
                    Already have an account?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary font-pop">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Login page design end */}
    </>
  );
};

export default Registration;
