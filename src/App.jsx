import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Registration from "./Pages/Registration/Registration";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Components/Home/Home";
import { ToastContainer } from "react-toastify";
import RootLayOut from "./RootLayOut/RootLayOut";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/',
    element: <RootLayOut/>,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ]
  }
]);

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
