import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../Slices/UserSlices";
import activeChatReducer from '../Slices/activeChat/activeChatSlice'

export default configureStore({
  reducer: {
    userData: UserReducer,
    activeChat: activeChatReducer, 
  },
});
