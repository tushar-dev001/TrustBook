import Registration from "./Pages/Registration/Registration";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Friends from "./Pages/Friends/Friends";
import FriendRequest from "./Pages/FriendRequest/FriendRequest";

import { ToastContainer } from "react-toastify";
import RootLayOut from "./RootLayOut/RootLayOut";
import Profile from "./Pages/Profile/Profile";
import BlockUser from "./Pages/BlockUser/BlockUser";
import Settings from "./Pages/Settings/Settings";
import Watch from "./Pages/Watch/Watch";
import Message from "./Pages/Message/Message";
import FriendsPartDesign from "./Components/FriendsPartDesign/FriendsPartDesign";
import Suggestion from "./Pages/Suggestion/Suggestion";
import Groups from "./Components/Groups/Groups";
import GroupList from "./Pages/GroupList/GroupList";
import MyGroups from "./Pages/MyGroups/MyGroups";
import Notification from "./Pages/Notification/Notification";
import ScrollButton from "./Components/ScrollButton/ScrollButton";

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
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/",
    element: <RootLayOut />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/friendspart",
        element: <FriendsPartDesign />,
        children: [
          {
            path: "friends",
            element: <Friends />,
          },
          {
            path: "suggestion",
            element: <Suggestion />,
          },
          {
            path: "friendRequest",
            element: <FriendRequest />,
          },
        ],
      },
      {
        path: "/friendrequest",
        element: <FriendRequest />,
      },
      {
        path: "/notification",
        element: <Notification />,
      },
      {
        path: "/groups",
        element: <Groups />,
        children: [
          {
            path: "grouplist",
            element: <GroupList />,
          },
          {
            path: "mygroups",
            element: <MyGroups />,
          },
        ],
      },
      {
        path: "/message",
        element: <Message />,
      },

      {
        path: "/block",
        element: <BlockUser />,
      },
      {
        path: "/watch",
        element: <Watch />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
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
      <ScrollButton/>
    </>
  );
};

export default App;
