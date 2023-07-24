import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Registration from "./Pages/Registration/Registration";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Components/Home/Home";
import { ToastContainer } from "react-toastify";
import RootLayOut from "./RootLayOut/RootLayOut";
import Friends from "./Components/Friends/Friends";
import Notification from "./Components/Notification/Notification";
import Groups from "./Groups/Groups";
import Message from "./Message/Message";
import Profile from "./Components/Profile/Profile";

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
      {
        path: "/friends",
        element: <Friends />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "/groups",
        element: <Groups />,
      },
      {
        path: "/message",
        element: <Message />,
      },
      {
        path: '/profile',
        element: <Profile/>
      }
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
