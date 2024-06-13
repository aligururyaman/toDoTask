import { configureStore } from "@reduxjs/toolkit";
import {
  categoriesReducer,
  userDataReducer,
  userProfileReducer,
} from "./categoriesSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    userData: userDataReducer,
    userProfile: userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
