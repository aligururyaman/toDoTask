import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer, userDataReducer } from "./categoriesSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    userData: userDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
