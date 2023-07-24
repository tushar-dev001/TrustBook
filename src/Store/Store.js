import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../Slices/UserSlices";

export default configureStore({
    reducer: {
        userData: UserReducer
    }
}) 